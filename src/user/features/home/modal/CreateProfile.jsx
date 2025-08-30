import {
  Dialog,
  Portal,
  Stack,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Button,
  Image,
  HStack,
  Box,
  InputGroup,
  Text,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import logo from "../../../../assets/userImage.jpg";
import tick from "../../../../assets/Verified tick2.png";
import { FaBriefcase, FaFacebook } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { BsLinkedin } from "react-icons/bs";
import { RxDotsVertical } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import { ImPhoneHangUp } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import images from "../../../../assets/course.png";
import { GoPlusCircle } from "react-icons/go";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRequest } from "../../../../hooks/useRequest";
import { AuthContext } from "../../../../context/AuthContext";
import SearchableDropdown from "../../../../components/Layout/SearchableDropDown";
import axiosClient from "../../../../axiosClient";
export const CreateProfile = ({ isOpen, onClose, onFinish }) => {
  const { userDetails, setUserDetails } = useContext(AuthContext);

  

  const { makeRequest, loading } = useRequest();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const facebookRef = useRef();
  const linkedinRef = useRef();
  const professionRef = useRef();
  const categoryRef = useRef("Founder");
  const experienceRef = useRef();
  const locationRef = useRef();
  const rootsRef = useRef("African");
  const bioRef = useRef();
  const pronounsRef = useRef("He/Him");
  const genderRef = useRef("Male");
  const organizationNameRef = useRef();
  const [organizationShow, setOrganizationShow] = useState(false);
  const [organizationList , setOrganizationList] = useState([]);
  const [organization, setOrganization] = useState('')

  useEffect(()=>{
    const getOrganizations = async ()=>{
      const res = await axiosClient.get('/get-organizations');
      setOrganizationList(res.data.organizations);
    };

    getOrganizations();
  }, [])

  const organizationOptions = organizationList?.map(org => org.name);



  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // open file picker
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // TODO: send `file` to your backend API for upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "lounge-platform"); // Replace with your Cloudinary preset

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/wokodavid/image/upload",
          formData
        );

        const imageUrl = res.data.secure_url;
        setProfileImage(imageUrl);

        const resp = await makeRequest("/profile/upload", {
          profilePic: imageUrl,
        });

        if (resp.error) {
          return;
        }
        setUserDetails(resp.response.user);

        toast.success(resp.response.message);
        // If you have a callback to inform parent component
      } catch (error) {
        console.error("Image upload failed", error);
        toast.error("Image Upload Failed. Please try again.");
      }
    }
  };

  const handleCreateProfile = async () => {
    if (
      !firstNameRef.current.value ||
      !lastNameRef.current.value ||
      !emailRef.current.value ||
      !professionRef.current.value ||
      !categoryRef.current.value ||
      !experienceRef.current.value ||
      !locationRef.current.value ||
      !bioRef.current.value
    ) {
      return toast.error("Please fill all required fields");
    }
    const profileData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      facebook: facebookRef.current.value,
      linkedin: linkedinRef.current.value,
      profession: professionRef.current.value,
      category: categoryRef.current.value,
      experience: experienceRef.current.value,
      location: locationRef.current.value,
      roots: rootsRef.current.value,
      bio: bioRef.current.value,
      pronouns: pronounsRef.current.value,
      profilePic: profileImage,
      organizationName: organizationNameRef.current?.value,
      organization: organization,
    };

    if(!organizationNameRef.current?.value && !organization){
      return toast.error("Please select or create an organization");
    }


    const res = await makeRequest("/profile", profileData);

    setUserDetails(res.response.user);

    if (res.error) {
      return;
    }
    toast.success("Profile Created Successfully");
    onFinish(); // notify parent component
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            rounded={30}
            bg="#FAFAFA"
            p={4}
            maxW={{ base: "sm", md: "xl" }}
          >
            <Fieldset.Root size={{ base: "sm", md: "lg" }}>
              <Stack>
                <Fieldset.Legend
                  fontWeight={"400"}
                  fontSize={{ base: 15, md: 20 }}
                  fontFamily="InterBold"
                  color={"#1A1A21"}
                >
                  Create Profile
                </Fieldset.Legend>
              </Stack>
              <Stack mx={"auto"} position={"relative"}>
                <Image
                  src={preview || userDetails?.profile_picture || logo} // fallback to default image
                  alt="Profile Image"
                  boxSize={{ base: "70px", md: "100px" }}
                  borderRadius="full"
                  objectFit="cover"
                  cursor="pointer"
                  onClick={handleImageClick}
                />

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </Stack>
              <Fieldset.Content>
                <HStack flexDirection={{ base: "column", md: "row" }}>
                  {/* title */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      {" "}
                      First Name
                    </Field.Label>
                    <InputGroup startElement={<CiUser />}>
                      <Input
                        py={6}
                        placeholder="First Name"
                        ref={firstNameRef}
                      />
                    </InputGroup>
                  </Field.Root>

                  {/* Name */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Last Name
                    </Field.Label>
                    <InputGroup startElement={<CiUser />}>
                      <Input py={6} placeholder="Last Name" ref={lastNameRef} />
                    </InputGroup>
                  </Field.Root>
                </HStack>

                <HStack flexDirection={{ base: "column", md: "row" }} gap={2}>
                  {/* Gender */}
                  <Field.Root w={{ base: "100%", md: 200 }}>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Gender
                    </Field.Label>
                    <NativeSelect.Root>
                      {/* Icon on the left */}
                      <Box
                        position="absolute"
                        left="3"
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.500"
                      >
                        <CiUser />
                      </Box>

                      <NativeSelect.Field name="country" pl="10">
                        <For each={["Male", "Female", "others"]}>
                          {(item) => (
                            <option key={item} value={item} ref={genderRef}>
                              {item}
                            </option>
                          )}
                        </For>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                  {/* Pronouns */}
                  <Field.Root w={{ base: "100%", md: 250 }}>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Pronouns
                    </Field.Label>
                    <NativeSelect.Root>
                      {/* Icon on the left */}
                      <Box
                        position="absolute"
                        left="3"
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.500"
                      >
                        <CiUser />
                      </Box>

                      <NativeSelect.Field name="country" pl="10">
                        <For each={["He/Him", "She/Her", "others"]}>
                          {(item) => (
                            <option key={item} value={item} ref={pronounsRef}>
                              {item}
                            </option>
                          )}
                        </For>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                  {/* Roots */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Roots
                    </Field.Label>
                    <NativeSelect.Root>
                      {/* Icon on the left */}
                      <Box
                        position="absolute"
                        left="3"
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.500"
                      >
                        <CiUser />
                      </Box>

                      <NativeSelect.Field name="country" pl="10">
                        <For each={["African", "American", "Asia"]}>
                          {(item) => (
                            <option key={item} value={item} ref={rootsRef}>
                              {item}
                            </option>
                          )}
                        </For>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </HStack>

                {/* Email */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Email
                  </Field.Label>
                  <InputGroup startElement={<MdEmail />}>
                    <Input
                      py={6}
                      placeholder="johnmercy03@gmail.com"
                      ref={emailRef}
                    />
                  </InputGroup>
                </Field.Root>

                <HStack pt={2} flexDirection={{ base: "column", md: "row" }}>
                  {/* Phone Number */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Phone Number
                    </Field.Label>
                    <InputGroup startElement={<ImPhoneHangUp />}>
                      <Input py={6} placeholder="phoneNumber" ref={phoneRef} />
                    </InputGroup>
                  </Field.Root>

                  {/* Fb */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Face book
                    </Field.Label>
                    <InputGroup startElement={<FaFacebook color="#1877F2" />}>
                      <Input
                        py={6}
                        placeholder=" johnmercy"
                        ref={facebookRef}
                      />
                    </InputGroup>
                  </Field.Root>

                  {/* Linkedin */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Linkedin
                    </Field.Label>
                    <InputGroup startElement={<BsLinkedin color="#0A66C2" />}>
                      <Input py={6} placeholder="" ref={linkedinRef} />
                    </InputGroup>
                  </Field.Root>
                </HStack>

                <HStack>
                  {/* Profesion */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Profesion
                    </Field.Label>
                    <InputGroup startElement={<FaBriefcase />}>
                      <Input
                        py={6}
                        placeholder="Financial Analyst"
                        ref={professionRef}
                      />
                    </InputGroup>
                  </Field.Root>

                  {/* expert */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Category
                    </Field.Label>
                    <NativeSelect.Root>
                      {/* Icon on the left */}
                      <Box
                        position="absolute"
                        left="3"
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.500"
                      >
                        <FaBriefcase />
                      </Box>

                      <NativeSelect.Field name="country" pl="10">
                        <For
                          each={[
                            "Founder",
                            "Professional",
                            "Expert",
                            "Entrepreneur",
                          ]}
                        >
                          {(item) => (
                            <option key={item} value={item} ref={categoryRef}>
                              {item}
                            </option>
                          )}
                        </For>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                  {/* <Field.Root >
      <Field.Label
       fontWeight={'400'}
       fontSize={{base:12,md:14}}
       fontFamily="InterMedium"
       color={'#101928'}>Expert</Field.Label>
      <NativeSelect.Root>
         {/* Icon on the left */}
                  {/* <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" color="gray.500">
          <FaBriefcase />
         </Box>

         <NativeSelect.Field name="country" pl="10">
          <For each={["Expert", "Professional", "Experts"]}>
            {(item) => (
           <option key={item} value={item}>
            {item}
           </option>
           )}
          </For>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
          </NativeSelect.Root>
         </Field.Root>  */}
                </HStack>

                {/* Experience */}
                <Field.Root>
                  <Field.Label
                    pt={2}
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Experience Level (Years)
                  </Field.Label>
                  <InputGroup startElement={<FaBriefcase />}>
                    <Input
                      py={6}
                      placeholder="5"
                      type="number"
                      ref={experienceRef}
                    />
                  </InputGroup>
                </Field.Root>

                {/* location */}
                <Field.Root>
                  <Field.Label
                    pt={2}
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    City
                  </Field.Label>
                  <InputGroup startElement={<IoLocationOutline />}>
                    <Input py={6} placeholder="City" ref={locationRef} />
                  </InputGroup>
                </Field.Root>

                {/* Organization */}
                <HStack gap={5}>
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Organization
                    </Field.Label>
                   
                      {/* <Input
                        py={6}
                        fontFamily="InterRegular"
                        placeholder="Living Springs Finance LTD"
                      /> */}
                       <SearchableDropdown
        options={organizationOptions}
        placeholder="Search organizations..."
        onSelect={(value) => setOrganization(value)}
      />
                   

                    <Text
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterRegular"
                      color={"#667185"}
                    >
                      Select Your Organisation
                    </Text>
                  </Field.Root>

                  {/* create button */}
                  <Button
                    py={6}
                    color={"#333333CC"}
                    bg={"#DFDFDF"}
                    onClick={() => setOrganizationShow(true)}
                  >
                    <GoPlusCircle color="#1D1B20" />
                    Create Organization
                  </Button>
                </HStack>

                {/* Bio */}
                {organizationShow && (
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Organization Name{" "}
                    </Field.Label>

                    <Input py={6} placeholder="" ref={organizationNameRef} />
                  </Field.Root>
                )}

                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Bio
                  </Field.Label>
                  <Textarea
                    resize="none"
                    h={200}
                    placeholder="Type here"
                    ref={bioRef}
                  />
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterRegular"
                    color={"#667185"}
                  >
                    Tell us About Yourself
                  </Text>
                </Field.Root>
              </Fieldset.Content>

              {/* Button */}
              <HStack>
                <Button
                  onClick={handleCreateProfile}
                  py={6}
                  w={{ base: "100%" }}
                  rounded={5}
                  bg={"#2B362F"}
                >
                  {loading ? <Spinner /> : "Create Profile"}
                </Button>
              </HStack>
            </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

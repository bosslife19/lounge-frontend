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
import { FaBriefcase, FaFacebook, FaStar } from "react-icons/fa";
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
  const temporalLogo =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACUCAMAAAAwLZJQAAAAY1BMVEX///8AAADY2Nh+fn5KSkqTk5OoqKglJSWkpKTq6uo+Pj5OTk7y8vL8/PyGhobAwMANDQ20tLRaWloVFRXi4uKbm5vIyMhfX181NTV2dnZTU1MqKipmZmZvb2+MjIzS0tIdHR11wAe4AAAEIUlEQVR4nO2ca5uqIBCAl+6WaV4yy9rt///Ks26nA+KADCL4nJ33q2y9Cw4Mtz4+CIIgiF/JMcqS/LAKTH7NoqPWs1qyuXBJ1ZpxcgqtJ3KLFZ5lHVpN4vkFekaH0GI9tiUURnloLYAn0Pq70FIgSS/44ya0E8xCFt2ENlJwld/Qa2gjFXLXJLR8sglNIthIbb/gT85g5+WXlI88WfcJF62jMG5d+Niz6T7goqtZiO7/+ey6D0jUEhJ1DYm6xl40qrIsq6D8cBIsRePzqim+nxXNPin1s66QomXCRK7wBCG8aCZPpQoP2QBe9JiwPnfV/DCg6BrwZOwx9YuKFj2DnowtJzbFii4gyR+kNDGwqGYKXUxbpUjRTOnJ2HpGoseHRvQw6VCLE400noxV8xFNtaKTdvs4Uaiv5+TYL68QwwROVL9stkV67tjdvKfAie4hPw7W8zufMa7TcKKvodi4TnGiF61ng/F8r8GZDr04UTghefNAePJPupi1Pk600opKn6BDXCQ2S7xcdvjmiX43BTNKZpFDqG7XKTeOYDlVvBjUKTIp0Q1Nxi3fT2kfw/8jNh9VZyW1qecn8MfDEYUVVb+lpikJvNkyGFHoqYgq8KXlVSVQfbbkA0kifnIH75b0t39gVFOuwTHKYl6fARu5a0NP3Yhx19apzQLEl7xH2mg2qI09Gbvp/lurJZ14sxU+/7Q2nYOo2/2FrpeyXc3Lkrwu2Km+LTfGOaU+7W7RjBn2y45xufhalIgJ3VB9tqgjyt9C7nB9ttxUX+ZNVB9HHFXr+xJV9fN9LvDXeRI1a/cX8BEXP6Km7f4CzE+9iGLPTkGLQz5EcfXZAmR904uCS+mDddrbFppe1DzeO6ZynToSVa4iHe08+/mpG9H0tFcUsj+DKEWUE9HqBLTVD/g44nR7fheir0y6AYqNO9O5EiPKgWhVvMr1ez/b9/ONOEaNF02Ld8Ftt/W1qxVmCP3paFHuKZe06T8lhEYaKyp6MibEvlU/P51oVnQ/mR/mcnK0z5lofzXiXXhsHLkVhfbxira0q6OSjkRT8Eh5W9zF++lOFFoxaXmWzs7uOxGV44ijfBBEFG53xzgQ9XMCeryofvd2PqK+TpSPFVXF+9xEdec15iS68Xd1aJSov/ocJ+r1ZsYIUZ/1OUbU89Uha1HfN3KsRX3fwbMWHThTQqIkSqIkSqIkSqIk6kd09dz65Jnbii48I9zp+gV37jxDoq4hUdf8T6KNt9u0Ogx+sYAtJ79LOchR2PiXzoBGwrieL0Nz5zJMehMdbGJPhFzbftftzOnfQfSd05nx7Ie2py0aJNDFvjm+pXvoyO4Mf/enhnvKWHdfNQSqY2DAnf+QNJ8qzW/K8yq031/qde+3s6T2L9PzOjTnrAw/jhMEQRAEQRAE5w/6VlvVhOzL/AAAAABJRU5ErkJggg==";
  const [organizationShow, setOrganizationShow] = useState(false);
  const [organizationList, setOrganizationList] = useState([]);
  const [organization, setOrganization] = useState("");
  const logoInputRef = useRef(null);
  const organizationDescRef = useRef("");
  const organizationEmailRef = useRef("");
  const organizationLocationRef = useRef("");
  const organizationWebsiteRef = useRef("");
  const [organizationLogo, setOrganizationLogo] = useState("");
  const [organizationLogoPreview, setOrganizationLogoPreview] = useState(null);
  const [createOrg, setCreateOrg] = useState(false);

  useEffect(() => {
    const getOrganizations = async () => {
      const res = await axiosClient.get("/get-organizations");
      setOrganizationList(res.data.organizations);
    };

    getOrganizations();
  }, []);

  const organizationOptions = organizationList?.map((org) => org.name);

  const handleLogoClick = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click(); // open file picker
    }
  };
  const handleLogoChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrganizationLogoPreview(reader.result);
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
        setOrganizationLogo(imageUrl);
      } catch (error) {
        console.error("Image upload failed", error);
        toast.error("Image Upload Failed. Please try again.");
      }
    }
  };
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

    if (createOrg) {
      if (
        !organizationDescRef.current.value ||
        !organizationEmailRef.current.value ||
        !organizationLocationRef.current.value ||
        !organizationWebsiteRef.current.value ||
        !organizationNameRef.current.value
      )
        return toast.error("All fields are required to create an organization");
    }
    // if(organization && createOrg){
    //   return toast.error('You cannot be in more than one organizations');
    // }
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
      organizationDescription: organizationDescRef.current?.value,
      organizationEmail: organizationEmailRef.current.value,
      organizationLocation: organizationLocationRef.current.value,
      organizationWebsite: organizationWebsiteRef.current.value,
      organizationLogo: organizationLogo,
      organization: organization,
    };

    if (!organizationNameRef.current?.value && !organization) {
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
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={5}>
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
                  fontSize={{ base: "11px", md: 20 }}
                  fontFamily="InterBold"
                  color={"#1A1A21"}
                >
                  Create Profile
                </Fieldset.Legend>
              </Stack>
              <Stack
                justifyContent={"center"}
                alignItems={{ base: "flex-start", md: "center" }}
                width={"100%"}
                mx={"auto"}
                position={"relative"}
              >
                <Image
                  src={preview || userDetails?.profile_picture || logo} // fallback to default image
                  alt="Profile Image"
                  boxSize={{ base: "30px", md: "100px" }}
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
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      <HStack spacing={1} align="center">
                        <Text>First Name</Text>
                        <FaStar color="#FFD700" size={8} />{" "}
                        {/* Yellow star icon */}
                      </HStack>
                    </Field.Label>
                    <InputGroup startElement={<CiUser size={12} />}>
                      <Input
                        fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
                        placeholder="First Name"
                        ref={firstNameRef}
                      />
                    </InputGroup>
                  </Field.Root>

                  {/* Name */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      <HStack spacing={1} align="center">
                        <Text>Last Name</Text>
                        <FaStar color="#FFD700" size={8} />{" "}
                        {/* Yellow star icon */}
                      </HStack>
                    </Field.Label>
                    <InputGroup startElement={<CiUser />}>
                      <Input
                        fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
                        placeholder="Last Name"
                        ref={lastNameRef}
                      />
                    </InputGroup>
                  </Field.Root>
                </HStack>

                <HStack flexDirection={{ base: "column", md: "row" }} gap={2}>
                  {/* Gender */}
                  <Field.Root w={{ base: "100%", md: 200 }}>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: "10px", md: 14 }}
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

                      <NativeSelect.Field
                        fontSize={{ base: "8px", md: 12 }}
                        name="country"
                        pl="10"
                      >
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
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      <HStack spacing={1} align="center">
                        <Text> Pronouns</Text>
                        <FaStar color="#FFD700" size={8} />{" "}
                        {/* Yellow star icon */}
                      </HStack>
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

                      <NativeSelect.Field
                        fontSize={{ base: "8px", md: 12 }}
                        name="country"
                        pl="10"
                      >
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
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      <HStack spacing={1} align="center">
                        <Text> Roots</Text>
                        <FaStar color="#FFD700" size={8} />{" "}
                        {/* Yellow star icon */}
                      </HStack>
                    </Field.Label>
                    <InputGroup startElement={<CiUser />}>
                      <Input
                        fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
                        placeholder="Enter your roots (e.g. African, American, Asian)"
                        ref={rootsRef}
                      />
                    </InputGroup>
                    {/* <NativeSelect.Root>
                       <Box
                        position="absolute"
                        left="3"
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.500"
                      >
                        <CiUser />
                      </Box>

                      <NativeSelect.Field
                        fontSize={{ base: "8px", md: 12 }}
                        name="country"
                        pl="10"
                      >
                        <For each={["African", "American", "Asia"]}>
                          {(item) => (
                            <option key={item} value={item} ref={rootsRef}>
                              {item}
                            </option>
                          )}
                        </For>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root> */}
                  </Field.Root>
                </HStack>

                {/* Email */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    <HStack spacing={1} align="center">
                      <Text>Email</Text>
                      <FaStar color="#FFD700" size={8} />{" "}
                      {/* Yellow star icon */}
                    </HStack>
                  </Field.Label>
                  <InputGroup startElement={<MdEmail />}>
                    <Input
                      fontSize={{ base: "8px", md: 12 }}
                      py={{ base: 1, md: 6 }}
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
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      <HStack spacing={1} align="center">
                        <Text> Phone Number</Text>
                        <FaStar color="#FFD700" size={8} />{" "}
                        {/* Yellow star icon */}
                      </HStack>
                    </Field.Label>
                    <InputGroup startElement={<ImPhoneHangUp />}>
                      <Input
                        fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
                        placeholder="phoneNumber"
                        ref={phoneRef}
                      />
                    </InputGroup>
                  </Field.Root>

                  {/* Fb */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      <HStack spacing={1} align="center">
                        <Text> Facebook</Text>
                        <FaStar color="#FFD700" size={8} />{" "}
                        {/* Yellow star icon */}
                      </HStack>
                    </Field.Label>
                    <InputGroup startElement={<FaFacebook color="#1877F2" />}>
                      <Input
                        fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
                        placeholder=" johnmercy"
                        ref={facebookRef}
                      />
                    </InputGroup>
                  </Field.Root>

                  {/* Linkedin */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      <HStack spacing={1} align="center">
                        <Text> LinkedIn</Text>
                        <FaStar color="#FFD700" size={8} />{" "}
                        {/* Yellow star icon */}
                      </HStack>
                    </Field.Label>
                    <InputGroup startElement={<BsLinkedin color="#0A66C2" />}>
                      <Input
                        fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
                        placeholder=""
                        ref={linkedinRef}
                      />
                    </InputGroup>
                  </Field.Root>
                </HStack>

                <HStack>
                  {/* Profession  */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      <HStack spacing={1} align="center">
                        <Text> Profession</Text>
                        <FaStar color="#FFD700" size={8} />{" "}
                        {/* Yellow star icon */}
                      </HStack>
                    </Field.Label>
                    <InputGroup startElement={<FaBriefcase />}>
                      <Input
                        fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
                        placeholder="Financial Analyst"
                        ref={professionRef}
                      />
                    </InputGroup>
                  </Field.Root>

                  {/* expert */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      <HStack spacing={1} align="center">
                        <Text> Category</Text>
                        <FaStar color="#FFD700" size={8} />{" "}
                        {/* Yellow star icon */}
                      </HStack>
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

                      <NativeSelect.Field
                        fontSize={{ base: "10px", md: 14 }}
                        name="country"
                        pl="10"
                      >
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
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    <HStack spacing={1} align="center">
                      <Text> Experience Level (Years)</Text>
                      <FaStar color="#FFD700" size={8} />{" "}
                      {/* Yellow star icon */}
                    </HStack>
                  </Field.Label>
                  <InputGroup startElement={<FaBriefcase />}>
                    <Input
                      fontSize={{ base: "8px", md: 12 }}
                      py={{ base: 1, md: 6 }}
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
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    <HStack spacing={1} align="center">
                      <Text> City</Text>
                      <FaStar color="#FFD700" size={8} />{" "}
                      {/* Yellow star icon */}
                    </HStack>{" "}
                  </Field.Label>
                  <InputGroup startElement={<IoLocationOutline />}>
                    <Input
                      fontSize={{ base: "8px", md: 12 }}
                      py={{ base: 1, md: 6 }}
                      placeholder="City"
                      ref={locationRef}
                    />
                  </InputGroup>
                </Field.Root>

                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    <HStack spacing={1} align="center">
                      <Text> About Me</Text>
                      <FaStar color="#FFD700" size={8} />{" "}
                      {/* Yellow star icon */}
                    </HStack>{" "}
                  </Field.Label>
                  <Textarea
                    resize="none"
                    h={200}
                    fontSize={{ base: "8px", md: 12 }}
                    placeholder="Type here"
                    ref={bioRef}
                  />
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterRegular"
                    color={"#667185"}
                  >
                    Tell us About Yourself
                  </Text>
                </Field.Root>

                {/* Organization */}
                <HStack gap={5}>
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Organization
                    </Field.Label>

                    {/* <Input
                          fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
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
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterRegular"
                      color={"#667185"}
                    >
                      Select Your Organisation
                    </Text>
                  </Field.Root>

                  {/* create button */}
                  <Button
                    fontSize={{ base: "8px", md: 12 }}
                    py={{ base: 1, md: 6 }}
                    color={"#333333CC"}
                    bg={"#DFDFDF"}
                    onClick={() => {
                      setCreateOrg(true);
                      setOrganizationShow(true);
                    }}
                  >
                    <GoPlusCircle color="#1D1B20" />
                    Create Organization
                  </Button>
                </HStack>

                {/* Bio */}
                {organizationShow && (
                  <>
                    <Field.Root>
                      <Field.Label
                        fontWeight={"400"}
                        fontSize={{ base: "10px", md: 14 }}
                        fontFamily="InterMedium"
                        color={"#101928"}
                      >
                        <HStack spacing={1} align="center">
                          <Text> Organization Name</Text>
                          <FaStar color="#FFD700" size={8} />{" "}
                          {/* Yellow star icon */}
                        </HStack>
                      </Field.Label>

                      <Input
                        fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
                        placeholder=""
                        ref={organizationNameRef}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label
                        fontWeight={"400"}
                        fontSize={{ base: "10px", md: 14 }}
                        fontFamily="InterMedium"
                        color={"#101928"}
                      >
                        <HStack spacing={1} align="center">
                          <Text> Description</Text>
                          <FaStar color="#FFD700" size={8} />{" "}
                          {/* Yellow star icon */}
                        </HStack>
                      </Field.Label>

                      <Textarea
                        resize="none"
                        h={200}
                        fontSize={{ base: "8px", md: 12 }}
                        placeholder="Type here"
                        ref={organizationDescRef}
                      />
                    </Field.Root>
                    <Stack position={"relative"}>
                      <Text
                        fontWeight={"400"}
                        fontSize={{ base: "10px", md: 14 }}
                        fontFamily="InterMedium"
                        color={"#101928"}
                      >
                        <HStack spacing={1} align="center">
                          <Text> Organization Logo</Text>
                          <FaStar color="#FFD700" size={8} />{" "}
                          {/* Yellow star icon */}
                        </HStack>
                      </Text>
                      <Image
                        src={organizationLogoPreview || temporalLogo} // fallback to default image
                        alt="logo"
                        boxSize={{ base: "10px", md: "40px" }}
                        borderRadius="full"
                        objectFit="cover"
                        cursor="pointer"
                        onClick={handleLogoClick}
                      />

                      <input
                        type="file"
                        accept="image/*"
                        ref={logoInputRef}
                        style={{ display: "none" }}
                        onChange={handleLogoChange}
                      />
                    </Stack>

                    <Field.Root>
                      <Field.Label
                        fontWeight={"400"}
                        fontSize={{ base: "10px", md: 14 }}
                        fontFamily="InterMedium"
                        color={"#101928"}
                      >
                        <HStack spacing={1} align="center">
                          <Text> Organization Location</Text>
                          <FaStar color="#FFD700" size={8} />{" "}
                          {/* Yellow star icon */}
                        </HStack>
                      </Field.Label>

                      <Input
                        fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
                        placeholder=""
                        ref={organizationLocationRef}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label
                        fontWeight={"400"}
                        fontSize={{ base: "10px", md: 14 }}
                        fontFamily="InterMedium"
                        color={"#101928"}
                      >
                        <HStack spacing={1} align="center">
                          <Text> Organization Email</Text>
                          <FaStar color="#FFD700" size={8} />{" "}
                          {/* Yellow star icon */}
                        </HStack>
                      </Field.Label>

                      <Input
                        fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
                        placeholder=""
                        ref={organizationEmailRef}
                      />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label
                        fontWeight={"400"}
                        fontSize={{ base: "10px", md: 14 }}
                        fontFamily="InterMedium"
                        color={"#101928"}
                      >
                        <HStack spacing={1} align="center">
                          <Text> Organization Website</Text>
                          <FaStar color="#FFD700" size={8} />{" "}
                          {/* Yellow star icon */}
                        </HStack>{" "}
                      </Field.Label>

                      <Input
                        fontSize={{ base: "8px", md: 12 }}
                        py={{ base: 1, md: 6 }}
                        placeholder=""
                        ref={organizationWebsiteRef}
                      />
                    </Field.Root>
                  </>
                )}
              </Fieldset.Content>

              {/* Button */}
              <HStack>
                <Button
                  onClick={handleCreateProfile}
                  fontSize={{ base: "8px", md: 12 }}
                  py={{ base: 1, md: 6 }}
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

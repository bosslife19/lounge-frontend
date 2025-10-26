import {
  Dialog,
  Portal,
  Stack,
  Field,
  Fieldset,
  Input,
  Button,
  Image,
  HStack,
  InputGroup,
  Textarea,
  CloseButton,
  Text,
  Spinner,
} from "@chakra-ui/react";
import logo from "../../../../assets/userImage.jpg";
import tick from "../../../../assets/Verified tick2.png";
import { FaBriefcase } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { RxDotsVertical } from "react-icons/rx";
import { MdAddCircleOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { LuLink2 } from "react-icons/lu";
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRequest } from "../../../../hooks/useRequest";
import { LucideMail } from "lucide-react";

export const CreateOrganization = ({
  isOpen,
  onClose,
  onFinish,
  setOrganizations,
}) => {
  const [members, setMembers] = useState([{ name: "", profession: "" }]);
  const logoInputRef = useRef(null);
  const { loading, makeRequest } = useRequest();
  const [organizationLogoPreview, setOrganizationLogoPreview] = useState(null);
  const [organizationLogo, setOrganizationLogo] = useState(null); // to store uploaded logo URL
  const nameRef = useRef("");
  const emailRef = useRef("");
  const websiteRef = useRef("");
  const industryRef = useRef("");
  const locationRef = useRef("");
  const descriptionRef = useRef("");
  const handleAddMember = () => {
    setMembers([...members, { name: "", profession: "" }]);
  };
  const temporalLogo =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACUCAMAAAAwLZJQAAAAY1BMVEX///8AAADY2Nh+fn5KSkqTk5OoqKglJSWkpKTq6uo+Pj5OTk7y8vL8/PyGhobAwMANDQ20tLRaWloVFRXi4uKbm5vIyMhfX181NTV2dnZTU1MqKipmZmZvb2+MjIzS0tIdHR11wAe4AAAEIUlEQVR4nO2ca5uqIBCAl+6WaV4yy9rt///Ks26nA+KADCL4nJ33q2y9Cw4Mtz4+CIIgiF/JMcqS/LAKTH7NoqPWs1qyuXBJ1ZpxcgqtJ3KLFZ5lHVpN4vkFekaH0GI9tiUURnloLYAn0Pq70FIgSS/44ya0E8xCFt2ENlJwld/Qa2gjFXLXJLR8sglNIthIbb/gT85g5+WXlI88WfcJF62jMG5d+Niz6T7goqtZiO7/+ey6D0jUEhJ1DYm6xl40qrIsq6D8cBIsRePzqim+nxXNPin1s66QomXCRK7wBCG8aCZPpQoP2QBe9JiwPnfV/DCg6BrwZOwx9YuKFj2DnowtJzbFii4gyR+kNDGwqGYKXUxbpUjRTOnJ2HpGoseHRvQw6VCLE400noxV8xFNtaKTdvs4Uaiv5+TYL68QwwROVL9stkV67tjdvKfAie4hPw7W8zufMa7TcKKvodi4TnGiF61ng/F8r8GZDr04UTghefNAePJPupi1Pk600opKn6BDXCQ2S7xcdvjmiX43BTNKZpFDqG7XKTeOYDlVvBjUKTIp0Q1Nxi3fT2kfw/8jNh9VZyW1qecn8MfDEYUVVb+lpikJvNkyGFHoqYgq8KXlVSVQfbbkA0kifnIH75b0t39gVFOuwTHKYl6fARu5a0NP3Yhx19apzQLEl7xH2mg2qI09Gbvp/lurJZ14sxU+/7Q2nYOo2/2FrpeyXc3Lkrwu2Km+LTfGOaU+7W7RjBn2y45xufhalIgJ3VB9tqgjyt9C7nB9ttxUX+ZNVB9HHFXr+xJV9fN9LvDXeRI1a/cX8BEXP6Km7f4CzE+9iGLPTkGLQz5EcfXZAmR904uCS+mDddrbFppe1DzeO6ZynToSVa4iHe08+/mpG9H0tFcUsj+DKEWUE9HqBLTVD/g44nR7fheir0y6AYqNO9O5EiPKgWhVvMr1ez/b9/ONOEaNF02Ld8Ftt/W1qxVmCP3paFHuKZe06T8lhEYaKyp6MibEvlU/P51oVnQ/mR/mcnK0z5lofzXiXXhsHLkVhfbxira0q6OSjkRT8Eh5W9zF++lOFFoxaXmWzs7uOxGV44ijfBBEFG53xzgQ9XMCeryofvd2PqK+TpSPFVXF+9xEdec15iS68Xd1aJSov/ocJ+r1ZsYIUZ/1OUbU89Uha1HfN3KsRX3fwbMWHThTQqIkSqIkSqIkSqIk6kd09dz65Jnbii48I9zp+gV37jxDoq4hUdf8T6KNt9u0Ogx+sYAtJ79LOchR2PiXzoBGwrieL0Nz5zJMehMdbGJPhFzbftftzOnfQfSd05nx7Ie2py0aJNDFvjm+pXvoyO4Mf/enhnvKWHdfNQSqY2DAnf+QNJ8qzW/K8yq031/qde+3s6T2L9PzOjTnrAw/jhMEQRAEQRAE5w/6VlvVhOzL/AAAAABJRU5ErkJggg==";
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
        console.log("trying");
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
  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };
  const handleCreateOrganization = async () => {
    if (!organizationLogo) {
      return toast.error("Please upload organization logo");
    }
    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !websiteRef.current.value ||
      !industryRef.current.value ||
      !locationRef.current.value ||
      !descriptionRef.current.value
    ) {
      return toast.error("Please fill in all required fields");
    }
    const res = await makeRequest("/organization", {
      name: nameRef.current.value,
      email: emailRef.current.value,
      website: websiteRef.current.value,
      industry: industryRef.current.value,
      location: locationRef.current.value,
      description: descriptionRef.current.value,
      logo: organizationLogo,
    });
    if (res.error) return;
    toast.success("Organization created successfully");
    nameRef.current.value = "";
    emailRef.current.value = "";
    websiteRef.current.value = "";
    locationRef.current.value = "";
    industryRef.current.value = "";
    descriptionRef.current.value = "";
    setOrganizations((prev) => [...prev, res.response.organization]);

    setOrganizationLogo(null);
    onClose();
  };
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
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
              <Stack pt={2}>
                <Fieldset.Legend
                  fontWeight={"400"}
                  fontSize={{ base: "12px", md: 20 }}
                  fontFamily="InterBold"
                  color={"#1A1A21"}
                >
                  Create Organization
                </Fieldset.Legend>
                <Dialog.CloseTrigger
                  rounded={30}
                  border={"1px solid #9E9E9E"}
                  asChild
                >
                  <CloseButton
                    size={{ base: "xs", md: "xs" }}
                    color={"#9E9E9E"}
                    // fontSize={10}
                  />
                </Dialog.CloseTrigger>
              </Stack>

              {/* Profile logo */}
              {/* <Stack m={"auto"} my={{ base: 5, md: 0 }} position={"relative"}>
                <Image
                  src={logo}
                  alt="Update"
                  boxSize={{ base: "30px", md: "60px" }}
                  borderRadius="full"
                  objectFit="cover"
                />
                <Button
                  w={"100%"}
                  bg={"transparent"}
                  position={"absolute"}
                  top={"7"}
                  left={"6"}
                >
                  <Image
                    src={tick}
                    alt="tick"
                    w={19}
                    borderRadius="md"
                    objectFit="cover"
                  />
                </Button>
              </Stack> */}

              <Fieldset.Content pr={3}>
                {/* Name */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Name of Organization
                  </Field.Label>
                  <InputGroup startElement={<CiUser />}>
                    <Input
                      py={{ base: 2, md: 6 }}
                      fontSize={{ base: "10px", md: "14px" }}
                      placeholder="Organization name"
                      ref={nameRef}
                    />
                  </InputGroup>
                </Field.Root>
                <Stack position={"relative"}>
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Organization Logo{" "}
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

                {/* Website URL */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Organization Email
                  </Field.Label>
                  <InputGroup startElement={<LucideMail size={15} />}>
                    <Input
                      py={{ base: 2, md: 6 }}
                      fontSize={{ base: "10px", md: "14px" }}
                      placeholder="Organization official email"
                      ref={emailRef}
                    />
                  </InputGroup>
                </Field.Root>
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Website URL
                  </Field.Label>
                  <InputGroup startElement={<LuLink2 size={15} />}>
                    <Input
                      py={{ base: 2, md: 6 }}
                      fontSize={{ base: "10px", md: "14px" }}
                      placeholder="Organization website URL"
                      ref={websiteRef}
                    />
                  </InputGroup>
                </Field.Root>

                {/* Industry */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Industry
                  </Field.Label>
                  <InputGroup startElement={<FaBriefcase size={15} />}>
                    <Input
                      py={{ base: 2, md: 6 }}
                      fontSize={{ base: "10px", md: "14px" }}
                      placeholder="Fintech"
                      ref={industryRef}
                    />
                  </InputGroup>
                </Field.Root>

                {/* Location */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Location
                  </Field.Label>
                  <InputGroup startElement={<IoLocationOutline size={15} />}>
                    <Input
                      py={{ base: 2, md: 6 }}
                      fontSize={{ base: "10px", md: "14px" }}
                      placeholder="Select"
                      ref={locationRef}
                    />
                  </InputGroup>
                </Field.Root>

                {/* Description */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Organization Description
                  </Field.Label>
                  <Textarea
                    resize="none"
                    fontSize={{ base: "10px", md: "16px" }}
                    h={{ base: "80px", md: 150 }}
                    placeholder="Type here"
                    ref={descriptionRef}
                  />
                </Field.Root>

                {/* Members */}
                {/* {members.map((member, index) => (
                  <HStack
                    key={index}
                    gap="1"
                    alignItems={"center"}
                    width="full"
                    flexWrap={{ base: "wrap", md: "nowrap" }}
                    justifyContent={"center"}
                    py={{ base: 4, md: 0 }}
                  >
                    <Image
                      src={logo}
                      alt="Member"
                      boxSize="30px"
                      borderRadius="full"
                      objectFit="cover"
                    />
                    <Field.Root>
                      <Input
                        placeholder="Name"
                        fontSize={{ base: "10px", md: "16px" }}
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        variant="outline"
                      />
                    </Field.Root>
                    <Field.Root>
                      <Input
                        placeholder="profession"
                        value={member.profession}
                        fontSize={{ base: "10px", md: "16px" }}
                        onChange={(e) =>
                          handleMemberChange(
                            index,
                            "profession",
                            e.target.value
                          )
                        }
                        variant="outline"
                      />
                    </Field.Root>

                  </HStack>
                ))} */}

                {/* <Button
                  border={"1px solid #DFDFDF"}
                  onClick={handleAddMember}
                  fontWeight={"400"}
                  fontFamily="InterRegular"
                  py={{ base: 2, md: 6 }}
                  fontSize={{ base: "10px", md: "14px" }}
                  my={3}
                  color={"#333333CC"}
                  bg={"#EDEDED"}
                >
                  <MdAddCircleOutline color="#1D1B20" />
                  Add Members
                </Button> */}
              </Fieldset.Content>

              {/* Submit Button */}
              <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
                <Button
                  onClick={() => onClose()}
                  py={{ base: 2, md: 6 }}
                  fontSize={{ base: "10px", md: "14px" }}
                  px={{ base: 5, md: 50 }}
                  w={{ base: "100%", md: "auto" }}
                  bg={"#fff"}
                  color={"#2B362F"}
                  border={"1px solid #2B362F"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateOrganization}
                  py={{ base: 2, md: 6 }}
                  fontSize={{ base: "10px", md: "14px" }}
                  flex={1}
                  w={{ base: "100%", md: "auto" }}
                  rounded={5}
                  bg={"#2B362F"}
                  color="white"
                >
                  {loading ? <Spinner /> : "Create Organization"}
                </Button>
              </HStack>
            </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

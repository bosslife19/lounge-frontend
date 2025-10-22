import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Fieldset,
  HStack,
  Image,
  Input,
  Portal,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import getCroppedImg from "../../../../../lib/getCroppedImage";
import Cropper from "react-easy-crop";
import { useRequest } from "../../../../../hooks/useRequest";
import axios from "axios";
import { toast } from "react-toastify";

function EditOrganization({ isOpen, onClose, setRefresh }) {
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const organizationDescRef = useRef("");
  const organizationNameRef = useRef("");
  const organizationEmailRef = useRef("");
  const { loading, makeRequest } = useRequest();
  const organizationLocationRef = useRef("");
  const organizationWebsiteRef = useRef("");
  const [organizationLogo, setOrganizationLogo] = useState("");
  const [organizationLogoPreview, setOrganizationLogoPreview] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // const [cropType, setCropType] = useState('profile'); // "profile" or "logo"
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [showCropper, setShowCropper] = useState(false);

  const logoInputRef = useRef(null);
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
      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
        setShowCropper(true);
        // setCropType(type);
      });
      reader.readAsDataURL(file);

      // TODO: send `file` to your backend API for upload
      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append("upload_preset", "lounge-platform"); // Replace with your Cloudinary preset

      // try {
      //   const res = await axios.post(
      //     "https://api.cloudinary.com/v1_1/wokodavid/image/upload",
      //     formData
      //   );

      //   const imageUrl = res.data.secure_url;
      //   setOrganizationLogo(imageUrl);
      // } catch (error) {
      //   console.error("Image upload failed", error);
      //   toast.error("Image Upload Failed. Please try again.");
      // }
    }
  };
  const handleCropComplete = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (!croppedImage) throw new Error("Cropping failed");

      setShowCropper(false);
      setImageSrc(null);

      // Show local preview first

      setOrganizationLogoPreview(croppedImage);

      // ✅ Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", croppedImage);
      formData.append("upload_preset", "lounge-platform");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/wokodavid/image/upload",
        formData
      );

      const imageUrl = res.data.secure_url;
      setOrganizationLogo(imageUrl);
    } catch (e) {
      console.error(e);
      toast.error("Error cropping or uploading image. Please try again.");
    }
  };
  const handleEditOrg = async () => {
    const orgData = {
      name: organizationNameRef.current.value,
      email: organizationEmailRef.current.value,
      website: organizationWebsiteRef.current.value,
      logo: organizationLogo,
      location: organizationLocationRef.current.value,
      description: organizationDescRef.current.value,
      id: userDetails.organization?.id,
    };
    const res = await makeRequest("/edit-organization", orgData);

    // setUserDetails(res.response.user);

    if (res.error) {
      return;
    }
    toast.success("Organization Edited Successfully");
    setRefresh((prev) => !prev);
    onClose(); // notify parent component
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
            <Dialog.CloseTrigger
              asChild
              rounded="full"
              position="absolute"
              top={3}
              right={3}
              border="1px solid #D0D5DD"
            >
              <CloseButton size="sm" color="#475467" />
            </Dialog.CloseTrigger>

            <Fieldset.Root size={{ base: "sm", md: "lg" }}>
              <Stack>
                <Fieldset.Legend
                  fontWeight={"400"}
                  fontSize={{ base: 15, md: 20 }}
                  fontFamily="InterBold"
                  color={"#1A1A21"}
                >
                  Edit Organization
                </Fieldset.Legend>
              </Stack>
              <Field.Root>
                <Field.Label
                  fontWeight={"400"}
                  fontSize={{ base: "10px", md: 14 }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                >
                  <HStack spacing={1} align="center">
                    <Text> Organization Name</Text>*{/* Yellow star icon */}
                  </HStack>
                </Field.Label>

                <Input
                  fontSize={{ base: "8px", md: 12 }}
                  py={{ base: 1, md: 6 }}
                  placeholder=""
                  ref={organizationNameRef}
                  defaultValue={userDetails.organization?.name}
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
                    <Text> Description</Text>*{/* Yellow star icon */}
                  </HStack>
                </Field.Label>

                <Textarea
                  resize="none"
                  h={200}
                  fontSize={{ base: "8px", md: 12 }}
                  placeholder="Type here"
                  defaultValue={userDetails.organization?.description}
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

                    {/* Yellow star icon */}
                  </HStack>
                </Text>
                <Image
                  src={
                    organizationLogoPreview || userDetails.organization?.logo
                  } // fallback to default image
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
                  onChange={(e) => handleLogoChange(e)}
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
                    <Text> Organization Location</Text>*{/* Yellow star icon */}
                  </HStack>
                </Field.Label>

                <Input
                  fontSize={{ base: "8px", md: 12 }}
                  py={{ base: 1, md: 6 }}
                  placeholder=""
                  ref={organizationLocationRef}
                  defaultValue={userDetails.organization?.location}
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
                    <Text> Organization Email</Text>*{/* Yellow star icon */}
                  </HStack>
                </Field.Label>

                <Input
                  fontSize={{ base: "8px", md: 12 }}
                  py={{ base: 1, md: 6 }}
                  placeholder=""
                  ref={organizationEmailRef}
                  defaultValue={userDetails.organization?.email}
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

                    {/* Yellow star icon */}
                  </HStack>{" "}
                </Field.Label>

                <Input
                  fontSize={{ base: "8px", md: 12 }}
                  py={{ base: 1, md: 6 }}
                  placeholder=""
                  ref={organizationWebsiteRef}
                  defaultValue={userDetails.organization?.website_url}
                />
              </Field.Root>
              <HStack>
                <Button
                  onClick={handleEditOrg}
                  fontSize={{ base: "8px", md: 12 }}
                  py={{ base: 1, md: 6 }}
                  w={{ base: "100%" }}
                  rounded={5}
                  bg={"#2B362F"}
                >
                  {loading ? <Spinner /> : "Update Organization"}
                </Button>
              </HStack>
            </Fieldset.Root>
            {showCropper && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0,0.75)",
                  zIndex: 10000,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "90%",
                    maxWidth: "400px",
                    height: "400px",
                    background: "#333",
                  }}
                >
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    onCropChange={setCrop}
                    onCropComplete={(_, croppedPixels) =>
                      setCroppedAreaPixels(croppedPixels)
                    }
                    onZoomChange={setZoom}
                  />
                </div>

                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <Button onClick={() => setShowCropper(false)}>Cancel</Button>
                  <Button
                    colorScheme="blue"
                    onClick={handleCropComplete}
                    style={{ cursor: "pointer" }}
                  >
                    Crop & Save
                  </Button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default EditOrganization;

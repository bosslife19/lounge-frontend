import {
  Dialog,
  Portal,
  CloseButton,
  Stack,
  Button,
  Heading,
  Input,
  FileUpload,
  Textarea,
  Spinner,
  Text,
  Image,
} from "@chakra-ui/react";
// import { CgAttachment } from "react-icons/cg";
// import { CiImageOn } from "react-icons/ci";
// import { PiTelegramLogoLight } from "react-icons/pi";
import { useRequest } from "../../../../hooks/useRequest";
import { useRef, useState } from "react";
// import axios from "axios";
import tick from '../../../../assets/Verified tick2.png'
import { toast } from "react-toastify";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../../lib/getCroppedImage";
import axios from "axios";

export const CreateSpeakerHighlight = ({
  isOpen,
  onClose,
  programId,
  refresh,
}) => {
  const { loading, makeRequest } = useRequest();

  const nameRef = useRef("");
   const [imageSrc, setImageSrc] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [cropType, setCropType] = useState(null); // "profile" or "logo"
    const [zoom, setZoom] = useState(1);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
     const fileInputRef = useRef(null);
       const [preview, setPreview] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const [profileImage, setProfileImage] = useState('https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg');
  const highlightRef = useRef("");
  // const imagePlaceHolder = 'https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg'
    const handleImageClick = () => {
    if (fileInputRef.current) {
     
      fileInputRef.current.click(); // open file picker
    }
  };
  const handleFileChange = async (event, type) => {
    const file = event.target.files?.[0];
    if (file) {
      // show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
        setShowCropper(true);
        
      });
      reader.readAsDataURL(file);

      
     
    }
  };
 const handleCropComplete = async () => {
  try {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (!croppedImage) throw new Error("Cropping failed");

    setShowCropper(false);
    setImageSrc(null);

    // Show local preview first
    
      setProfileImage(croppedImage);
      setPreview(croppedImage);
   

    // ✅ Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", croppedImage);
    formData.append("upload_preset", "lounge-platform");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/wokodavid/image/upload",
      formData
    );

    const imageUrl = res.data.secure_url;

   
      setProfileImage(imageUrl);

      
   
  } catch (e) {
    console.error(e);
    toast.error("Error cropping or uploading image. Please try again.");
  }
};
  const handlePost = async () => {
    if (!nameRef.current.value || !highlightRef.current.value) {
      return toast.error("Missing required fields");
    }

    const response = await makeRequest("/speaker-highlights", {
      name: nameRef.current?.value,
      highlight: highlightRef.current?.value,
      programId,
      speakerImage: profileImage
    });

    if (response.error) return;

    toast.success("Speaker Highlight added successfully");

    refresh();
    onClose();
  };

  // const handleFileChange = async (event) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setPostImage(file);
  //   }
  // };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={5}>
          <Dialog.Content borderRadius="lg" bg="#FAFAFA" p={4}>
            <Dialog.CloseTrigger
              rounded={30}
              border={"1px solid #9E9E9E"}
              asChild
            >
              <CloseButton size="xs" color={"#9E9E9E"} />
            </Dialog.CloseTrigger>
            <Stack spacing={0}>
              <Heading
                fontSize={{ base: "12px", md: 18 }}
                size={{ base: "xs", md: "sm" }}
              >
                Create Speaker Highlight
              </Heading>
              <Stack
                              justifyContent={"center"}
                              alignItems={{ base: "flex-start", md: "center" }}
                              width={"100%"}
                              mx={"auto"}
                              position={"relative"}
                            >
                              <Image
                                src={preview||profileImage} // fallback to default image
                                alt="Profile Image"
                                boxSize={{ base: "30px", md: "100px" }}
                                borderRadius="full"
                                objectFit="cover"
                                cursor="pointer"
                                onClick={handleImageClick}
                              />
                                               <Image
                                              src={tick}
                                              alt="tick"
                                              w={4}
                                              position={"absolute"}
                                              bottom={"0"}
                                              // right={"-1"}
                                              left={'53%'}
                                              borderRadius="md"
                                              objectFit="cover"
                                              cursor="pointer"
                                              onClick={handleImageClick}
                                            />
                              
              
                              <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={(e)=>handleFileChange(e, cropType)}
                              />
                            </Stack>
              <Text
                fontSize={{ base: "10px", md: 14 }}
                // size={{ base: "xs", md: "sm" }}
              >
                Speaker Name
              </Text>
              <Input
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
                type="text"
                ref={nameRef}
              />

              <>
                <Text fontSize={{ base: "10px", md: 14 }}>
                  Speaker Highlight
                </Text>
                <Textarea
                  type="text"
                  fontSize={{ base: "10px", md: 14 }}
                  placeholder="Paste the highlighted speaker's statement"
                  ref={highlightRef}
                />
              </>

              {/* <HStack maxW={200} justifyContent={"flex-start"}>
                <FileUpload.Root>
                  <FileUpload.HiddenInput />
                  <FileUpload.Trigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleImageClick}
                    >
                      <CiImageOn />{" "}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                     Add Video Thumbnail
                    </Button>
                  </FileUpload.Trigger>
                  <FileUpload.List />
                </FileUpload.Root>
               


              </HStack> */}

              <Button
                rounded={20}
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
                onClick={handlePost}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Save"}
              </Button>
            </Stack>
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
                          aspect={ 1}
                          cropShape='round'
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
                        <Button colorScheme="blue" onClick={handleCropComplete} style={{cursor:'pointer'}}>
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
};

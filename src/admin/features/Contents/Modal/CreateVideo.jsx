import {
  Dialog,
  Portal,
  CloseButton,
  Stack,
  HStack,
  Image,
  Text,
  Button,
  Heading,
  Input,
  FileUpload,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import { CgAttachment } from "react-icons/cg";
import { CiImageOn } from "react-icons/ci";
import { PiTelegramLogoLight } from "react-icons/pi";
import { useRequest } from "../../../../hooks/useRequest";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../../lib/getCroppedImage";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CreateVideo = ({ isOpen, onClose, setVideos }) => {
  const { loading, makeRequest } = useRequest();
  const [addLink, setAddLink] = useState(false);
  const titleRef = useRef("");
  const contentRef = useRef("");
  const fileInputRef = useRef(null);
  const [postImage, setPostImage] = useState(null);
   const [imageSrc, setImageSrc] = useState(null);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

      const [zoom, setZoom] = useState(1);
      const [crop, setCrop] = useState({ x: 0, y: 0 });
      
         const [preview, setPreview] = useState(null);
      const [showCropper, setShowCropper] = useState(false);
  const linkRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // open file picker
    }
  };
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState('');
  // Helper function to extract YouTube video ID
const extractYouTubeId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};



  const handlePost = async () => {
    if (!titleRef.current.value || !linkRef.current.value) {
      return toast.error("Missing required fields");
    }

    if (!image) {
      return toast.error('Thumbnail Unavailable. Try again')

    }
    
    const response = await makeRequest("/upload-video", {
      title: titleRef.current?.value,
      link: linkRef.current?.value,
      image,
    });

    if (response.error) return;

    toast.success("Video uploaded successfully");
    setVideos((prev) => [response.response.video, ...prev]);
    setIsLoading(false);

    titleRef.current.value = "";
    setPreview(null);

    setPostImage(null);
    onClose();
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
      
        setPostImage(croppedImage);
        setPreview(croppedImage);
        setImage(null)
     
  
      // ✅ Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", croppedImage);
      formData.append("upload_preset", "lounge-platform");
  setUploading(true)
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/wokodavid/image/upload",
        formData
      );
  
      const imageUrl = res.data.secure_url;
  
     
       setImage(imageUrl)
       setUploading(false)
  
        
     
    } catch (e) {
      setUploading(false)
      console.error(e);
      toast.error("Error uploading image. Please try again.");
    }
  };

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
              <Heading>Create Video Content</Heading>
              <Text>Video Title</Text>
              <Input
                fontSize={{ base: "10px", md: 16 }}
                type="text"
                ref={titleRef}
              />

              <>
                <Text fontSize={{ base: "10px", md: 16 }}>
                  Paste Video Link
                </Text>
<Input
  type="text"
  fontSize={{ base: "10px", md: 16 }}
  placeholder="Paste link to video here (e.g. YouTube, Vimeo, TikTok, etc)"
  ref={linkRef}
  onChange={(e) => {
    const url = e.target.value;
    const videoId = extractYouTubeId(url);
    if (videoId) {
      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      
      setPreview(thumbnailUrl)
      setImage(thumbnailUrl)
      
    }
  }}
/>
              </>

              <HStack maxW={200} justifyContent={"flex-start"}>
                {/* <FileUpload.Root>
                  <FileUpload.HiddenInput />
                  <FileUpload.Trigger asChild> */}
                    <Button
                      variant="outline"
                      size={{ base: "xs", md: "sm" }}
                      fontSize={{ base: "10px", md: 16 }}
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
                    
                  {/* </FileUpload.Trigger>
                  <FileUpload.List />
                </FileUpload.Root> */}
                {/* add Link */}
              </HStack>
              {preview && (
  <Image
    src={typeof preview === "string" ? preview : URL.createObjectURL(preview)}
    alt="Video thumbnail"
    borderRadius="md"
    mt={3}
    boxSize="120px"
    objectFit="cover"
  />
)}

              <Button
                size={{ base: "xs", md: "sm" }}
                fontSize={{ base: "10px", md: 16 }}
                rounded={20}
                onClick={handlePost}
                disabled={loading||uploading}
              >
                {loading || isLoading ? <Spinner /> :uploading?'Uploading Thumbnail...': "Upload Video"}
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
                                      aspect={ 3/2}
                                      
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

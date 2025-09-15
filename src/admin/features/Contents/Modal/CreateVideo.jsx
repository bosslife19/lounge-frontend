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
  const linkRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // open file picker
    }
  };
  let image;
  const handlePost = async () => {
    if(!titleRef.current.value || !linkRef.current.value){
      return toast.error('Missing required fields');
    }
   
    if (postImage) {
      const formData = new FormData();
      formData.append("file", postImage);
      formData.append("upload_preset", "lounge-platform"); // Replace with your Cloudinary preset
      try {
        setIsLoading(true);
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/wokodavid/image/upload",
          formData
        );
        image = res.data.secure_url;
      } catch (error) {
        console.error("Thumbnail upload failed", error);
        setIsLoading(false);
        toast.error("Thumbnail Upload Failed. Please check your internet try again.");
        return;
      }
    }

    const response = await makeRequest("/upload-video", {
      
      title: titleRef.current?.value,
      link:linkRef.current?.value,
      image,
    });

    if (response.error) return;

    toast.success("Video uploaded successfully");
    setVideos((prev) => [response.response.video, ...prev]);
    setIsLoading(false);
    
    titleRef.current.value = "";

    setPostImage(null);
    onClose();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
     
      setPostImage(file);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
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
              <Input type="text" ref={titleRef} />
               
                <>
                  <Text>Paste Video Link</Text>
                  <Input
                    type="text"
                    placeholder="Paste link to video here (e.g. youtube, vimeo, tiktok etc)"
                    ref={linkRef}
                  />
                </>
             
             
              <HStack maxW={200} justifyContent={"flex-start"}>
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
                {/* add Link */}


              </HStack>
             
              <Button rounded={20} onClick={handlePost} disabled={loading}>
                {loading ||isLoading?<Spinner/>:'Upload Video'}
              </Button>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

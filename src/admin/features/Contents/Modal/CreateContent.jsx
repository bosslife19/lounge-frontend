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

export const CreateArticle = ({ isOpen, onClose, setArticles }) => {
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
    if(!titleRef.current.value || !contentRef.current.value){
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
        console.error("Image upload failed", error);
        setIsLoading(false);
        toast.error("Image Upload Failed. Please try again.");
        return;
      }
    }

    const response = await makeRequest("/upload-article", {
      content:contentRef.current.value,
      title: titleRef.current?.value,
      link:linkRef.current?.value,
      image,
    });

    if (response.error) return;

    toast.success("Content uploaded successfully");
    setArticles((prev) => [response.response.article, ...prev]);
    setIsLoading(false);
    contentRef.current.value = "";
    titleRef.current.value = "";

    setPostImage(null);
    onClose();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // show preview
      const reader = new FileReader();

      reader.readAsDataURL(file);

      // TODO: send `file` to your backend API for upload
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
              <Heading>Create Article</Heading>
              <Text>Title</Text>
              <Input type="text" ref={titleRef} />
              <Textarea
                h={100}
                pb={300}
                fontSize={13}
                autoresize
                variant="subtle"
                placeholder="Write your post or question here"
                ref={contentRef}
              />
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
                      Add media
                    </Button>
                  </FileUpload.Trigger>
                  <FileUpload.List />
                </FileUpload.Root>
                {/* add Link */}

                <Button
                  my={4}
                  bg={"#EFF2FC"}
                  color={"#292D32"}
                  rounded={20}
                  fontSize={11}
                  mr={"auto"}
                  onClick={() => setAddLink(true)}
                >
                  <CgAttachment />
                  Add Link
                </Button>
              </HStack>
              {addLink && (
                <>
                  <Text>Add your link</Text>
                  <Input
                    type="text"
                    placeholder="Paste link here"
                    ref={linkRef}
                  />
                </>
              )}
              <Button rounded={20} onClick={handlePost} disabled={loading}>
                {loading ||isLoading?<Spinner/>:'Post'} <PiTelegramLogoLight />
              </Button>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

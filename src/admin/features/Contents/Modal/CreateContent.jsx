import {
  Dialog,
  Portal,
  CloseButton,
  Stack,
  HStack,
  Text,
  Button,
  Heading,
  Input,
  Textarea,
  Spinner,
  
 
} from "@chakra-ui/react";
import { CgAttachment } from "react-icons/cg";
import { CiImageOn } from "react-icons/ci";
import { useRequest } from "../../../../hooks/useRequest";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CreateArticle = ({ isOpen, onClose, setArticles }) => {
  const { loading, makeRequest } = useRequest();
  const [addLink, setAddLink] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("article"); // <-- new state for type

  const titleRef = useRef("");
  const contentRef = useRef("");
  const fileInputRef = useRef(null);
  const linkRef = useRef("");

  const handlePost = async () => {
    if (!titleRef.current.value || !contentRef.current.value) {
      return toast.error("Missing required fields");
    }

    let image;
    if (postImage) {
      const formData = new FormData();
      formData.append("file", postImage);
      formData.append("upload_preset", "lounge-platform"); // replace with your preset

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
      title: titleRef.current?.value,
      content: contentRef.current.value,
      link: linkRef.current?.value,
      image,
      type, // <-- send article/news type
    });

    if (response.error) return;

    toast.success("Content uploaded successfully");
    setArticles((prev) => [response.response.article, ...prev]);
    setIsLoading(false);

    // reset form
    contentRef.current.value = "";
    titleRef.current.value = "";
    linkRef.current.value = "";
    setPostImage(null);
    setAddLink(false);
    setType("article");
    onClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPostImage(file); // store selected file
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

            <Stack spacing={3}>
              <Heading>Create Content</Heading>

              {/* Type selector */}
              {/* <Text fontWeight="semibold">Type</Text> */}
<Text fontWeight="semibold">Type</Text>
<div style={{ margin: "20px 0" }}>
  <label style={{ fontWeight: "600", marginBottom: "10px", display: "block" }}>
    Select Content Type:
  </label>

  <label
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      cursor: "pointer",
      fontSize: "15px",
    }}
  >
    <input
      type="radio"
      name="contentType"
      value="article"
      checked={type === "article"}
      onChange={(e) => setType(e.target.value)}
      style={{
        marginRight: "8px",
        width: "16px",
        height: "16px",
        accentColor: "#111", // modern blue highlight
      }}
    />
    Article
  </label>

  <label
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      cursor: "pointer",
      fontSize: "15px",
    }}
  >
    <input
      type="radio"
      name="contentType"
      value="news"
      checked={type === "news"}
      onChange={(e) => setType(e.target.value)}
      style={{
        marginRight: "8px",
        width: "16px",
        height: "16px",
        accentColor: "#111",
      }}
    />
    News / Update
  </label>
</div>


              <Text>Title</Text>
              <Input type="text" ref={titleRef} />

              <Textarea 
              border={'1px solid #D3D4D7'}
              h={100} pb={300} fontSize={13} autoresize variant="subtle" placeholder="Write your article or update here" ref={contentRef}/>

              <HStack>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<CiImageOn />}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Add media
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                <Button
                  bg={"#EFF2FC"}
                  color={"#292D32"}
                  rounded={20}
                  fontSize={11}
                  onClick={() => setAddLink(!addLink)}
                >
                  <CgAttachment />
                  Add Link
                </Button>
              </HStack>

              {postImage && (
                <Text fontSize="sm" color="green.600">
                  Selected: {postImage.name}
                </Text>
              )}

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

              <Button rounded={20} onClick={handlePost} disabled={loading || isLoading}>
                {loading || isLoading ? <Spinner /> : "Post"}
              </Button>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

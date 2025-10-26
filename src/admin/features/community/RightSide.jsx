import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Image,
  InputGroup,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { cardData } from "../../../hooks/useData";
import like from "../../../assets/streamline_like-1-solid.png";
import heart from "../../../assets/solar_heart-angle-bold.png";
import bulb from "../../../assets/fluent-color_lightbulb-filament-20.png";
import { CiImageOn } from "react-icons/ci";
import { PiTelegramLogoLight } from "react-icons/pi";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";
import { userAvatar } from "../../../user/features/setting/posts/Posts";
import axios from "axios";

export const AdminRightSide = ({ setPosts }) => {
  const postRef = useRef(null);
  const fileInputRef = useRef(null);
  const [postImage, setPostImage] = useState(null);
  const [fileName, setFileName] = useState(""); // ✅ store file name
  const { userDetails } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  let image;
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // open file picker
    }
  };
  const { makeRequest, loading } = useRequest();

  const handlePost = async () => {
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

    const response = await makeRequest("/upload-post-admin", {
      body: postRef.current?.value,
      image,
    });

    if (response.error) return;

    toast.success("Post uploaded successfully");
    setPosts((prev) => [response.response.post, ...prev]);
    setIsLoading(false);
    postRef.current.value = "";
    setPostImage(null);
    setFileName(""); // ✅ clear after posting
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPostImage(file);
      setFileName(file.name); // ✅ show file name instead of preview
    }
  };

  const actions = [
    { id: 1, image: like },
    { id: 2, image: heart },
    { id: 3, image: bulb },
  ];

  return (
    <Stack mb={{ base: 0, md: "auto" }}>
      <Card.Root
        bg={"#fff"}
        shadowColor={"#080F340F"}
        shadow={"sm"}
        rounded={20}
        border={"1px solid #fff"}
        px={4}
      >
        <Card.Body gap="2">
          <HStack ml={-5}>
            <Stack position={"relative"}>
              <Image
                src={userDetails?.profile_picture || userAvatar}
                alt="Update"
                boxSize={{ base: "35px", md: "50px" }}
                rounded={50}
              />
            </Stack>
            <Stack>
              <Text
                color={"#191919"}
                fontSize={{ base: 10, md: 21 }}
                fontFamily="InterBold"
              >
                {userDetails?.name}
              </Text>
              <Text
                mt={-3}
                color={"#202020"}
                fontWeight={"normal"}
                fontSize={{ base: 10, md: 21 }}
                fontFamily="InterRegular"
              >
                {userDetails?.profession}
              </Text>
            </Stack>
          </HStack>
        </Card.Body>

        <Textarea
          ref={postRef}
          h={100}
          pb={{ base: 100, md: 300 }}
          fontSize={{ base: 9, md: 13 }}
          autoresize
          variant="subtle"
          placeholder="Write your post or question here"
        />

        <Button
          onClick={handleImageClick}
          my={4}
          bg={"#EFF2FC"}
          color={"#292D32"}
          rounded={{ base: 5, md: 20 }}
          fontSize={{ base: 8, md: 11 }}
          mr={"auto"}
          gap={1}
          alignItems={"center"}
          p={{ base: 1, md: 4 }}
          size={{ base: "10", md: "md" }}
        >
          <CiImageOn />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          Add media
        </Button>

        {/* ✅ Display green file name if selected */}
        {fileName && (
          <Text color="green.500" fontSize={{ base: 10, md: 13 }} ml={2} mb={2}>
            {fileName}
          </Text>
        )}

        <Card.Footer borderTop={"1px solid #D4D7E5"}>
          <Button
            mt={{ base: 2, md: 5 }}
            mb={{ base: -3, md: 0 }}
            bg={"#000"}
            color={"#fff"}
            rounded={20}
            fontSize={{ base: 9, md: 15 }}
            px={{ base: 5, md: 10 }}
            py={{ base: 1, md: 4 }}
            mr={-4}
            size={{ base: "10", md: "md" }}
            fontFamily="InterRegular"
            ml={"auto"}
            gap={2}
            onClick={handlePost}
          >
            {loading || isLoading ? <Spinner /> : "Post"}
            <PiTelegramLogoLight size={10} />
          </Button>
        </Card.Footer>
      </Card.Root>
    </Stack>
  );
};

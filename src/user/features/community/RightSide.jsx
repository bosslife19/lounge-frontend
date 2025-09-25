import {
  Avatar,
  Box,
  Button,
  Card,
  CloseButton,
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
import { BsThreeDots } from "react-icons/bs";
import like from "../../../assets/streamline_like-1-solid.png";
import heart from "../../../assets/solar_heart-angle-bold.png";
import bulb from "../../../assets/fluent-color_lightbulb-filament-20.png";
import { GrMicrophone } from "react-icons/gr";
import { CiImageOn } from "react-icons/ci";
import { PiTelegramLogoLight } from "react-icons/pi";
import userImage from "../../../assets/userImage.jpg";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import { TfiClose } from "react-icons/tfi";

export const RightSide = ({ setPosts, posts, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  // const actions = [
  //   { id: 1, image: like },
  //   { id: 2, image: heart },
  //   { id: 3, image: bulb},
  //    ];

  const postRef = useRef(null);
   const temporalLogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACUCAMAAAAwLZJQAAAAY1BMVEX///8AAADY2Nh+fn5KSkqTk5OoqKglJSWkpKTq6uo+Pj5OTk7y8vL8/PyGhobAwMANDQ20tLRaWloVFRXi4uKbm5vIyMhfX181NTV2dnZTU1MqKipmZmZvb2+MjIzS0tIdHR11wAe4AAAEIUlEQVR4nO2ca5uqIBCAl+6WaV4yy9rt///Ks26nA+KADCL4nJ33q2y9Cw4Mtz4+CIIgiF/JMcqS/LAKTH7NoqPWs1qyuXBJ1ZpxcgqtJ3KLFZ5lHVpN4vkFekaH0GI9tiUURnloLYAn0Pq70FIgSS/44ya0E8xCFt2ENlJwld/Qa2gjFXLXJLR8sglNIthIbb/gT85g5+WXlI88WfcJF62jMG5d+Niz6T7goqtZiO7/+ey6D0jUEhJ1DYm6xl40qrIsq6D8cBIsRePzqim+nxXNPin1s66QomXCRK7wBCG8aCZPpQoP2QBe9JiwPnfV/DCg6BrwZOwx9YuKFj2DnowtJzbFii4gyR+kNDGwqGYKXUxbpUjRTOnJ2HpGoseHRvQw6VCLE400noxV8xFNtaKTdvs4Uaiv5+TYL68QwwROVL9stkV67tjdvKfAie4hPw7W8zufMa7TcKKvodi4TnGiF61ng/F8r8GZDr04UTghefNAePJPupi1Pk600opKn6BDXCQ2S7xcdvjmiX43BTNKZpFDqG7XKTeOYDlVvBjUKTIp0Q1Nxi3fT2kfw/8jNh9VZyW1qecn8MfDEYUVVb+lpikJvNkyGFHoqYgq8KXlVSVQfbbkA0kifnIH75b0t39gVFOuwTHKYl6fARu5a0NP3Yhx19apzQLEl7xH2mg2qI09Gbvp/lurJZ14sxU+/7Q2nYOo2/2FrpeyXc3Lkrwu2Km+LTfGOaU+7W7RjBn2y45xufhalIgJ3VB9tqgjyt9C7nB9ttxUX+ZNVB9HHFXr+xJV9fN9LvDXeRI1a/cX8BEXP6Km7f4CzE+9iGLPTkGLQz5EcfXZAmR904uCS+mDddrbFppe1DzeO6ZynToSVa4iHe08+/mpG9H0tFcUsj+DKEWUE9HqBLTVD/g44nR7fheir0y6AYqNO9O5EiPKgWhVvMr1ez/b9/ONOEaNF02Ld8Ftt/W1qxVmCP3paFHuKZe06T8lhEYaKyp6MibEvlU/P51oVnQ/mR/mcnK0z5lofzXiXXhsHLkVhfbxira0q6OSjkRT8Eh5W9zF++lOFFoxaXmWzs7uOxGV44ijfBBEFG53xzgQ9XMCeryofvd2PqK+TpSPFVXF+9xEdec15iS68Xd1aJSov/ocJ+r1ZsYIUZ/1OUbU89Uha1HfN3KsRX3fwbMWHThTQqIkSqIkSqIkSqIk6kd09dz65Jnbii48I9zp+gV37jxDoq4hUdf8T6KNt9u0Ogx+sYAtJ79LOchR2PiXzoBGwrieL0Nz5zJMehMdbGJPhFzbftftzOnfQfSd05nx7Ie2py0aJNDFvjm+pXvoyO4Mf/enhnvKWHdfNQSqY2DAnf+QNJ8qzW/K8yq031/qde+3s6T2L9PzOjTnrAw/jhMEQRAEQRAE5w/6VlvVhOzL/AAAAABJRU5ErkJggg=='
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null)
  const [postImage, setPostImage] = useState(null);
  const { userDetails } = useContext(AuthContext);
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

    const response = await makeRequest("/upload-post", {
      body: postRef.current?.value,
      image,
    });

    if (response.error) return;

    setPosts((prev) => [response.response.post, ...prev]);
    toast.success("Post uploaded successfully");
    setIsLoading(false);
    postRef.current.value = "";

    setPostImage(null);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // show preview
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
          setPreview(reader.result);
        };

      // TODO: send `file` to your backend API for upload
      setPostImage(file);
    }
  };
  return (
    <Stack>
      <Card.Root
        bg={"#fff"}
        shadowColor={"#080F340F"}
        shadow={"sm"}
        rounded={20}
        border={"1px solid #fff"}
        px={4}
      >
        <Card.Body gap="2">
          <HStack alignItems={"flex-start"} justifyContent={"space-between"}>
            <HStack mt={{ base: -2, md: 0 }} ml={-5} alignItems={"flex-start"}>
              <Stack position={"relative"}>
                <Image
                  src={userDetails?.profile_picture || userImage}
                  alt="Update"
                  boxSize={{ base: "35px", md: "59px" }}
                  rounded={50}
                />
              </Stack>
              <Stack>
                <Text
                  color={"#191919"}
                  fontSize={{ base: 10, md: 21 }}
                  fontFamily="InterBold"
                >
                  {userDetails?.first_name} {userDetails?.last_name}
                </Text>
                <Text
                  mt={-3}
                  color={"#00000099/60"}
                  fontWeight={"normal"}
                  fontSize={{ base: 10, md: 15 }}
                  fontFamily="InterRegular"
                >
                  {userDetails?.profession}
                </Text>
              </Stack>
            </HStack>
            <Box mt={-2} mr={-5} display={{ base: "block", md: "none" }}>
              <TfiClose size={10} onClick={onClose} />
            </Box>
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
        {
          preview &&
          <Image
                                src={preview ||temporalLogo} // fallback to default image
                                alt="logo"
                                // boxSize={{ base: "100px", md: "4000px" }}
                                // borderRadius="10px"
                                objectFit="cover"
                                cursor="pointer"
                                // onClick={handleLogoClick}
                              />
        }
                              
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
            onClick={handlePost}
          >
            {loading || isLoading ? (
              <Spinner size={7} />
            ) : (
              <Flex alignItems={"center"} gap={2}>
                <Text>Post</Text>
                <PiTelegramLogoLight size={10} />
              </Flex>
            )}
          </Button>
        </Card.Footer>
      </Card.Root>
    </Stack>
  );
};

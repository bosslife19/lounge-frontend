import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { cardData } from "../../../hooks/useData";
import { BsThreeDots } from "react-icons/bs";
import like from "../../../assets/streamline_like-1-solid.png";
import heart from "../../../assets/solar_heart-angle-bold.png";
import bulb from "../../../assets/fluent-color_lightbulb-filament-20.png";
import { GrMicrophone, GrSend } from "react-icons/gr";
import { CiImageOn } from "react-icons/ci";
import { userAvatar } from "../../../user/features/setting/posts/Posts";
import { formatTime } from "../../../lib/formatTime";
import { useContext, useEffect, useState } from "react";
import { useRequest } from "../../../hooks/useRequest";
import { AuthContext } from "../../../context/AuthContext";
import axiosClient from "../../../axiosClient";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { formatDate, timeAgo } from "../../../utlis/FormatDate";

export const AdminLeftSide = ({ posts, setPosts }) => {
  const { userDetails } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosClient.get("/get-all-posts");

      setPosts(res.data.posts);
    };
    getPosts();
  }, [refresh]);

  const handleComment = async (id) => {
    if (!comment) {
      return;
    }

    const res = await makeRequest("/comment", {
      post_id: id,
      body: comment,
    });
    if (res.error) return;

    setRefresh((prev) => !prev);
    setComment("");
    // toast.success("Comment added successfully");
  };

  const actions = [
    { id: 1, image: like },
    { id: 2, image: heart },
    { id: 3, image: bulb },
  ];
  const { makeRequest } = useRequest();
  const [openComments, setOpenComments] = useState({}); // track which posts are expanded

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId], // toggle state for each post
    }));
  };
  return (
    <Stack w={"100%"} mb={"auto"} gap={7}>
      {posts?.map((card) => (
        <Card.Root
          key={card.id}
          bg={"#fff"}
          shadowColor={"#080F340F"}
          shadow={"sm"}
          rounded={{ base: 10, md: 20 }}
          border={"1px solid #fff"}
        >
          <Card.Body gap="2" mt={-3} mx={-3}>
            <Flex alignItems={"flex-start"} justifyContent={"space-between"}>
              <HStack>
                <Stack position={"relative"}>
                  <Image
                    src={card.user?.profile_picture || userAvatar}
                    alt="Update"
                    boxSize={{ base: "40px", md: "50px" }}
                    rounded={50}
                  />
                </Stack>
                <Stack>
                  <Text
                    color={"#191919"}
                    fontSize={{ base: "10px", md: "14px" }}
                    fontFamily="InterBold"
                  >
                    {card.user?.name}
                  </Text>
                  <Text
                    mt={-3}
                    color={"#202020"}
                    fontSize={{ base: "10px", md: "14px" }}
                    fontFamily="InterMedium"
                  >
                    {card.user?.profession}
                  </Text>
                  <Text
                    color={"#626262"}
                    fontFamily="InterRegular"
                    fontSize={{ base: "8px", md: "10px" }}
                    mt={"-2"}
                  >
                    {formatTime(card.created_at)}
                  </Text>
                </Stack>
              </HStack>
              {/* <Button color={"#212121"} bg={"transparent"}>
                <BsThreeDots />
              </Button> */}
            </Flex>

            {/* Post content */}
            <Text
              textAlign={"center"}
              color={"#070416"}
              fontSize={{ base: "11px", md: "16px" }}
              fontFamily="InterRegular"
            >
              {card.desc3}
            </Text>
            <Text
              color={"#070416"}
              fontSize={{ base: "11px", md: "16px" }}
              fontFamily="InterRegular"
            >
              {card.body}
            </Text>
          </Card.Body>

          {/* Post Image */}
          {card.post_image && (
            <Image
              src={card.post_image}
              boxSize={"100%"}
              h={{ base: 150, md: 270 }}
              fit="cover"
            />
          )}

          {/* Comments and actions */}
          <HStack
            justifyContent={"flex-start"}
            alignItems={"center"}
            px={1}
            pt={{ base: 1, md: 3 }}
            gap={4}
          >
            <Text
              fontSize={{ base: 10, md: 15 }}
              style={{ position: "relative", left: "3%" }}
            >
              {card.likes?.length}
            </Text>

            <Button
              color={"#212121"}
              p={0}
              fontSize={{ base: 10, md: 15 }}
              bg={"transparent"}
              onClick={() => likePost(card.id)}
              size={{ base: "xs", md: "sm" }}
            >
              <AiOutlineLike />
            </Button>
            <Button
              onClick={() => toggleComments(card.id)}
              color={"#212121"}
              p={0}
              bg={"transparent"}
              size={{ base: "xs", md: "sm" }}
            >
              <BiMessageRoundedDetail />

              <Text
                color={"#707070"}
                fontSize={{ base: 10, md: 14 }}
                cursor="pointer"
                // ml={-2}
              >
                {card.comments?.length || 0} Comments
              </Text>
            </Button>
          </HStack>

          {/* Expand Comments */}
          {openComments[card.id] && (
            <Box px={4} py={2}>
              {card.comments && card.comments.length > 0 ? (
                card.comments.map((c, idx) => (
                  <Flex key={idx} gap={3} mb={3} alignItems="flex-start">
                    <Avatar.Root boxSize={{ base: "20px", md: "35px" }}>
                      <Avatar.Image src={c.user_profile_picture || userImage} />
                    </Avatar.Root>
                    <Box>
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: "10px", md: "15px" }}
                      >
                        {c.user_name}
                      </Text>
                      <Text fontSize={{ base: "10px", md: "15px" }}>
                        {c.body}
                      </Text>
                      <Text
                        fontSize={{ base: "8px", md: "12px" }}
                        color="gray.500"
                      >
                        {timeAgo(c.created_at)}
                      </Text>
                    </Box>
                  </Flex>
                ))
              ) : (
                <Text fontSize={{ base: "10px", md: "13px" }} color="gray.500">
                  No comments yet.
                </Text>
              )}
            </Box>
          )}

          {/* Comment input */}
          <Card.Footer
            borderTop={"1px solid #E9E5DF"}
            mt={1}
            pt={{ base: 2, md: 6 }}
          >
            <InputGroup
              endElement={
                <Flex align="right">
                  <Button
                    w={10}
                    h={10}
                    bg="transparent"
                    color="#000"
                    position="absolute"
                    right={{ base: "1", md: "3" }}
                    top="50%"
                    size={{ base: "xs", md: "sm" }}
                    transform={{
                      base: "translateY(-60%)",
                      md: "translateY(-50%)",
                    }}
                    zIndex={1}
                    onClick={() => handleComment(card.id)}
                  >
                    <GrSend />
                  </Button>
                </Flex>
              }
              startElement={
                <Avatar.Root
                  ml={{ base: 0, md: -2 }}
                  mt={-2}
                  boxSize={{ base: "20px", md: "35px" }}
                >
                  <Avatar.Image
                    src={userDetails?.profile_picture || userImage}
                  />
                </Avatar.Root>
              }
            >
              <Box w="100%" position="relative">
                <Textarea
                  placeholder="Write a comment"
                  resize="none"
                  minH={{ base: "15px", md: "60px" }}
                  bg={"#F6F6F6"}
                  textWrap={"stable"}
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  outline={"none"}
                  pt={{ base: "10px", md: 23 }}
                  pr={{ base: "40px", md: "60px" }}
                  pl={{ base: "30px", md: "50px" }}
                  borderRadius={{ base: "5px", md: "xl" }}
                  fontSize={{ base: "9px", md: "11px" }}
                  lineHeight="1.4"
                  _placeholder={{ color: "#0000005C" }}
                />
              </Box>
            </InputGroup>
          </Card.Footer>
        </Card.Root>
      ))}
    </Stack>
  );
};

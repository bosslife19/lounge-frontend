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
import axiosClient from "../../../axiosClient";
import userImage from "../../../assets/userImage.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";

export const LeftSide = ({ posts, setPosts }) => {
  const { userDetails } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [comment, setComment] = useState("");
  const { makeRequest } = useRequest();
  const [openComments, setOpenComments] = useState({}); // track which posts are expanded

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId], // toggle state for each post
    }));
  };

  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosClient.get("/get-all-posts");

      setPosts(res.data.posts);
    };
    getPosts();
  }, [refresh]);

  const commentRef = useRef();
  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = Math.floor((now - past) / 1000); // difference in seconds

    if (diff < 60) {
      return `${diff} sec${diff !== 1 ? "s" : ""} ago`;
    } else if (diff < 3600) {
      const mins = Math.floor(diff / 60);
      return `${mins} min${mins !== 1 ? "s" : ""} ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (diff < 2592000) {
      const days = Math.floor(diff / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (diff < 31536000) {
      const months = Math.floor(diff / 2592000);
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      const years = Math.floor(diff / 31536000);
      return `${years} year${years !== 1 ? "s" : ""} ago`;
    }
  }

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

  return (
    <Stack w={"100%"} mb={"auto"} gap={0}>
      {posts?.map((card) => (
        <Card.Root
          key={card.id}
          bg={"#fff"}
          shadowColor={"#080F340F"}
          shadow={"sm"}
          rounded={20}
          border={"1px solid #fff"}
        >
          <Card.Body gap="2" mt={-2} mx={-2}>
            <Flex alignItems={"flex-start"} justifyContent={"space-between"}>
              <HStack>
                <Stack position={"relative"}>
                  <Image
                    src={card.user?.profile_picture || userImage}
                    alt="Update"
                    boxSize="50px"
                    rounded={50}
                  />
                </Stack>
                <Stack>
                  <Text
                    color={"#191919"}
                    fontSize={{ base: 10, md: 14 }}
                    fontFamily="InterMedium"
                    fontWeight={"medium"}
                  >
                    {card.user?.first_name} {card.user?.last_name}
                  </Text>
                  <Text
                    mt={-3}
                    color={"#707070"}
                    fontSize={{ base: 10, md: 12 }}
                    fontFamily="InterRegular"
                    lineHeight={"16px"}
                  >
                    {card.user?.profession}
                  </Text>
                  <Text
                    color={"#626262"}
                    fontFamily="InterRegular"
                    fontSize={{ base: 10, md: 13 }}
                    mt={"-2"}
                  >
                    {timeAgo(card.created_at)}
                  </Text>
                </Stack>
              </HStack>
              <Button p={0} mt={-2} color={"#707070"} bg={"transparent"}>
                <BsThreeDots />
              </Button>
            </Flex>

            {/* Post content */}
            <Text
              // textAlign={"center"}
              color={"#070416"}
              fontWeight={"400"}
              fontSize={{ base: 12, md: 16 }}
              fontFamily="InterRegular"
            >
              {card.body}
            </Text>
            <Text
              color={"#0966C2"}
              fontSize={{ base: 12, md: 16 }}
              fontFamily="InterMedium"
            >
              {card.desc3}
            </Text>
          </Card.Body>

          {/* Post Image */}
          {card.post_image && (
            <Image src={card.post_image} boxSize={"100%"} h={220} fit="cover" />
          )}

          {/* Comments and actions */}
          <HStack alignItems={"center"} px={1} pt={5}>
            {actions.map((items, index) => (
              <Button p={0} bg={"transparent"} key={index}>
                <Image src={items.image} boxSize={5} />
              </Button>
            ))}
            <Text
              color={"#707070"}
              fontSize={{ base: 12, md: 14 }}
              cursor="pointer"
              onClick={() => toggleComments(card.id)}
            >
              {card.comments?.length || 0} Comments
            </Text>
          </HStack>

          {/* Expand Comments */}
          {openComments[card.id] && (
            <Box px={4} py={2}>
              {card.comments && card.comments.length > 0 ? (
                card.comments.map((c, idx) => (
                  <Flex key={idx} gap={3} mb={3} alignItems="flex-start">
                    <Avatar.Root size="sm">
                      <Avatar.Image src={c.user_profile_picture || userImage} />
                    </Avatar.Root>
                    <Box>
                      <Text fontWeight="bold" fontSize="sm">
                        {c.user_name}
                      </Text>
                      <Text fontSize="sm">{c.body}</Text>
                      <Text fontSize="xs" color="gray.500">
                        {timeAgo(c.created_at)}
                      </Text>
                    </Box>
                  </Flex>
                ))
              ) : (
                <Text fontSize="sm" color="gray.500">
                  No comments yet.
                </Text>
              )}
            </Box>
          )}

          {/* Comment input */}
          <Card.Footer borderTop={"1px solid #E9E5DF"} mt={1} pt={6}>
            <InputGroup
              endElement={
                <Flex align="right">
                  <Button
                    w={10}
                    h={10}
                    bg="transparent"
                    color="#000"
                    position="absolute"
                    right="3"
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={1}
                    onClick={() => handleComment(card.id)}
                  >
                    <GrSend />
                  </Button>
                </Flex>
              }
              startElement={
                <Avatar.Root ml={-2} mt={-2} size="xs">
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
                  minH="60px"
                  bg={"#F6F6F6"}
                  textWrap={"stable"}
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  outline={"none"}
                  py={3}
                  pr="80px"
                  pl="40px"
                  borderRadius="xl"
                  fontSize="11px"
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

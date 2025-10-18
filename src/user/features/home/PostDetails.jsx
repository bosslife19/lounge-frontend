import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Stack,
  HStack,
  Button,
  Flex,
  InputGroup,
  Card,
  Avatar,
  Textarea,
  AspectRatio,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { formatTime } from "../../../lib/formatTime";
import axiosClient from "../../../axiosClient";
import { userAvatar } from "../setting/posts/Posts";
import { useRequest } from "../../../hooks/useRequest";
import { GrSend } from "react-icons/gr";
import { AuthContext } from "../../../context/AuthContext";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { AiOutlineLike, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import Avatars from "../../components/header/Avatar";
import { HiOutlineLogout } from "react-icons/hi";
import { FaCog, FaImage } from "react-icons/fa";

const PostDetails = () => {
  const dropdownOptions = [
    // {
    //   text: "Change Image",
    //   icon: FaImage,
    //   handler: () => fileInputRef.current?.click(),
    // },
    {
      text: "Settings",
      icon: FaCog,
      handler: () => navigate("/settings"),
    },
    {
      text: "Logout",
      icon: HiOutlineLogout,
      color: "text-red-500",
      handler: () => {
        // localStorage.clear();
        navigate("/logout");
      },
    },
  ];
  const { id } = useParams();
  const { makeRequest } = useRequest();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [openComments, setOpenComments] = useState({});
  const [moreNews, setMoreNews] = useState([]);
  const [update, setUpdate] = useState(null);

  // Track likes across all posts
  const [likesState, setLikesState] = useState({});
  const { userDetails } = useContext(AuthContext);

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleComment = async (id) => {
    if (!comment) return;
    const res = await makeRequest("/comment", {
      post_id: id,
      body: comment,
    });
    if (res.error) return;
    setComment("");
    fetchPosts();
  };

  const likePost = async (postId, state) => {
    // Optimistic UI update
    setLikesState((prev) => ({
      ...prev,
      [postId]: {
        likesCount: state.liked ? state.likesCount - 1 : state.likesCount + 1,
        liked: !state.liked,
      },
    }));

    const res = await makeRequest("/like-post", {
      userId: userDetails.id,
      postId,
    });

    if (res?.error) {
      // Rollback if backend fails
      setLikesState((prev) => ({
        ...prev,
        [postId]: state,
      }));
    } else {
      fetchPosts();
    }
  };

  const fetchPosts = async () => {
    const res = await axiosClient.get("/get-all-posts");
    const same = res.data.posts.filter((item) => item.id == id);
    setUpdate(same[0]);
    setMoreNews(res.data.posts);
  };

  useEffect(() => {
    fetchPosts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!update) {
    return <Text>Loading...</Text>;
  }

  // Get current like state for main post
  const state = likesState[update.id] || {
    likesCount: update.likes?.length || 0,
    liked: update.likes?.some(
      (like) => like.user_id === userDetails.id && like.post_id === update.id
    ),
  };

  return (
    <Card.Root>
      <Flex
        height={"100vw"}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        gap={3}
      >
        <Box
          w={{ base: "100%", md: "80%" }}
          mx="auto"
          pt={3}
          py={{ base: 3, xl: "6%" }}
          px={6}
        >
          {/* Back Button */}
          <HStack gap={2} mb={4} alignItems={"center"}>
            <Button
              size={"xs"}
              variant="outline"
              rounded={"full"}
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack />
            </Button>
            <Text fontSize={{ base: "13px", md: "24px" }}>Community Posts</Text>
          </HStack>

          {/* Main Post */}
          <Stack
            bg={"#fff"}
            p={4}
            boxShadow={"lg"}
            borderRadius={10}
            spacing={4}
            mb={4}
          >
            <AspectRatio ratio={16 / 5} w="100%" mb={6}>
              <Image
                src={update?.post_image}
                alt={update?.title}
                w="100%"
                h={{ base: "200px", md: "300px" }}
                objectFit="cover"
                rounded="xl"
                mb={6}
              />
            </AspectRatio>
            <Text
              fontFamily="LatoRegular"
              fontSize={{ base: 14, md: 16 }}
              color={"#1C1C1CB2"}
              my={-4}
            >
              {update?.body}
            </Text>

            {/* Likes + Comments */}
            <HStack
              justifyContent="flex-start"
              alignItems="center"
              pt={3}
              gap={4}
            >
              <p style={{ position: "relative", left: "3%" }}>
                {state.likesCount}
              </p>

              <Button
                color={"#212121"}
                p={0}
                bg={"transparent"}
                onClick={() => likePost(update.id, state)}
              >
                <AiOutlineLike color={state.liked ? "blue" : "black"} />
              </Button>

              <Button
                onClick={() => toggleComments(update.id)}
                color={"#212121"}
                p={0}
                bg={"transparent"}
              >
                <BiMessageRoundedDetail />
                <Text color={"#707070"} fontSize={{ base: 12, md: 14 }}>
                  {update?.comments?.length || 0} Comments
                </Text>
              </Button>
            </HStack>

            {/* Expand Comments */}
            {openComments[update.id] && (
              <Box px={4} py={2}>
                {update.comments && update.comments.length > 0 ? (
                  update.comments.map((c, idx) => (
                    <Flex key={idx} gap={3} mb={3} alignItems="flex-start">
                      <Avatar.Root boxSize={{ base: "18px", md: "28px" }}>
                        <Avatar.Image
                          src={c.user_profile_picture || userAvatar}
                        />
                      </Avatar.Root>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm">
                          {c.user_name}
                        </Text>
                        <Text fontSize="sm">{c.body}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {formatTime(c.created_at)}
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
              <Avatar.Root ml={-2} mt={-2} size="xs">
                <Avatar.Image
                  src={userDetails?.profile_picture || userAvatar}
                />
              </Avatar.Root>

              <InputGroup
                endElement={
                  <Flex align="right">
                    <Button
                      w={10}
                      h={10}
                      bg="transparent"
                      color="#000"
                      onClick={() => handleComment(update.id)}
                    >
                      <GrSend />
                    </Button>
                  </Flex>
                }
              >
                <Box w="100%" position="relative">
                  <Textarea
                    placeholder="Write a comment"
                    resize="none"
                    minH={{ base: "9px", md: "10px" }}
                    // minH="60px"
                    bg={"#F6F6F6"}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    outline={"none"}
                    py={3}
                    lineHeight="1.4"
                    pr={{ base: "40px", md: "50px" }}
                    // pl="40px"
                    borderRadius="xl"
                    fontSize="11px"
                  />
                </Box>
              </InputGroup>
            </Card.Footer>

            {/* User Info */}
            {/* <HStack px={5} mt={-4} pb={2} spacing={4} align="flex-start">
              <Stack position={"relative"}>
                <Image
                  src={update?.user.profile_picture || userAvatar}
                  alt="Update"
                  boxSize="30px"
                  rounded={20}
                />
              </Stack>
              <Stack>
                <Text color={"#202020"} fontSize={{ base: 8, md: 10 }}>
                  {update?.user.first_name} {update?.user.last_name}
                </Text>
                <Text
                  color={"#202020"}
                  fontSize={{ base: 8, md: 10 }}
                  mt={"-2"}
                >
                  {formatTime(update?.created_at)}
                </Text>
              </Stack>
            </HStack> */}
          </Stack>
        </Box>

        {/* More Posts Sidebar */}
        <Box
          w={{ base: "100%", md: "30%" }}
          overflowY={"auto"}
          boxShadow={"xl"}
          bg={"#fff"}
          p={"1.3%"}
        >
          <Box
            display={{ base: "none", xl: "block" }}
            className="border-l-2 pl-4"
          >
            <Avatars options={dropdownOptions} />
          </Box>
          <Text pl={4} pt={3} mb={-2} color={"#101928"} fontWeight={"medium"}>
            More Posts
          </Text>
          <Box>
            {moreNews.map((card, idx) => {
              const sidebarState = likesState[card.id] || {
                likesCount: card.likes?.length || 0,
                liked: card.likes?.some(
                  (like) =>
                    like.user_id === userDetails.id && like.post_id === card.id
                ),
              };

              return (
                <Box
                  key={`${card.id}-${idx}`}
                  px={3}
                  pt={4}
                  m={3}
                  cursor={"pointer"}
                  className="bg-white rounded-2xl shadow-lg relative"
                  onClick={() => setUpdate(card)}
                >
                  <Image
                    roundedTop={10}
                    src={card.post_image}
                    h={120}
                    alt={card.title}
                    className="w-full h-40 object-cover"
                  />

                  <button
                    className="absolute top-5 right-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      likePost(card.id, sidebarState);
                    }}
                  >
                    {sidebarState.liked ? (
                      <AiFillHeart color="red" size={20} />
                    ) : (
                      <AiOutlineHeart color="gray" size={20} />
                    )}
                  </button>

                  <Box pt={2}>
                    <Text
                      fontSize={{ base: 12, md: 14 }}
                      className="font-semibold"
                    >
                      {card.title}
                    </Text>
                  </Box>

                  <HStack pt={4} pb={2} spacing={4}>
                    <Stack position={"relative"}>
                      <Image
                        src={card.user.profile_picture || userAvatar}
                        alt="Update"
                        boxSize="30px"
                        rounded={20}
                      />
                    </Stack>
                    <Stack>
                      <Text color={"#202020"} fontSize={{ base: 8, md: 10 }}>
                        {card.user.first_name} {card.user.last_name}
                      </Text>
                      <Text
                        color={"#202020"}
                        fontSize={{ base: 8, md: 10 }}
                        mt={"-2"}
                      >
                        {formatTime(card.created_at)}
                      </Text>
                    </Stack>
                  </HStack>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Flex>
    </Card.Root>
  );
};

export default PostDetails;

import {
  AspectRatio,
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
import { BsThreeDots } from "react-icons/bs";
import like from "../../../assets/streamline_like-1-solid.png";
import heart from "../../../assets/solar_heart-angle-bold.png";
import bulb from "../../../assets/fluent-color_lightbulb-filament-20.png";
import { GrSend } from "react-icons/gr";
import userImage from "../../../assets/userImage.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useRequest } from "../../../hooks/useRequest";
import { AiOutlineLike } from "react-icons/ai";
import useTruncate from "../../../hooks/useTruncate";
import { BiMessageRoundedDetail } from "react-icons/bi";
import axiosClient from "../../../axiosClient";
import { Link } from "react-router-dom";

export const LeftSide = ({ posts, setPosts }) => {
  const { userDetails } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [comment, setComment] = useState("");
  const { makeRequest } = useRequest();
  const [openComments, setOpenComments] = useState({}); // track which posts are expanded
  // const [likedPosts, setLikedPosts] = useState([])
  const [likes, setLikes] = useState([]);
  const trucateText = useTruncate();
  const [liked, setLiked] = useState(false);
  const [likesState, setLikesState] = useState({});
  const [openLikes, setOpenLikes] = useState({});
  const toggleLikes = (postId) => {
    setOpenLikes((prev) => ({
      [postId]: !prev[postId], // closes others
    }));
  };
  //   const toggleLikes = (postId) => {
  //   setOpenLikes((prev) => ({
  //     ...prev,
  //     [postId]: !prev[postId],
  //   }));
  // };

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId], // toggle state for each post
    }));
  };

  const likePost = async (postId) => {
    const res = await makeRequest("/like-post", {
      userId: userDetails.id,
      postId,
    });
    if (!res) {
      return;
    }
    if (res.error) return;
    if (res.response.status) {
      setLiked((prev) => !prev);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosClient.get("/get-all-posts");

      setPosts(res.data.posts);
    };
    getPosts();
  }, [refresh]);
  useEffect(() => {
    const getLikes = async () => {
      const res = await axiosClient.get("/likes");
      console.log(res.data.likes);
      setLikes(res.data.likes);
    };
    getLikes();
  }, []);

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
    <Stack w={"100%"} mb={"auto"} pb={"3%"} gap={5}>
      {posts?.map((card) => {
        const state = likesState[card.id] || {
          likesCount: card.likes?.length || 0,
          liked: likes.some(
            (like) =>
              like.user_id === userDetails.id && like.post_id === card.id
          ),
        };
        return (
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
                    <Link to={`/directory/${card.user?.id}`}>
                      <Image
                        src={card.user?.profile_picture || userImage}
                        alt="Update"
                        boxSize={{ base: "40px", md: "50px" }}
                        rounded={50}
                      />
                    </Link>
                  </Stack>
                  <Stack>
                    <Text
                      color={"#191919"}
                      fontSize={{ base: "10px", md: "14px" }}
                      fontFamily="robotoMedium"
                      fontWeight={"medium"}
                    >
                      {card.user?.first_name} {card.user?.last_name}
                    </Text>
                    <Text
                      mt={-3}
                      color={"#707070"}
                      fontSize={{ base: "10px", md: "12px" }}
                      fontFamily="robotoRegular"
                      lineHeight={"20px"}
                    >
                      {card.user?.profession}
                    </Text>
                    <Text
                      color={"#626262"}
                      fontFamily="robotoRegular"
                      fontSize={{ base: "10px", md: "12px" }}
                      mt={"-2"}
                    >
                      {timeAgo(card.created_at)}
                    </Text>
                  </Stack>
                </HStack>
                {/* <Button p={0} mt={-2} color={"#707070"} bg={"transparent"}>
                <BsThreeDots />
              </Button> */}
              </Flex>

              {/* Post content */}
              <Text
                // textAlign={"center"}
                color={"#191919"}
                fontWeight={"400"}
                fontSize={{ base: "10px", md: "13px" }}
                fontFamily="robotoRegular"
              >
                {/* {card.body} */}
                {trucateText(card.body, card.id)}
              </Text>
              {/* <Text
              my={-2}
              color={"#0966C2"}
              fontSize={{ base: "10px", md: "13px" }}
              lineHeight={"20px"}
              fontFamily="robotoMedium"
            >
              #hastag #hastag #hashtag
            </Text> */}
            </Card.Body>

            {/* Post Image */}
            {card.post_image && (
              <AspectRatio ratio={16 / 9} w="100%">
                <Image
                  src={card.post_image}
                  alt="Post"
                  objectFit="contain"
                  borderRadius={{ base: "10px", md: "20px" }}
                />
              </AspectRatio>
            )}

            {/* Comments and actions */}
            <HStack
              justifyContent={"flex-start"}
              alignItems={"center"}
              px={1}
              pt={{ base: 1, md: 3 }}
              gap={4}
            >
              {/* Likes Preview */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => toggleLikes(card.id)}
              >
                {likes.filter((like) => like.post_id === card.id).length > 1 &&
                  likes
                    .filter((like) => like.post_id === card.id)
                    .slice(0, 4) // ✅ Only show first 3
                    .map((like) => (
                      <img
                        key={like.id}
                        src={like.user?.profile_picture || userImage}
                        alt="like"
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          marginLeft: "-5px",
                          border: "2px solid white",
                        }}
                      />
                    ))}

                {/* If more than 4 likes, show "+x" */}
                {likes.filter((like) => like.post_id === card.id).length >
                  4 && (
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#707070",
                      marginLeft: "4px",
                    }}
                  >
                    +
                    {likes.filter((like) => like.post_id === card.id).length -
                      3}
                  </span>
                )}
              </div>

              <p style={{ position: "relative", left: "3%" }}>
                {state.likesCount}
              </p>

              <Button
                color={"#212121"}
                p={0}
                fontSize={{ base: 10, md: 15 }}
                bg={"transparent"}
                onClick={() => {
                  setLikesState((prev) => ({
                    ...prev,
                    [card.id]: {
                      likesCount: state.liked
                        ? state.likesCount - 1
                        : state.likesCount + 1,
                      liked: !state.liked,
                    },
                  }));
                  likePost(card.id); // call backend toggle
                }}
                size={{ base: "xs", md: "sm" }}
              >
                <AiOutlineLike color={state.liked ? "blue" : "black"} />
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
                >
                  {card.comments?.length || 0} Comments
                </Text>
              </Button>
            </HStack>
            {openLikes[card.id] && (
              <Box px={4} py={2}>
                {likes.filter((like) => like.post_id === card.id).length > 0 ? (
                  likes
                    .filter((like) => like.post_id === card.id)
                    .map((like) => (
                      <Flex key={like.id} gap={3} mb={3} alignItems="center">
                        <Avatar.Root boxSize={{ base: "10px", md: "24px" }}>
                          <Avatar.Image
                            src={like.user?.profile_picture || userImage}
                          />
                        </Avatar.Root>
                        <Box>
                          <Text
                            fontWeight="bold"
                            fontSize={{ base: "8px", md: "10px" }}
                          >
                            {like.user?.first_name} {like.user?.last_name}
                          </Text>
                          <Text
                            fontSize={{ base: "10px", md: "12px" }}
                            color="gray.500"
                          >
                            {like.user?.profession}
                          </Text>
                        </Box>
                      </Flex>
                    ))
                ) : (
                  <Text
                    fontSize={{ base: "10px", md: "13px" }}
                    color="gray.500"
                  >
                    No likes yet.
                  </Text>
                )}
              </Box>
            )}

            {/* Expand Comments */}
            {openComments[card.id] && (
              <Box px={4} py={2}>
                {card.comments && card.comments.length > 0 ? (
                  card.comments.map((c, idx) => (
                    <Flex key={idx} gap={3} mb={3} alignItems="flex-start">
                      <Avatar.Root boxSize={{ base: "20px", md: "34px" }}>
                        <Avatar.Image
                          src={c.user_profile_picture || userImage}
                        />
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
                  <Text
                    fontSize={{ base: "10px", md: "13px" }}
                    color="gray.500"
                  >
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
              <Avatar.Root
                // ml={-2}
                mt={-2}
                borderRadius={"full"}
                boxSize={{ base: "20px", md: "34px" }}
              >
                <Avatar.Image src={userDetails?.profile_picture || userImage} />
              </Avatar.Root>
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
              >
                <Box w="100%" position="relative">
                  <Textarea
                    placeholder="Write a comment"
                    resize="none"
                    minH={{ base: "9px", md: "10px" }}
                    bg={"#F6F6F6"}
                    textWrap={"stable"}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    outline={"none"}
                    // pt={{ base: "10px", md: 23 }}
                    pr={{ base: "40px", md: "50px" }}
                    // pl={{ base: "30px", md: "50px" }}
                    borderRadius={{ base: "5px", md: "xl" }}
                    fontSize={{ base: "9px", md: "11px" }}
                    lineHeight="1.4"
                    _placeholder={{ color: "#0000005C" }}
                  />
                </Box>
              </InputGroup>
            </Card.Footer>
          </Card.Root>
        );
      })}
    </Stack>
  );
};

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Image,
  InputGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { GrSend } from "react-icons/gr";
import userImage from "../../../assets/userImage.jpg";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useTruncate from "../../../hooks/useTruncate";
import { AiOutlineLike } from "react-icons/ai";
import { BiMessageRoundedDetail } from "react-icons/bi";
import axiosClient from "../../../axiosClient";
import { Link } from "react-router-dom";

export const LeftSide = ({ posts, setPosts }) => {
  const { userDetails } = useContext(AuthContext);
  const [comments, setComments] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [likes, setLikes] = useState([]);
  const [openLikes, setOpenLikes] = useState({});
  const [likingInProgress, setLikingInProgress] = useState({});
  const [commentingInProgress, setCommentingInProgress] = useState({});
  const trucateText = useTruncate();

  const toggleLikes = (postId) => {
    setOpenLikes((prev) => ({ [postId]: !prev[postId] }));
  };

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const fetchPosts = async () => {
    const res = await axiosClient.get("/get-all-posts");
    setPosts(res.data.posts);
  };

  const fetchLikes = async () => {
    const res = await axiosClient.get("/likes");
    setLikes(res.data.likes);
  };

  useEffect(() => {
    fetchPosts();
    fetchLikes();
  }, []);

  function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = Math.floor((now - past) / 1000);
    if (diff < 60) return `${diff} sec${diff !== 1 ? "s" : ""} ago`;
    if (diff < 3600) { const m = Math.floor(diff / 60); return `${m} min${m !== 1 ? "s" : ""} ago`; }
    if (diff < 86400) { const h = Math.floor(diff / 3600); return `${h} hour${h !== 1 ? "s" : ""} ago`; }
    if (diff < 2592000) { const d = Math.floor(diff / 86400); return `${d} day${d !== 1 ? "s" : ""} ago`; }
    if (diff < 31536000) { const mo = Math.floor(diff / 2592000); return `${mo} month${mo !== 1 ? "s" : ""} ago`; }
    const y = Math.floor(diff / 31536000); return `${y} year${y !== 1 ? "s" : ""} ago`;
  }

  const likePost = async (postId) => {
    if (likingInProgress[postId]) return;
    setLikingInProgress((prev) => ({ ...prev, [postId]: true }));

    const alreadyLiked = likes.some(
      (l) => l.user_id === userDetails.id && l.post_id === postId
    );

    // Optimistic update
    if (alreadyLiked) {
      setLikes((prev) =>
        prev.filter((l) => !(l.user_id === userDetails.id && l.post_id === postId))
      );
    } else {
      setLikes((prev) => [
        ...prev,
        {
          id: `temp-${Date.now()}`,
          user_id: userDetails.id,
          post_id: postId,
          user: {
            first_name: userDetails.first_name,
            last_name: userDetails.last_name,
            profile_picture: userDetails.profile_picture,
            profession: userDetails.profession,
          },
        },
      ]);
    }

    try {
      await axiosClient.post("/like-post", { userId: userDetails.id, postId });
      await fetchLikes();
    } catch (e) {
      await fetchLikes();
    } finally {
      setLikingInProgress((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleComment = async (postId) => {
    const commentText = (comments[postId] || "").trim();
    if (!commentText) return;
    if (commentingInProgress[postId]) return;

    setCommentingInProgress((prev) => ({ ...prev, [postId]: true }));

    const newComment = {
      id: `temp-${Date.now()}`,
      post_id: postId,
      body: commentText,
      user_name: `${userDetails.first_name} ${userDetails.last_name}`,
      user_profile_picture: userDetails.profile_picture,
      created_at: new Date().toISOString(),
    };

    // Optimistically show comment immediately
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [newComment, ...(p.comments || [])] }
          : p
      )
    );
    setComments((prev) => ({ ...prev, [postId]: "" }));

    try {
      await axiosClient.post("/comment", { post_id: postId, body: commentText });
      await fetchPosts();
    } catch (e) {
      // Roll back on failure
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? { ...p, comments: (p.comments || []).filter((c) => c.id !== newComment.id) }
            : p
        )
      );
    } finally {
      setCommentingInProgress((prev) => ({ ...prev, [postId]: false }));
    }
  };

  return (
    <Stack w={"100%"} mb={"auto"} pb={"3%"} gap={5}>
      {posts?.map((card) => {
        const postLikes = likes.filter((l) => l.post_id === card.id);
        const isLiked = postLikes.some((l) => l.user_id === userDetails.id);

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
                        boxSize={{ base: "35px", md: "50px" }}
                        rounded={50}
                      />
                    </Link>
                  </Stack>
                  <Stack>
                    <Text color={"#191919"} fontSize={{ base: "10px", md: "14px" }} fontFamily="robotoMedium" fontWeight={"medium"}>
                      {card.user?.first_name} {card.user?.last_name}
                    </Text>
                    <Text mt={-3} color={"#707070"} fontSize={{ base: "10px", md: "12px" }} fontFamily="robotoRegular" lineHeight={"20px"}>
                      {card.user?.profession}
                    </Text>
                    <Text color={"#626262"} fontFamily="robotoRegular" fontSize={{ base: "10px", md: "12px" }} mt={"-2"}>
                      {timeAgo(card.created_at)}
                    </Text>
                  </Stack>
                </HStack>
              </Flex>

              <Text color={"#191919"} fontWeight={"400"} fontSize={{ base: "10px", md: "13px" }} fontFamily="robotoRegular">
                {trucateText(card.body, card.id)}
              </Text>
            </Card.Body>

            {card.post_image && (
              <AspectRatio ratio={3 / 2} w="100%">
                <Image src={card.post_image} fit="cover" />
              </AspectRatio>
            )}

            {/* Like / Comment bar */}
            <HStack justifyContent={"flex-start"} alignItems={"center"} px={1} pt={{ base: 1, md: 3 }} gap={4}>
              {/* Like avatar stack */}
              <Box
                gap={2}
                pl={1}
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                onClick={() => toggleLikes(card.id)}
              >
                {postLikes.length > 1 &&
                  postLikes.slice(0, 4).map((l) => (
                    <img
                      key={l.id}
                      src={l.user?.profile_picture || userImage}
                      alt="like"
                      style={{ width: "20px", height: "20px", borderRadius: "50%", marginLeft: "-11px", border: "2px solid white" }}
                    />
                  ))}
                {postLikes.length > 4 && (
                  <Text fontSize={{ base: "10px", md: "10px" }} ml={"4px"} color={"#707070"}>
                    +{postLikes.length - 3}
                  </Text>
                )}
              </Box>

              <Text fontSize={{ base: "11px", md: "15px" }} style={{ position: "relative", left: "3%" }}>
                {postLikes.length}
              </Text>

              {/* Like button - drives state purely from server likes array, no error toast */}
              <Button
                color={"#212121"}
                p={0}
                fontSize={{ base: 10, md: 15 }}
                bg={"transparent"}
                onClick={() => likePost(card.id)}
                size={{ base: "xs", md: "sm" }}
                disabled={!!likingInProgress[card.id]}
              >
                <AiOutlineLike color={isLiked ? "blue" : "black"} />
              </Button>

              {/* Comment button */}
              <Button
                onClick={() => toggleComments(card.id)}
                color={"#212121"}
                p={0}
                bg={"transparent"}
                size={{ base: "xs", md: "sm" }}
              >
                <BiMessageRoundedDetail />
                <Text color={"#707070"} fontSize={{ base: 10, md: 14 }} cursor="pointer">
                  {card.comments?.length || 0} Comments
                </Text>
              </Button>
            </HStack>

            {/* Likes list */}
            {openLikes[card.id] && (
              <Box px={4} py={2}>
                {postLikes.length > 0 ? (
                  postLikes.map((l) => (
                    <Flex key={l.id} gap={3} mb={3} alignItems="center">
                      <Avatar.Root boxSize={{ base: "10px", md: "24px" }}>
                        <Avatar.Image src={l.user?.profile_picture || userImage} />
                      </Avatar.Root>
                      <Box>
                        <Text fontWeight="bold" fontSize={{ base: "8px", md: "10px" }}>
                          {l.user?.first_name} {l.user?.last_name}
                        </Text>
                        <Text fontSize={{ base: "10px", md: "12px" }} color="gray.500">
                          {l.user?.profession}
                        </Text>
                      </Box>
                    </Flex>
                  ))
                ) : (
                  <Text fontSize={{ base: "10px", md: "13px" }} color="gray.500">No likes yet.</Text>
                )}
              </Box>
            )}

            {/* Comments list */}
            {openComments[card.id] && (
              <Box px={4} py={2}>
                {card.comments && card.comments.length > 0 ? (
                  card.comments.map((c, idx) => (
                    <Flex key={c.id || idx} gap={3} mb={3} alignItems="flex-start">
                      <Avatar.Root boxSize={{ base: "20px", md: "34px" }}>
                        <Avatar.Image src={c.user_profile_picture || userImage} />
                      </Avatar.Root>
                      <Box>
                        <Text fontWeight="bold" fontSize={{ base: "10px", md: "15px" }}>{c.user_name}</Text>
                        <Text fontSize={{ base: "10px", md: "15px" }}>{c.body}</Text>
                        <Text fontSize={{ base: "8px", md: "12px" }} color="gray.500">{timeAgo(c.created_at)}</Text>
                      </Box>
                    </Flex>
                  ))
                ) : (
                  <Text fontSize={{ base: "10px", md: "13px" }} color="gray.500">No comments yet.</Text>
                )}
              </Box>
            )}

            {/* Comment input */}
            <Card.Footer borderTop={"1px solid #E9E5DF"} mt={1} mb={{ base: -2, md: 0 }} pt={{ base: 2, md: 6 }} ml={{ base: -3, md: 0 }}>
              <Avatar.Root mt={-2} borderRadius={"full"} boxSize={{ base: "20px", md: "34px" }}>
                <Avatar.Image src={userDetails?.profile_picture || userImage} />
              </Avatar.Root>
              <InputGroup
                endElement={
                  <Flex align="right">
                    <Button
                      w={10} h={10} bg="transparent" color="#000"
                      position="absolute" right={{ base: "1", md: "3" }} top="50%"
                      size={{ base: "xs", md: "sm" }}
                      transform={{ base: "translateY(-60%)", md: "translateY(-50%)" }}
                      zIndex={1}
                      onClick={() => handleComment(card.id)}
                      disabled={!!commentingInProgress[card.id]}
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
                    onChange={(e) => setComments((prev) => ({ ...prev, [card.id]: e.target.value }))}
                    value={comments[card.id] || ""}
                    outline={"none"}
                    pr={{ base: "40px", md: "50px" }}
                    borderRadius={{ base: "5px", md: "xl" }}
                    fontSize={{ base: "9px", md: "11px" }}
                    lineHeight="1.4"
                    _placeholder={{ color: "#0000005C" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleComment(card.id);
                      }
                    }}
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

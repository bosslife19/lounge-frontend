import {
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
import like from "../../../../assets/streamline_like-1-solid.png";
import heart from "../../../../assets/solar_heart-angle-bold.png";
import bulb from "../../../../assets/fluent-color_lightbulb-filament-20.png";
import globe from "../../../../assets/Globe.png";
import userImage from "../../../../assets/userImage.jpg";
import { useContext, useEffect, useState } from "react";
import axiosClient from "../../../../axiosClient";
import { AuthContext } from "../../../../context/AuthContext";
import { formatTime } from "../../../../lib/formatTime";
import { BiMessageRoundedDetail, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";
import { GrSend } from "react-icons/gr";
import ConfirmDeleteModal from "../../../../components/ConfirmDelete";

export const userAvatar = "https://www.w3schools.com/howto/img_avatar.png";

export const SettingsPosts = () => {
  const { userDetails } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [activePostId, setActivePostId] = useState();
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState([]);
  const [openComments, setOpenComments] = useState({});
  const [comments, setComments] = useState({});
  const [likingInProgress, setLikingInProgress] = useState({});
  const [commentingInProgress, setCommentingInProgress] = useState({});

  const fetchPosts = async () => {
    const res = await axiosClient.get(`/posts/${userDetails?.id}`);
    setUserPosts(res.data.posts);
  };

  const fetchLikes = async () => {
    const res = await axiosClient.get("/likes");
    setLikes(res.data.likes);
  };

  useEffect(() => {
    fetchPosts();
    fetchLikes();
  }, []);

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleDeletePost = async (postId) => {
    setActivePostId(postId);
    setConfirmOpen(true);
  };

  const handleConfirm = async (postId) => {
    try {
      setLoading(true);
      await axiosClient.delete(`/posts/${postId}`);
      setUserPosts(userPosts.filter((post) => post.id !== postId));
      setLoading(false);
      toast.success("Post deleted successfully");
      setConfirmOpen(false);
    } catch (error) {
      console.error("Error deleting post:", error);
      setLoading(false);
      toast.error("Failed to delete the post. Please try again.");
    }
  };

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

    setUserPosts((prev) =>
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
      setUserPosts((prev) =>
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
    <Stack
      px={{ base: 3, md: 6 }}
      py={{ base: 2, md: 4 }}
      w={{ base: "100%", md: 600 }}
      mb={"auto"}
      gap={{ base: 4, md: 7 }}
    >
      {userPosts && userPosts.length > 0
        ? userPosts.map((card, idx) => {
            const postLikes = likes.filter((l) => l.post_id === card.id);
            const isLiked = postLikes.some((l) => l.user_id === userDetails.id);

            return (
              <Card.Root
                key={idx}
                bg={"#fff"}
                shadowColor={"#080F340F"}
                shadow={"sm"}
                roundedBottom={20}
                border={"1px solid #fff"}
              >
                <Card.Body gap="2" mt={{ base: -2, md: 0 }}>
                  <Flex alignItems={"flex-start"} justifyContent={"space-between"}>
                    <HStack>
                      <Stack position={"relative"}>
                        <Image
                          src={userDetails?.profile_picture || userAvatar}
                          alt="Update"
                          boxSize={{ base: "35px", md: "50px" }}
                          rounded={50}
                        />
                      </Stack>
                      <Stack>
                        <Text color={"#191919"} fontSize={{ base: "10px", md: 14 }} fontFamily="InterBold">
                          {userDetails?.first_name} {userDetails?.last_name}
                        </Text>
                        <Text mt={-3} color={"#202020"} fontSize={{ base: "9px", md: 14 }} fontFamily="InterMedium">
                          {userDetails?.profession || "N/A"}
                        </Text>
                        <HStack mt={"-2"} alignItems={"center"}>
                          <Text color={"#626262"} fontFamily="InterRegular" fontSize={{ base: "8px", md: 13 }}>
                            {formatTime(new Date(card?.created_at))}
                          </Text>
                          <Image src={globe} w={{ base: 2, md: 4 }} />
                        </HStack>
                      </Stack>
                    </HStack>
                    <Button color={"#212121"} p={0} bg={"transparent"} onClick={() => handleDeletePost(card.id)}>
                      <BiTrash size={9} />
                    </Button>
                  </Flex>

                  <Text color={"#070416"} fontSize={{ base: "10px", md: 16 }} fontFamily="InterRegular">
                    {card?.body}
                  </Text>
                </Card.Body>

                {card.post_image && (
                  <Image
                    mt={{ base: -5, md: 0 }}
                    src={card.post_image}
                    boxSize={"100%"}
                    h={{ base: 120, md: 220 }}
                    fit="cover"
                  />
                )}

                <HStack justifyContent={"flex-start"} alignItems={"center"} px={1} pt={3} gap={4}>
                  {/* Like count */}
                  <Text fontSize={{ base: "11px", md: "15px" }} color={"#707070"}>
                    {postLikes.length}
                  </Text>

                  {/* Like button */}
                  <Button
                    size={{ base: "xs", md: "sm" }}
                    color={"#212121"}
                    p={0}
                    bg={"transparent"}
                    onClick={() => likePost(card.id)}
                    disabled={!!likingInProgress[card.id]}
                  >
                    <AiOutlineLike size={10} color={isLiked ? "blue" : "black"} />
                  </Button>

                  {/* Comment button */}
                  <Button
                    onClick={() => toggleComments(card.id)}
                    color={"#212121"}
                    p={0}
                    size={{ base: "xs", md: "sm" }}
                    bg={"transparent"}
                  >
                    <BiMessageRoundedDetail />
                    <Text color={"#707070"} fontSize={{ base: 10, md: 14 }} cursor="pointer">
                      {card.comments?.length || 0} Comments
                    </Text>
                  </Button>
                </HStack>

                {/* Comments list */}
                {openComments[card.id] && (
                  <Box px={4} py={2}>
                    {card.comments && card.comments.length > 0 ? (
                      card.comments.map((c, cidx) => (
                        <Flex key={c.id || cidx} gap={3} mb={3} alignItems="flex-start">
                          <Avatar.Root boxSize={{ base: "20px", md: "34px" }}>
                            <Avatar.Image src={c.user_profile_picture || userImage} />
                          </Avatar.Root>
                          <Box>
                            <Text fontWeight="bold" fontSize={{ base: "10px", md: "14px" }}>{c.user_name}</Text>
                            <Text fontSize={{ base: "10px", md: "14px" }}>{c.body}</Text>
                          </Box>
                        </Flex>
                      ))
                    ) : (
                      <Text fontSize={{ base: "10px", md: "13px" }} color="gray.500">No comments yet.</Text>
                    )}
                  </Box>
                )}

                {/* Comment input */}
                <Card.Footer borderTop={"1px solid #E9E5DF"} mt={1}>
                  <Avatar.Root mt={-2} borderRadius={"full"} boxSize={{ base: "20px", md: "34px" }}>
                    <Avatar.Image src={userDetails?.profile_picture || userAvatar} />
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
          })
        : <Text>No Posts Yet</Text>}

      <ConfirmDeleteModal
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => handleConfirm(activePostId)}
        isOpen={confirmOpen}
        loading={loading}
      />
    </Stack>
  );
};

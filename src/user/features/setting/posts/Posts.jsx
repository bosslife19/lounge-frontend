import {
  Button,
  Card,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import like from "../../../../assets/streamline_like-1-solid.png";
import heart from "../../../../assets/solar_heart-angle-bold.png";
import bulb from "../../../../assets/fluent-color_lightbulb-filament-20.png";
import globe from "../../../../assets/Globe.png";
import { cardData } from "../../../../hooks/useData";
import { useContext, useEffect, useState } from "react";
import axiosClient from "../../../../axiosClient";
import { AuthContext } from "../../../../context/AuthContext";
import { formatTime } from "../../../../lib/formatTime";
// import { LuDelete } from "react-icons/lu";
import { BiMessageRoundedDetail, BiTrash } from "react-icons/bi";
import { toast } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";

export const userAvatar = "https://www.w3schools.com/howto/img_avatar.png";

export const SettingsPosts = () => {
  const { userDetails } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosClient.get(`/posts/${userDetails?.id}`);

      setUserPosts(res.data.posts);
    };

    getPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        await axiosClient.delete(`/posts/${postId}`);
        // Remove the deleted post from the state
        setUserPosts(userPosts.filter((post) => post.id !== postId));
        toast.success("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete the post. Please try again.");
      }
    }
  };
  const actions = [
    { id: 1, image: like },
    { id: 2, image: heart },
    { id: 3, image: bulb },
  ];
  return (
    <Stack
      px={{ base: 3, md: 6 }}
      py={{ base: 2, md: 4 }}
      w={{ base: "100%", md: 600 }}
      mb={"auto"}
      gap={{ base: 4, md: 7 }}
    >
      {userPosts
        ? userPosts.map((card, idx) => (
            <Card.Root
              key={idx}
              bg={"#fff"}
              shadowColor={"#080F340F"}
              shadow={"sm"}
              roundedBottom={20}
              border={"1px solid #fff"}
            >
              <Card.Body gap="2" mt={{ base: -2, md: 0 }}>
                <Flex
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                >
                  <HStack>
                    <Stack position={"relative"}>
                      <Image
                        src={
                          userDetails?.profile_picture ||
                          "https://www.w3schools.com/howto/img_avatar.png"
                        }
                        alt="Update"
                        boxSize={{ base: "35px", md: "50px" }}
                        rounded={50}
                      />
                    </Stack>
                    <Stack>
                      <Text
                        color={"#191919"}
                        fontSize={{ base: "10px", md: 14 }}
                        fontFamily="InterBold"
                      >
                        {userDetails?.first_name} {userDetails?.last_name}
                      </Text>
                      <Text
                        mt={-3}
                        color={"#202020"}
                        fontSize={{ base: "9px", md: 14 }}
                        fontFamily="InterMedium"
                      >
                        {userDetails?.profession || "N/A"}
                      </Text>
                      <HStack mt={"-2"} alignItems={"center"}>
                        <Text
                          color={"#626262"}
                          fontFamily="InterRegular"
                          fontSize={{ base: "8px", md: 13 }}
                          //    a
                        >
                          {formatTime(new Date(card?.created_at))}
                        </Text>
                        <Image src={globe} w={{ base: 2, md: 4 }} />
                      </HStack>
                    </Stack>
                  </HStack>
                  <Button
                    color={"#212121"}
                    p={0}
                    bg={"transparent"}
                    onClick={() => handleDeletePost(card.id)}
                  >
                    {/* <BsThreeDots /> */}
                    <BiTrash size={9} />
                  </Button>
                </Flex>

                <Text
                  color={"#070416"}
                  fontSize={{ base: "10px", md: 16 }}
                  fontFamily="InterRegular"
                >
                  {card?.body}
                </Text>
                <Text
                  color={"#0966C2"}
                  fontSize={{ base: "9px", md: 16 }}
                  fontFamily="InterMedium"
                >
                  {/* #hastag #hastag #hashtag  */}
                </Text>
              </Card.Body>
              <Image
                mt={{ base: -5, md: 0 }}
                src={card.post_image}
                boxSize={"100%"}
                h={{ base: 120, md: 220 }}
                fit="cover"
              />
              <HStack
                justifyContent={"flex-start"}
                alignItems={"center"}
                px={1}
                pt={3}
                gap={4}
              >
                <Button
                  size={{ base: "xs", md: "sm" }}
                  color={"#212121"}
                  p={0}
                  bg={"transparent"}
                >
                  <AiOutlineLike size={10} />
                </Button>
                <Button
                  onClick={() => toggleComments(card.id)}
                  color={"#212121"}
                  p={0}
                  size={{ base: "xs", md: "sm" }}
                  bg={"transparent"}
                >
                  <BiMessageRoundedDetail />

                  <Text
                    color={"#707070"}
                    fontSize={{ base: "10px", md: 14 }}
                    cursor="pointer"
                    // ml={-2}
                  >
                    {card.comments.length || 0} Comments
                  </Text>
                </Button>
              </HStack>

              <Card.Footer borderTop={"1px solid #E9E5DF"} mt={1}></Card.Footer>
            </Card.Root>
          ))
        : "No Posts Yet"}
    </Stack>
  );
};

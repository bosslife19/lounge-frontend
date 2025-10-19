import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo from "../../../../assets/userImage.jpg";
import notify from "../../../../assets/laughin.png";
import notify2 from "../../../../assets/video.png";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../../../axiosClient";
import { formatTime } from "../../../../lib/formatTime";
import { FaReplyAll } from "react-icons/fa6";
import { AiOutlineLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
const cardData = [
  {
    id: 1,
    image: logo,
    notificationImage: notify2,
    title: "Card One",
    subtitle: "2 hours",
    para: "Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju.....",
  },
  {
    id: 2,
    image: logo,
    notificationImage: notify2,
    title: "Card Two",
    subtitle: "2 hours",
    para: "Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju.....",
  },
  {
    id: 3,
    image: logo,
    notificationImage: notify,
    title: "Card Three",
    subtitle: "2 hours",
    para: "Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju.....",
  },
  {
    id: 4,
    image: logo,
    notificationImage: notify,
    title: "Card Four",
    subtitle: "2 hours",
    para: "Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju.....",
  },
  {
    id: 5,
    image: logo,
    notificationImage: notify,
    title: "Card Five",
    subtitle: "2 hours",
    para: "Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju.....",
  },
  {
    id: 6,
    image: logo,
    notificationImage: notify,
    title: "Card Six",
    subtitle: "2 hours",
    para: "Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju.....",
  },
  {
    id: 7,
    image: logo,
    notificationImage: notify,
    title: "Card Seven",
    subtitle: "2 hours",
    para: "Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju.....",
  },
];

const CommunityPost = () => {
  const [favorites, setFavorites] = useState([]);
  const [pointsHistory, setPoinstsHistory] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosClient.get("/get-all-posts");

      setPosts(res.data.posts);
    };
    getPosts();
  }, []);

  // Truncate by words: keep first `maxWords` words, append "...." when there are more
  // utils/truncateText.ts
  const truncateText = (text, wordLimit = 5) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Just take the first 3 cards
  const displayedCards = cardData.slice(0, 3);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/post-history");
  };
  return (
    <Box pb={5} className="">
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Text
          fontSize={{ base: 11, md: 15 }}
          // fontFamily="LatoMedium"
          bg={"transparent"}
          color={"#202224"}
        >
          Community Posts
        </Text>
        <Button
          p={0}
          fontSize={{ base: 9, md: 12 }}
          onClick={() => navigate("/community")}
          bg={"transparent"}
          color={"#3366CC"}
          fontWeight={"normal"}
          textDecoration={"underline"}
        >
          See All
        </Button>
      </Flex>

<<<<<<< HEAD
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
=======
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
>>>>>>> 0bb18e6f1b1dde0e6a04ef208b013d660529273c
        {posts.length > 0 ? (
          posts.slice(0, 6).map((card) => (
            <Box
              px={3}
              pb={2}
              boxShadow={"xs"}
              boxShadowColor={"#080F340F"}
              key={card.id}
              bg={"#fff"}
              display="flex"
              flexDirection="column"
              justifyContent={"space-between"}
              rounded={8}
              // h={{ base: 240, md: 245 }} // shadow={"xs"}
              border={"1px solid #F0F2F5"}
              className="   relative overflow-hidden"
            >
              <HStack pt={5} pb={2} spacing={4} align="center">
                <Stack position={"relative"}>
                  <Image
                    src={card.user.profile_picture || logo}
                    alt="Update"
                    boxSize={{ base: "20px", md: "30px" }}
                    rounded={20}
                  />
                </Stack>
                <HStack alignItems={"center"}>
                  <Text
                    // whiteSpace={"nowrap"}
                    color={"#202020"}
                    fontSize={{ base: 8, md: 10 }}
                    fontFamily="InterMedium"
                  >
                    {/* {card.user.name.length > 8
                      ? `${card.user.name.slice(0, 8)}...`
                      : card.user.name} */}
                    {card.user?.first_name} {card.user?.last_name}
                  </Text>
                  <Text color={"#98A2B3"} fontSize={{ base: 8, md: 11 }}>
                    {formatTime(card.created_at)}
                  </Text>
                </HStack>
              </HStack>
              <Text
                fontFamily="InterRegular"
                fontSize={{ base: "11px", md: 13 }}
                color={"#475367"}
                className="font-semibold"
              >
                {card.body.length > 89
                  ? `${card.body.slice(0, 89)}...`
                  : card.body}
                {/* {truncateText(card.body, 90)} */}
              </Text>

              <Stack>
                {/* <HStack
                  rounded={10}

                  py={1}
                  pl={2}
                  pr={3}
                  w={{ base: 74, md: 110 }}
                  bg={"#fff"}
                  border={"1px solid #F0F2F5"}
                >
                  <Image
                    src={notify2}
                    alt="Update"
                    boxSize={{ base: "12px", md: "22px" }}
                    rounded={0}
                  />
                  <Text color={"#344054"} fontSize={{ base: 7, md: 11 }}>
                    Video.MP3
                  </Text>
                </HStack> */}
                <Flex gap={3} alignItems={"center"}>
                  <HStack
                    rounded={{ base: 5, md: 10 }}
                    // my={2}
                    py={1}
                    pl={2}
                    pr={3}
                    w={{ base: "65px", md: 110 }}
                    bg={"#fff"}
                    border={"1px solid #F0F2F5"}
                  >
                    {/* <Image src={notify2} alt="Update" boxSize="22px" rounded={0} /> */}
                    <AiOutlineLike size={10} />

                    <Text color={"#344054"} fontSize={{ base: 7, md: 11 }}>
                      {card?.likes?.length} Likes
                    </Text>
                  </HStack>
                  <HStack
                    rounded={{ base: 5, md: 10 }}
                    // my={2}
                    py={1}
                    pl={2}
                    pr={3}
                    w={{ base: "80px", md: 110 }}
                    bg={"#fff"}
                    whiteSpace={"nowrap"}
                    border={"1px solid #F0F2F5"}
                  >
                    {/* <Image src={notify2} alt="Update" boxSize="22px" rounded={0} /> */}
                    <FaComment size={10} />
                    <Text
                      color={"#344054"}
                      fontSize={{ base: "6px", md: "9px" }}
                    >
                      {card?.comments?.length} Comments
                    </Text>
                  </HStack>
                </Flex>
              </Stack>
              <Button
                fontFamily="LatoBold"
                rounded={5}
                fontSize={{ base: 7, md: 12 }}
                px={{ base: 4 }}
                py={{ base: 1.5, md: 0 }}
                my={2}
                size={{ base: "20px", md: "xs" }}
                border={"1px solid #D0D5DD"}
                bg={"#fff"}
                color={"#344054"}
                mr={"auto"}
                onClick={() => navigate(`/post/${card.id}`)}
              >
                See Post
              </Button>
            </Box>
          ))
        ) : (
          <Text>No Posts yet</Text>
        )}
      </Box>
    </Box>
  );
};

export default CommunityPost;

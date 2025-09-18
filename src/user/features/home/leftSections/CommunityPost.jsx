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
          fontSize={{ base: 13, md: 15 }}
          // fontFamily="LatoMedium"
          bg={"transparent"}
          color={"#202224"}
        >
          Community Posts
        </Text>
        <Button
          p={0}
          fontSize={{ base: 10, md: 12 }}
          onClick={() => navigate("/community")}
          bg={"transparent"}
          color={"#3366CC"}
          fontWeight={"normal"}
          textDecoration={"underline"}
        >
          See All
        </Button>
      </Flex>

      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {posts.length > 0 ? (
          posts.map((card) => (
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
              h={{ base: 190, md: 245 }} // shadow={"xs"}
              border={"1px solid #F0F2F5"}
              className="   relative overflow-hidden"
            >
              <HStack pt={5} pb={2} spacing={4} align="center">
                <Stack position={"relative"}>
                  <Image
                    src={card.user.profile_picture || logo}
                    alt="Update"
                    boxSize="20px"
                    rounded={20}
                  />
                </Stack>
                <HStack alignItems={"center"}>
                  <Text
                    // whiteSpace={"nowrap"}
                    color={"#202020"}
                    fontSize={{ base: 8, md: 12 }}
                    fontFamily="InterMedium"
                  >
                    {card.user.name.length > 8
                      ? `${card.user.name.slice(0, 8)}...`
                      : card.user.name}
                  </Text>
                  <Text color={"#98A2B3"} fontSize={{ base: 8, md: 11 }}>
                    {formatTime(card.created_at)}
                  </Text>
                </HStack>
              </HStack>
              <Text
                fontFamily="InterRegular"
                fontSize={{ base: 12, md: 13 }}
                color={"#475367"}
                className="font-semibold"
              >
                {card.body.length > 90
                  ? `${card.body.slice(0, 90)}...`
                  : card.body}
                {/* {truncateText(card.body, 90)} */}
              </Text>

              <Stack>
                <HStack
                  rounded={10}
                  // my={2}
                  py={1}
                  pl={2}
                  pr={3}
                  w={{ base: 10, md: 110 }}
                  bg={"#fff"}
                  border={"1px solid #F0F2F5"}
                >
                  <Image
                    src={notify2}
                    alt="Update"
                    boxSize="22px"
                    rounded={0}
                  />
                  <Text color={"#344054"} fontSize={{ base: 8, md: 11 }}>
                    Video.MP3
                  </Text>
                </HStack>
                <Flex gap={3} alignItems={"center"}>
                  <HStack
                    rounded={10}
                    // my={2}
                    py={1}
                    pl={2}
                    pr={3}
                    w={{ base: 10, md: 110 }}
                    bg={"#fff"}
                    border={"1px solid #F0F2F5"}
                  >
                    {/* <Image src={notify2} alt="Update" boxSize="22px" rounded={0} /> */}
                    <AiOutlineLike />

                    <Text color={"#344054"} fontSize={{ base: 8, md: 11 }}>
                      {card?.likes?.length} Likes
                    </Text>
                  </HStack>
                  <HStack
                    rounded={10}
                    // my={2}
                    py={1}
                    pl={2}
                    pr={3}
                    w={{ base: 10, md: 110 }}
                    bg={"#fff"}
                    border={"1px solid #F0F2F5"}
                  >
                    {/* <Image src={notify2} alt="Update" boxSize="22px" rounded={0} /> */}
                    <FaComment size={10} />
                    <Text color={"#344054"} fontSize={{ base: 6, md: 9 }}>
                      {card?.comments?.length} Comments
                    </Text>
                  </HStack>
                </Flex>
              </Stack>
              <Button
                fontFamily="LatoBold"
                rounded={5}
                fontSize={12}
                py={0}
                mb={2}
                size={"xs"}
                border={"1px solid #D0D5DD"}
                bg={"#fff"}
                color={"#344054"}
                mr={"auto"}

                onClick={()=>navigate(`/post/${card.id}`)}
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

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
const cardData = [
  {
    id: 1,
    image: logo,
    notificationImage: notify,
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
              key={card.id}
              bg={"#F9FAFB"}
              rounded={8}
              // shadow={"xs"}
              border={"1px solid #F0F2F5"}
              className="bg-[#F9FAFB]    relative overflow-hidden"
            >
              <HStack pt={5} pb={2} spacing={4} align="center">
                <Stack position={"relative"}>
                  <Image
                    src={card.user.profile_picture || logo}
                    alt="Update"
                    boxSize="30px"
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
                {card.body.length > 18
                  ? `${card.body.slice(0, 8)}...`
                  : card.body}
                {/* {truncateText(card.body, 90)} */}
              </Text>

              {/* <HStack rounded={10} mb={2} py={1} pl={2} pr={3} w={{base:10,md:110}} bg={'#fff'} border={'1px solid #F0F2F5'}>
               <Image
                 src={card.notificationImage}
                 alt="Update"
                 boxSize="22px"
                rounded={0}
                />
               <Text
                color={'#344054'}
                fontSize={{base:8,md:11}}
               >
                Video.MP3
               </Text>
            </HStack> */}
              {/* <Button fontFamily="LatoBold" rounded={5} fontSize={12} py={0}  mb={2} border={'1px solid #D0D5DD'} bg={'#fff'} color={'#344054'}>
              See Message
            </Button> */}
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

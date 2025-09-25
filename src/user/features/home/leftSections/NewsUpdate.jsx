import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import btns from "../../../../assets/btn.svg";
import axiosClient from "../../../../axiosClient";
import { formatTime } from "../../../../lib/formatTime";
import { userAvatar } from "../../setting/posts/Posts";

const NewsUpdate = () => {
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [visibleCards, setVisibleCards] = useState(1);
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosClient.get("/updates");
      setNews(res.data.articles || []);
    };
    getPosts();
  }, []);

  // Responsive breakpoints
  const getVisibleCards = () => {
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  useEffect(() => {
    const handleResize = () => setVisibleCards(getVisibleCards());
    setVisibleCards(getVisibleCards());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Infinite slider
  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % news.length);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Build visible cards slice
  const getVisibleNews = () => {
    if (news.length === 0) return [];
    const items = [];
    for (let i = 0; i < visibleCards; i++) {
      items.push(news[(index + i) % news.length]); // loop around
    }
    return items;
  };

  return (
    <Box>
      {/* Header with controls */}
      <Flex py={3} justifyContent="space-between" alignItems="center">
        <Text fontSize={{ base: 11, md: 15 }} color="#202224">
          News & Updates
        </Text>
        <HStack spacing={2}>
          <IconButton
            bg="#fff"
            border="1px solid #9E9E9E"
            rounded={20}
            aria-label="Prev"
            size={{ base: "20px", md: "xs" }}
            onClick={handlePrev}
          >
            <IoIosArrowBack size={20} color="#9E9E9E" />
          </IconButton>
          <IconButton
            bg="#fff"
            border="1px solid #9E9E9E"
            rounded={20}
            aria-label="Next"
            size={{ base: "20px", md: "xs" }}
            onClick={handleNext}
          >
            <IoIosArrowForward size={20} color="#9E9E9E" />
          </IconButton>
        </HStack>
      </Flex>

      {/* Slider */}
      <Box w="100%" overflow="hidden" pb={4}>
        <Flex gap={4} justify="flex-start">
          {getVisibleNews().map((card, idx) => (
            <Box
              key={`${card.id}-${idx}`}
              // flexShrink={0}
              cursor="pointer"
              bg="#fff"
              px={"12px"}
              pt={"12px"}
              display="flex"
              flexDirection="column"
              justifyContent={"space-between"}
              rounded={{ base: 10, md: 20 }}
              w={{ base: "100%" }}
              // h={{ base: 240, md: 245 }}
              className="shadow-lg relative"
              onClick={() => navigate(`/news/${card.id}`)}
            >
              <Image
                rounded={12}
                src={card.image}
                alt="post image"
                h={{ base: 90, md: 113 }}
                w="100%"
                className="object-cover"
              />
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(card.id);
                }}
                className="absolute cursor-pointer top-5 right-6"
              >
                <Image
                  src={btns}
                  alt="buttons"
                  className="w-6 h-6 object-cover"
                />
              </button> */}
              <Box pt={2}>
                <Text
                  fontSize={{ base: 12, md: 13 }}
                  // fontFamily={"OutfitMedium"}
                  textTransform={"capitalize"}
                  fontWeight={"medium"}
                  // className=" "
                >
                  {card.content.length > 103
                    ? `${card.content.slice(0, 103)}...`
                    : card.content}
                </Text>
              </Box>
              <HStack pt={4} pb={2} spacing={4} align="flex-start">
                <Image
                  src={userAvatar}
                  alt="Update"
                  boxSize="24px"
                  rounded={20}
                />
                <Stack spacing={0}>
                  <Text
                    color="#202020"
                    fontSize={{ base: 8, md: 10 }}
                    fontFamily="InterMedium"
                  >
                    The Lounge Team
                  </Text>
                  <Text color="#202020" mt={-2} fontSize={{ base: 8, md: 10 }}>
                    {formatTime(card?.created_at)}
                  </Text>
                </Stack>
              </HStack>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default NewsUpdate;

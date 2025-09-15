import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
=======
import { Box, Button, HStack, IconButton, Image, Stack, Text } from "@chakra-ui/react";
>>>>>>> 484e710c9ff0744934e38d5180b31485ce39e8e1
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import btns from "../../../../assets/btn.svg";
import axiosClient from "../../../../axiosClient";
import { formatTime } from "../../../../lib/formatTime";

const NewsUpdate = () => {
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [visibleCards, setVisibleCards] = useState(3);
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const navigate = useNavigate();

  // Fetch posts
  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosClient.get("/get-all-posts");
      setNews(res.data.posts);
    };
    getPosts();
  }, []);

  // Update visibleCards on resize
  const getVisibleCards = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    const handleResize = () => setVisibleCards(getVisibleCards());
    setVisibleCards(getVisibleCards());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clone edges for infinite loop
  const extendedCards = [
    ...news?.slice(-visibleCards),
    ...news,
    ...news?.slice(0, visibleCards),
  ];

  // Reset when reaching clone edges
  useEffect(() => {
    if (index === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(news.length);
      }, 500);
    }
    if (index === news.length + visibleCards) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(visibleCards);
      }, 500);
    }
  }, [index, news.length, visibleCards]);

  // Enable transition back
  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => setIsTransitioning(true));
    }
  }, [isTransitioning]);

  const handlePrev = () => setIndex((prev) => prev - 1);
  const handleNext = () => setIndex((prev) => prev + 1);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <Box>
      <Flex py={3} justifyContent={"space-between"} alignItems={"center"}>
        <Text
          fontSize={{ base: 13, md: 15 }}
          // fontFamily="LatoMedium"
          color={"#202224"}
        >
          News & Updates
        </Text>
        {/* Controls */}
        <Box className="flex gap-2 justify-end items-center">
          <IconButton
            bg="#fff"
            border="1px solid #9E9E9E"
            rounded={20}
            aria-label="Prev"
            size={"xs"}
            onClick={handlePrev}
          >
            <IoIosArrowBack color="#9E9E9E" />
          </IconButton>
          <IconButton
            aria-label="Next"
            bg="#fff"
            size={"xs"}
            border="1px solid #9E9E9E"
            rounded={20}
            onClick={handleNext}
          >
            <IoIosArrowForward color="#9E9E9E" />
          </IconButton>
        </Box>
      </Flex>

      {/* Slider */}
      <Box className="overflow-hidden w-full" pb={3}>
        <Box
          className={`flex gap-4 ${
            isTransitioning ? "transition-transform duration-500" : ""
          }`}
          mx={"auto"}
          justifyContent={"center"}
          style={{
            transform: `translateX(-${index * visibleCards}%)`,
            width: `${(extendedCards.length * 100) / visibleCards}%`,
          }}
        >
           <Button bg={'transparent'} color={'#202224'}    >
                 News & Updates
                </Button>
          {extendedCards.map((card, idx) => (
            <Box
              key={`${card.id}-${idx}`}
              flexShrink={0}
              px={4}
              pt={4}
              cursor={"pointer"}
              w={`${100 / extendedCards.length}%`}
              maxW={{ base: 180, md: 250 }}
              rounded={{ base: 5, md: 20 }}
              className="bg-white  relative"
              onClick={() => navigate(`/profile/${card.id}`)}
            >
              <Image
                roundedTop={10}
                src={card.post_image}
                alt="post image"
                className="w-full h-40 object-cover"
              />
              <button
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
              </button>
              <Box pt={2}>
                <Text fontSize={{ base: 12, md: 14 }} className="font-semibold">
                  {card.body}
                </Text>
              </Box>
              <HStack pt={4} pb={2} spacing={4} align="flex-start">
                <Stack>
                  <Image
                    src={card?.user.profile_picture}
                    alt="Update"
                    boxSize="30px"
                    rounded={20}
                  />
                </Stack>
                <Stack>
                  <Text fontSize={{ base: 8, md: 10 }}>
                    {card?.user.first_name} {card?.user.last_name}
                  </Text>
                  <Text fontSize={{ base: 8, md: 10 }} mt="-2">
                    {formatTime(card?.created_at)}
                  </Text>
                </Stack>
              </HStack>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NewsUpdate;

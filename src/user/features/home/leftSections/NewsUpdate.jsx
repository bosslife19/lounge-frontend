import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import btns from "../../../../assets/btn.svg";
import axiosClient from "../../../../axiosClient";
import { formatTime } from "../../../../lib/formatTime";
import { userAvatar } from "../../setting/posts/Posts";

const cardData = [
  {
    id: 1,
    eImage: images,
    title: "Beginner’s bbe Guide to becoming a professional frontend developer",
    subtitle: "Subtitle One",
    subimage: logo,
    date: "july 5, 2025",
  },
  {
    id: 2,
    eImage: images,
    title: "Beginner’s Guide to becoming a professional frontend developer",
    subtitle: "Subtitle Two",
    subimage: logo,
    date: "july 5, 2025",
  },
  {
    id: 3,
    eImage: images,
    title: "Beginner’s Guide to becoming a professional frontend developer",
    subtitle: "Subtitle Three",
    subimage: logo,
    date: "july 5, 2025",
  },
  {
    id: 4,
    eImage: images,
    title: "Beginner’s Guide to becoming a professional frontend developer",
    subtitle: "Subtitle Four",
    subimage: logo,
    date: "july 5, 2025",
  },
  {
    id: 5,
    eImage: images,
    title: "Beginner’s Guide to becoming a professional frontend developer",
    subtitle: "Subtitle Five",
    subimage: logo,
    date: "july 5, 2025",
  },
  {
    id: 6,
    eImage: images,
    title: "Beginner’s Guide to becoming a professional frontend developer",
    subtitle: "Subtitle Six",
    subimage: logo,
    date: "july 5, 2025",
  },
  {
    id: 7,
    eImage: images,
    title: "Beginner’s Guide to becoming a professional frontend developer",
    subtitle: "Subtitle Seven",
    subimage: logo,
    date: "july 5, 2025",
  },
];

const NewsUpdate = () => {
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cardWidth, setCardWidth] = useState(0);

  // Responsive breakpoints (adjust how many cards per screen)
  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosClient.get("/updates");

      setNews(res.data.articles);
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
      <Box
        className="overflow-hidden w-full"
        w={"100%"}
        overflow={"hidden"}
        pb={4}
      >
        <Button bg={"transparent"} color={"#202224"}>
          News & Updates
        </Button>
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
          {extendedCards.map((card, idx) => (
            <Box
              key={`${card.id}-${idx}`}
              flexShrink={0}
              px={4}
              pt={4}
              cursor={"pointer"}
              style={{ width: `${cardWidth}px`, maxWidth: "280px" }}
              className="bg-white   rounded-2xl shadow-lg relative"
              onClick={() => navigate(`/news/${card.id}`)}
            >
              <Image
                roundedTop={10}
                src={card.image}
                alt={"post image"}
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
                <Text
                  // fontFamily="LatoRegular"
                  fontSize={{ base: 12, md: 14 }}
                  lineHeight={-2}
                  className="font-semibold"
                >
                  {card.content}
                </Text>
              </Box>
              <HStack
                // px={6}
                pt={4}
                pb={2}
                spacing={4}
                align="flex-start"
              >
                <Stack position={"relative"}>
                  <Image
                    src={userAvatar}
                    alt="Update"
                    boxSize="30px"
                    rounded={20}
                    // objectFit="cover"
                  />
                </Stack>
                <Stack>
                  <Text
                    color={"#202020"}
                    fontSize={{ base: 8, md: 10 }}
                    fontFamily="InterMedium"
                  >
                    The Lounge Team
                  </Text>
                  <Text
                    color={"#202020"}
                    fontSize={{ base: 8, md: 10 }}
                    mt={"-2"}
                  >
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

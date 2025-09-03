import React, { useState, useEffect } from "react";
import { Box, HStack, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import btns from "../../../../assets/btn.svg"
import images from "../../../../assets/course.png"
import logo from "../../../../assets/userImage.jpg"
import axiosClient from "../../../../axiosClient";
import {formatTime} from '../../../../lib/formatTime'

const cardData = [
  { id: 1, eImage:images, title: "Beginner’s bbe Guide to becoming a professional frontend developer", subtitle: "Subtitle One",subimage:logo,date:'july 5, 2025' },
  { id: 2, eImage:images,  title: "Beginner’s Guide to becoming a professional frontend developer", subtitle: "Subtitle Two",subimage:logo,date:'july 5, 2025' },
  { id: 3, eImage:images,  title: "Beginner’s Guide to becoming a professional frontend developer", subtitle: "Subtitle Three",subimage:logo,date:'july 5, 2025' },
  { id: 4, eImage: images,  title: "Beginner’s Guide to becoming a professional frontend developer", subtitle: "Subtitle Four",subimage:logo,date:'july 5, 2025' },
  { id: 5, eImage: images,  title: "Beginner’s Guide to becoming a professional frontend developer", subtitle: "Subtitle Five",subimage:logo,date:'july 5, 2025' },
  { id: 6, eImage: images,  title: "Beginner’s Guide to becoming a professional frontend developer",subtitle: "Subtitle Six",subimage:logo,date:'july 5, 2025' },
  { id: 7, eImage: images,  title: "Beginner’s Guide to becoming a professional frontend developer", subtitle: "Subtitle Seven",subimage:logo,date:'july 5, 2025' },
];





const NewsUpdate = () => {
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cardWidth, setCardWidth] = useState(0);

  // Responsive breakpoints (adjust how many cards per screen)
  useEffect(()=>{
  const getPosts = async ()=>{
    const res = await axiosClient.get('/get-all-posts');
   
    setNews(res.data.posts)
  }
  getPosts();
}, [])

  const getVisibleCards = () => {
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());
  const totalCards = news?.length;

  // Clone edges for infinite loop
  const extendedCards = [
    ...news?.slice(-visibleCards),
    ...news,
    ...news?.slice(0, visibleCards),
  ];

  const [index, setIndex] = useState(visibleCards);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handlePrev = () => setIndex((prev) => prev - 1);
  const handleNext = () => setIndex((prev) => prev + 1);

  // Handle infinite scroll reset
  useEffect(() => {
    if (index === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(totalCards);
      }, 500);
    } else if (index === totalCards + visibleCards) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(visibleCards);
      }, 500);
    } else {
      setIsTransitioning(true);
    }
  }, [index, totalCards, visibleCards]);

  // Recalculate card width and visibleCards on resize
  useEffect(() => {
   // inside useEffect updateLayout
const updateLayout = () => {
  const newVisibleCards = getVisibleCards();
  setVisibleCards(newVisibleCards);

  // shrink container size (e.g., 70% of screen width instead of 90%)
  const containerWidth = window.innerWidth * 0.7;

  // medium card sizing, but don’t exceed 280px
  const cardWidth = Math.min(containerWidth / newVisibleCards, 280);

  setCardWidth(cardWidth);
   };

  
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const navigate = useNavigate();

  return (
    <Box flex="3"    >
      {/* Controls */}
      <Box pb={3} className="flex gap-2 justify-end items-center">
        <IconButton
          bg="#fff"
          border="1px solid #9E9E9E"
          rounded={20}
         aria-label="Prev" 
         onClick={handlePrev}>
          <IoIosArrowBack color="#9E9E9E" />
        </IconButton>
        <IconButton 
        aria-label="Next" 
        bg="#fff"
          border="1px solid #9E9E9E"
          rounded={20} 
          onClick={handleNext}>
          <IoIosArrowForward  color="#9E9E9E" />
        </IconButton>
      </Box>

      {/* Slider */}
      <Box className="overflow-hidden w-full" w={'100%'} overflow={'hidden'} pb={4}>
        <Box
          className={`flex gap-4 ${isTransitioning ? "transition-transform duration-500" : ""}`}
          style={{ transform: `translateX(-${index * cardWidth}px)` }}
        >
          {extendedCards.map((card, idx) => (
            <Box
              key={`${card.id}-${idx}`}
              flexShrink={0}
              px={4}
              pt={4}
              cursor={'pointer'}
               style={{ width: `${cardWidth}px`, maxWidth: "280px" }}
              className="bg-white   rounded-2xl shadow-lg relative"
              onClick={() => navigate(`/profile/${card.id}`)}
            >
              <Image
                roundedTop={10}
                src={card.post_image}
                alt={'post image'}
                className="w-full h-40 object-cover"
              />
              <button
                onClick={() => toggleFavorite(card.id)}
                className="absolute cursor-pointer top-5 right-6"
              >
                <Image
                roundedTop={10}
                src={btns}
                alt={'buttons'}
                className="w-full h-40 object-cover"
              />
                {/* <FaHeart
                  size={22}
                  className={favorites.includes(card.id) ? "text-red-500" : "text-gray-300"}
                /> */}
              </button>
              <Box pt={2}>
                <Text  
                // fontFamily="LatoRegular" 
                fontSize={{base:12,md:14}} 
                lineHeight={-2}
                className="font-semibold">{card.body}</Text>
               </Box>
              <HStack 
                    // px={6}
                    pt={4}
                    pb={2}  
                    spacing={4} 
                    
                    align="flex-start">
                      <Stack position={'relative'}>
                      <Image
                        src={card?.user.profile_picture}
                        alt="Update"
                        boxSize="30px"
                         rounded={20}
                        // objectFit="cover"
                      />
                      </Stack>
                       <Stack>
                        <Text 
                        color={'#202020'}
                        fontSize={{base:8,md:10}}
                          fontFamily="InterMedium">
                          {card?.user.first_name} {card?.user.last_name}
                        </Text>
                      <Text 
                        color={'#202020'}
                        fontSize={{base:8,md:10}} 
                        mt={'-2'}  >
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

import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Image,
  Flex,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { LuClock3 } from "react-icons/lu";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from "react";
import axiosClient from "../../../../axiosClient";

// 🔹 Utility: format date properly
function formatEventDate(dateStr) {
  const cleanDate = dateStr.replace(/-\d{2}$/, ""); // remove trailing "-01"
  const date = new Date(cleanDate);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function Banner() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  const quoteImage =
    "https://media.licdn.com/dms/image/v2/C4D12AQFD6RhJMVtskQ/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1617945315771?e=2147483647&v=beta&t=SaDX5kJpDHSJyDePwJdPFyaaXs8BmD0rsKu3XmevvH0";
  // 🔹 Motivational quotes with images
  const motivationalQuotes = [
    {
      title: "Become the person you needed when you started",
      body: "Every journey begins with uncertainty, but courage turns that uncertainty into strength. Growth happens when you choose to move forward, even without clarity. You are not behind. You are becoming.",
      image: quoteImage,
    },
    {
      title: "Rise through the storm",
      body: "The moments that challenge you are the ones that refine you. Strength grows in the silence of perseverance. Every storm you endure teaches you how to stand taller the next time.",
      image: quoteImage,
    },
    {
      title: "Lead with meaning",
      body: "When you understand why you do what you do, direction follows naturally. Purpose turns obstacles into opportunities. Meaningful work is what makes progress feel alive.",
      image: quoteImage,
    },
    {
      title: "Do it scared",
      body: "Courage begins when comfort ends. Fear is proof that you are stretching into something new. Take the step anyway and watch your confidence grow with every attempt.",
      image: quoteImage,
    },
    {
      title: "Train your thoughts",
      body: "The quality of your thoughts defines the quality of your life. Choose focus over fear and progress over doubt. A disciplined mind creates a powerful reality.",
      image: quoteImage,
    },
    {
      title: "Consistency beats intensity",
      body: "It is not what you do once that changes you, but what you",
      image: quoteImage,
    },
  ];

  // 🔹 Fetch events and combine with quotes
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosClient.get("/get-events"); // replace with your real endpoint
        const fetchedEvents = res.data.events.map((event) => ({
          ...event,
          type: "event",
        }));

        // Combine both
        const combinedSlides = [...fetchedEvents, ...motivationalQuotes];
        setSlides(combinedSlides);
      } catch (err) {
        console.error("Error fetching events:", err);
        setSlides(motivationalQuotes);
      }
    }
    fetchData();
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // 🔹 Handle no slides
  if (slides.length === 0) {
    return (
      <Box
        bg="linear-gradient(135deg, #2B362F, #2B362F)"
        borderRadius="2xl"
        p={8}
        color="white"
        textAlign="center"
      >
        <Text>No events or quotes yet</Text>
      </Box>
    );
  }

  const slide = slides[current];

  return (
    <Box
      bg="linear-gradient(135deg, #2B362F, #2B362F)"
      borderRadius="2xl"
      px={{ base: 2, md: 5 }}
      py={5}
      color="white"
      boxShadow="xl"
      display="flex"
      flexDirection={{ base: "column-reverse", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
      zIndex={10}
      position="relative"
    >
      {/* Text Section */}
      <VStack
        gap={{ base: 2, lg: 4 }}
        zIndex={10}
        align={{ base: "center", md: "flex-start" }}
        spacing={4}
        mt={{ base: 5, lg: -4 }}
        pt={{ base: 0, md: 5 }}
        w={{ base: "100%", md: "100%" }}
        h={{ base: "40vh", md: "28vh" }}
        // overflow={"hidden"}
      >
        {slide.type === "event" ? (
          <>
            <Text
              fontWeight="light"
              fontSize={{ base: "10px", md: "12px" }}
              textTransform="uppercase"
              color={"#FFFFFF/90"}
            >
              UPCOMING EVENTS
            </Text>

            <Heading
              fontFamily="LatoBold"
              fontSize={{ base: "16px", md: "24px" }}
              textAlign={{ base: "center", md: "left" }}
              fontWeight="600"
            >
              {slide.title.length > 25
                ? `${slide.title.slice(0, 25)}...`
                : slide.title}
            </Heading>

            <Flex
              flexDirection={{ base: "column", md: "row" }}
              gap={3}
              alignItems="center"
            >
              <Text
                fontFamily="InterRegular"
                color="#fff/80"
                fontSize={{ base: "10px", md: "12px" }}
              >
                {formatEventDate(slide.event_date)}
              </Text>
              <Flex gap={2} alignItems="center">
                <LuClock3 />
                <Text
                  fontFamily="InterRegular"
                  color="#fff/80"
                  fontSize={{ base: "10px", md: "12px" }}
                >
                  {slide.start_time} - {slide.end_time}
                </Text>
              </Flex>
            </Flex>

            <Button
              as="a"
              href={slide.event_link}
              target="_blank"
              bg="#202020"
              color="#fff"
              _hover={{ bg: "gray.800" }}
              size={{ base: "xs", md: "md" }}
              rounded={{ base: "10px", md: "20px" }}
              shadow="md"
              fontSize={{ base: "12", md: "12" }}
              fontFamily="InterMedium"
            >
              <Text fontSize={{ base: "10px", md: "12px" }} fontWeight={"400"}>
                Join Now
              </Text>
              <AiFillPlayCircle />
            </Button>
          </>
        ) : (
          //  Quote Slide
          <>
            <Text
              fontWeight="light"
              fontSize={{ base: "10px", md: "12px" }}
              textTransform="uppercase"
              color={"#FFFFFF/90"}
            >
              DAILY MOTIVATION
            </Text>

            <Heading
              fontFamily="LatoBold"
              fontSize={{ base: "16px", md: "24px" }}
              textAlign={{ base: "center", md: "left" }}
              fontWeight="600"
            >
              {/* {slide.title} */}
              {slide.title.length > 45
                ? `${slide.title.slice(0, 45)}...`
                : slide.title}
            </Heading>

            <Text
              fontFamily="InterRegular"
              fontSize={{ base: "12px", md: "14px" }}
              color="#fff/85"
              textAlign={{ base: "center", md: "left" }}
              lineHeight="1.6"
              // maxW="90%"
            >
              {slide.body.length > 120
                ? `${slide.body.slice(0, 120)}...`
                : slide.body}
              {/* {slide.body} */}
            </Text>
          </>
        )}
      </VStack>

      {/* Image Section — only show for events */}
      {slide.type === "event" && (
        <Box textAlign="center" position="relative">
          <Image
            src={slide.event_image}
            alt={slide.title}
            w={{ base: "310px", md: "290px" }}
            h={{ base: "150px", md: "180px" }}
            borderRadius="xl"
            objectFit="cover"
            shadow="lg"
          />
        </Box>
      )}

      {/* Navigation Arrows */}
      <HStack
        justify="end"
        position="absolute"
        right={5}
        bottom={2}
        spacing={4}
        zIndex={20}
      >
        <IconButton
          aria-label="Previous"
          onClick={prevSlide}
          rounded="full"
          bg="white"
          _hover={{ bg: "whiteAlpha.500" }}
          size={{ base: "20px", md: "xs" }}
        >
          <IoIosArrowBack size={20} color="#000" />
        </IconButton>
        <IconButton
          aria-label="Next"
          onClick={nextSlide}
          rounded="full"
          bg="white"
          _hover={{ bg: "whiteAlpha.500" }}
          size={{ base: "20px", md: "xs" }}
        >
          <IoIosArrowForward size={20} color="#000" />
        </IconButton>
      </HStack>
    </Box>
  );
}

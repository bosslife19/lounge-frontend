import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
  HStack,
} from "@chakra-ui/react";
import notify2 from "../../../../assets/coin.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useRequest } from "../../../../hooks/useRequest";
import { toast } from "react-toastify";
import axiosClient from "../../../../axiosClient";

const staticSlides = [
  {
    title: "🧢 Snipes x AiDiA T-Shirt",
    description: "Celebrate your engagement with community merch",
    coins: 100,
  },
  {
    title: "🎓 2x AiDiA Coaching Sessions",
    description: "Exclusive mentoring with the AiDiA team",
    coins: 250,
  },
  {
    title: "💼 LinkedIn Premium (3 months)",
    description: "Boost your visibility and professional reach",
    coins: 500,
  },
];

export const BottomBanner = () => {
  const [current, setCurrent] = useState(0);
  const { loading, makeRequest } = useRequest();
  const [slides, setSlides] = useState(staticSlides);
  const containerRef = useRef(null);

  useEffect(() => {
    const getBenefits = async () => {
      try {
        const res = await axiosClient.get("/benefits");
        const benefits = res.data.benefits || [];

        const formattedBenefits = benefits.map((b) => ({
          title: b.title ?? "Special Reward",
          description: b.company
            ? `Redeem this exclusive offer from ${b.company}`
            : "Redeem this exclusive offer",
          coins: b.points_required ?? 0,
        }));

        setSlides([...staticSlides, ...formattedBenefits]);
      } catch (error) {
        console.error(error);
      }
    };
    getBenefits();
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleClaim = async (benefit, points) => {
    const res = await makeRequest("/claim-benefit", { benefit, points });
    if (res.error) return;
    toast.success("Claim request made successfully");
  };

  // ✅ Simple mobile swipe logic (no library)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      endX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) handleNext();
        else handlePrev();
      }
    };

    el.addEventListener("touchstart", handleTouchStart);
    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [slides]);

  if (slides.length === 0) return null;

  const currentSlide = slides[current];

  return (
    <Box
      bg="#6C3433"
      rounded={{ base: 10, md: 30 }}
      px={{ base: 3, md: 6 }}
      py={{ base: 4, md: 6 }}
      shadow="md"
    >
      {/* ======= Desktop View (unchanged) ======= */}
      <Flex
        display={{ base: "none", md: "flex" }}
        gap={4}
        justifyContent="space-between"
        alignItems="center"
        flexWrap="nowrap"
      >
        {/* Left Control */}
        <IconButton
          bg="#F4F4F4"
          border="1px solid #9E9E9E"
          rounded="full"
          aria-label="Prev"
          size="md"
          onClick={handlePrev}
          _hover={{ bg: "#e0e0e0" }}
        >
          <IoIosArrowBack color="#000" />
        </IconButton>

        {/* Slide Content */}
        <Stack
          flex="1"
          align="flex-start"
          spacing={3}
          textAlign="left"
          maxW="80%"
        >
          <Text fontSize="18px" fontFamily="nunitoSemiBold" color="#fff">
            {currentSlide.title}
          </Text>

          <Text
            fontFamily="InterBold"
            color="#fff"
            fontSize="24px"
            lineHeight="32px"
          >
            {currentSlide.description}
          </Text>

          <Flex align="center" gap={2} mt={2}>
            <Button
              fontSize={16}
              rounded="full"
              bg="#512726"
              p={2}
              minW={100}
              justifyContent="center"
              gap={2}
              color="white"
              _hover={{ bg: "#693130" }}
            >
              <Image src={notify2} alt="Coins" boxSize="22px" />
              {currentSlide.coins}
            </Button>

            <Button
              fontSize={14}
              rounded="full"
              colorScheme="whiteAlpha"
              bg="white"
              color="#512726"
              px={6}
              _hover={{ bg: "#f3f3f3" }}
              onClick={() =>
                handleClaim(currentSlide.title, currentSlide.coins)
              }
            >
              {loading ? "Processing..." : "Claim Now"}
            </Button>
          </Flex>
        </Stack>

        {/* Right Control */}
        <IconButton
          aria-label="Next"
          bg="#F4F4F4"
          border="1px solid #9E9E9E"
          rounded="full"
          size="md"
          onClick={handleNext}
          _hover={{ bg: "#e0e0e0" }}
        >
          <IoIosArrowForward color="#000" />
        </IconButton>
      </Flex>

      {/* ======= Mobile View (swipe + dots) ======= */}
      <Box
        ref={containerRef}
        display={{ base: "flex", md: "none" }}
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        userSelect="none"
      >
        <Text fontSize="14px" fontFamily="nunitoSemiBold" color="#fff" mb={1}>
          {currentSlide.title}
        </Text>

        <Text
          fontFamily="InterBold"
          color="#fff"
          fontSize="13px"
          lineHeight="20px"
          px={3}
        >
          {currentSlide.description}
        </Text>

        <Flex
          flexDirection={{ base: "column", md: "row" }}
          align="center"
          gap={2}
          mt={3}
        >
          <Button
            fontSize={10}
            rounded="full"
            bg="#512726"
            p={2}
            minW={60}
            justifyContent="center"
            gap={2}
            color="white"
            _hover={{ bg: "#693130" }}
          >
            <Image src={notify2} alt="Coins" boxSize="14px" />
            {currentSlide.coins}
          </Button>

          <Button
            fontSize={10}
            rounded="full"
            colorScheme="whiteAlpha"
            bg="white"
            minW={{ base: 60, md: "auto" }}
            color="#512726"
            px={3}
            _hover={{ bg: "#f3f3f3" }}
            onClick={() => handleClaim(currentSlide.title, currentSlide.coins)}
          >
            {loading ? "Processing..." : "Claim Now"}
          </Button>
        </Flex>

        {/* Dots */}
        <HStack justify="center" mt={3} spacing={1}>
          {slides.map((_, idx) => (
            <Box
              key={idx}
              w={current === idx ? "6px" : "6px"}
              h="6px"
              rounded="full"
              bg={current === idx ? "white" : "whiteAlpha.500"}
              transition="all 0.2s"
            />
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

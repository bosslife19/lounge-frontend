import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import notify2 from "../../../../assets/coin.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
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

        // Merge and maintain consistent structure
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
      <Flex
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
          size={{ base: "sm", md: "md" }}
          onClick={handlePrev}
          _hover={{ bg: "#e0e0e0" }}
        >
          <IoIosArrowBack color="#000" />
        </IconButton>

        {/* Slide Content */}
        <Stack
          flex="1"
          align={{ base: "center", md: "flex-start" }}
          spacing={{ base: 2, md: 3 }}
          textAlign={{ base: "center", md: "left" }}
          maxW={{ base: "100%", md: "80%" }}
        >
          <Text
            fontSize={{ base: "14px", md: "18px" }}
            fontFamily="nunitoSemiBold"
            color="#fff"
          >
            {currentSlide.title}
          </Text>

          <Text
            fontFamily="InterBold"
            color="#fff"
            fontSize={{ base: "13px", md: "24px" }}
            lineHeight={{ base: "20px", md: "32px" }}
          >
            {currentSlide.description}
          </Text>

          <Flex align="center" gap={2} mt={{ base: 1, md: 2 }}>
            <Button
              fontSize={{ base: 10, md: 16 }}
              rounded="full"
              bg="#512726"
              p={2}
              minW={{ base: 60, md: 100 }}
              justifyContent="center"
              gap={2}
              color="white"
              _hover={{ bg: "#693130" }}
            >
              <Image
                src={notify2}
                alt="Coins"
                boxSize={{ base: "14px", md: "22px" }}
              />
              {currentSlide.coins}
            </Button>

            <Button
              fontSize={{ base: 10, md: 14 }}
              rounded="full"
              colorScheme="whiteAlpha"
              bg="white"
              color="#512726"
              px={{ base: 3, md: 6 }}
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
          size={{ base: "sm", md: "md" }}
          onClick={handleNext}
          _hover={{ bg: "#e0e0e0" }}
        >
          <IoIosArrowForward color="#000" />
        </IconButton>
      </Flex>
    </Box>
  );
};

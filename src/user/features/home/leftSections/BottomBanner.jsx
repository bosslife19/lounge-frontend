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
import { useState } from "react";
import { useRequest } from "../../../../hooks/useRequest";
import { toast } from "react-toastify";

const slides = [
  {
    title: "🧢 Snipes x AiDiA T-Shirt",
    description: "Celebrate your engagement with community merch",
    coins: 100,
  },
  {
    title: '🎓 2x AiDiA Coaching Sessions',

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
const {loading, makeRequest} = useRequest()
  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  const handleClaim = async (benefit, points)=>{
   
    const res = await makeRequest('/claim-benefit', {benefit, points})
    if(res.error)return;
    toast.success('Claim request made successfully');
  }

  return (
    <Box bg={"#6C3433"} rounded={{ base: 10, md: 30 }} px={{ base: 2, md: 4 }}>
      <Flex
        py={3}
        gap={3}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* Controls */}
        <IconButton
          bg="#F4F4F4"
          border="1px solid #9E9E9E"
          rounded={20}
          aria-label="Prev"
          size={{ base: "10px", md: "md" }}
          onClick={handlePrev}
        >
          <IoIosArrowBack color="#000" />
        </IconButton>

        <Stack py={1}>
          <Text
            fontSize={{ base: "12px", md: "16px" }}
            fontFamily="nunitoSemiBold"
            textAlign={{ base: "center", md: "left" }}
            color={"#fff"}
          >
            {slides[current].title}
          </Text>
          <Text
            fontFamily="InterBold"
            color={"#fff"}
            textAlign={{ base: "center", md: "left" }}
            fontSize={{ base: 14, md: 32 }}
            lineHeight={{ base: "24px", md: "40px" }}
            maxW={{ base: "100%", md: 500 }}
          >
            {slides[current].description}
          </Text>
          <Button
            fontSize={{ base: 8, md: 18 }}
            my={2}
            rounded={{ base: 10, md: 30 }}
            bg={"#512726"}
            p={0}
            maxW={{ base: "100%", md: 90 }}
          >
            <Image
              src={notify2}
              alt="Update"
              boxSize={{ base: "12px", md: "22px" }}
              rounded={0}
            />
            {slides[current].coins}
          </Button>
          <Button
            fontSize={{ base: 9, md: 14 }}
            rounded={10}
            mr={{ base: 0, md: "auto" }}

            onClick={()=>handleClaim(slides[current].title, slides[current].coins)}
          >
            {
              loading ? 'Processing...' : 'Claim Now'
            }
          </Button>
        </Stack>

        <IconButton
          aria-label="Next"
          bg="#F4F4F4"
          size={{ base: "10px", md: "md" }}
          border="1px solid #9E9E9E"
          rounded={20}
          onClick={handleNext}
        >
          <IoIosArrowForward color="#000" />
        </IconButton>
      </Flex>
    </Box>
  );
};

"use client";

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
import { useState } from "react";

// Replace with your images
import banner1 from "../../../../assets/banner.png";
import banner2 from "../../../../assets/userImage.jpg";
import banner3 from "../../../../assets/banner.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export function Banner() {
  const images = [banner1, banner2, banner3];
  const [current, setCurrent] = useState(0);

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      // flex="1"
      bg="linear-gradient(135deg, #2B362F, #2B362F)"
      borderRadius="2xl"
      p={8}
      color="white"
      boxShadow="xl"
      display="flex"
      flexDirection={{ base: "column-reverse", md: "row" }}
      justifyContent="space-between"
      alignItems="center"
    >
      {/* Left content */}
      <VStack
        gap={5}
        align="flex-start"
        spacing={4}
        maxW={{ base: "100%", md: "60%" }}
      >
        <Text
          fontWeight="400"
          fontSize="12px"
          fontFamily="InterRegular"
          textTransform="uppercase"
        >
          UPCOMING EVENT
        </Text>
        <Heading
          fontFamily="LatoBold"
          fontSize={{ base: "16px", md: "24px" }}
          textAlign={{ base: "center", md: "left" }}
          fontWeight="600"
        >
          The 2025 Web Developers Summit: Beginners’ Guide to Coding
        </Heading>
        <Flex gap={3} alignItems="center">
          <Text
            fontFamily="InterRegular"
            color="gray.300"
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="medium"
          >
            Friday, 6 July
          </Text>
          <LuClock3 />
          <Text
            fontFamily="InterRegular"
            color="gray.300"
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="medium"
          >
            11.30 - 12.00 (30 min)
          </Text>
        </Flex>
        <Button
          bg="#202020"
          color="#fff"
          _hover={{ bg: "gray.800" }}
          size="lg"
          rounded="20px"
          shadow="md"
          fontSize={{ base: "xs", md: "md" }}
          fontFamily="InterMedium"
        >
          Join Now
          <AiFillPlayCircle />
        </Button>
      </VStack>

      {/* Right Image Slider */}
      <Box textAlign="center">
        <Image
          src={images[current]}
          alt={`Event Banner ${current + 1}`}
          boxSize={{ base: "100%", md: "200px" }}
          borderRadius="xl"
          objectFit="cover"
          shadow="lg"
          mb={4}
        />
        <HStack justify="end" spacing={4}>
          <IconButton
            aria-label="Previous"
            onClick={prevImage}
            rounded="full"
            bg="white"
            _hover={{ bg: "whiteAlpha.500" }}
            size="xs"
          >
            <IoIosArrowBack color="#000" />
          </IconButton>
          <IconButton
            aria-label="Next"
            onClick={nextImage}
            rounded="full"
            bg="white"
            _hover={{ bg: "whiteAlpha.500" }}
            size="xs"
          >
            <IoIosArrowForward color="#000" />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
}

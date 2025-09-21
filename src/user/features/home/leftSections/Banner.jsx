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
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from "react";
import axiosClient from "../../../../axiosClient";
import { Star5 } from "../../../../assets/Star 5";
import { Star1 } from "../../../../assets/Star 1";
import { Star3 } from "../../../../assets/Star 3";
import { Star4 } from "../../../../assets/Star 4";

// 🔹 Utility: format date properly
function formatEventDate(dateStr) {
  // Example backend format: "2025-09-11-01"
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
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);

  // 🔹 Fetch events on mount
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axiosClient.get("/get-events"); // change to your real endpoint

        setEvents(res.data.events);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }
    fetchEvents();
  }, []);

  const prevEvent = () => {
    setCurrent((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const nextEvent = () => {
    setCurrent((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  // 🔹 If no events yet, show placeholder
  if (events.length === 0) {
    return (
      <Box
        bg="linear-gradient(135deg, #2B362F, #2B362F)"
        borderRadius="2xl"
        p={8}
        color="white"
        textAlign="center"
      >
        <Text>No upcoming events yet</Text>
      </Box>
    );
  }

  const event = events[current];

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
      position={"relative"}
    >
      <VStack
        gap={{ base: 2, lg: 4 }}
        zIndex={10}
        align={{ base: "center", md: "flex-start" }}
        spacing={4}
        mt={{ base: 5, lg: -4 }}
        w={{ base: "100%", md: "60%" }}
      >
        <Text
          fontWeight="light"
          fontSize={{ base: "10px", md: "12px" }}
          // fontFamily="InterRegular"
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
          {event.title.length > 25
            ? `${event.title.slice(0, 25)}...`
            : event.title}
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
            fontWeight="normal"
          >
            {formatEventDate(event.event_date)}
          </Text>
          <Flex gap={2} alignItems="center">
            <LuClock3 />
            <Text
              fontFamily="InterRegular"
              color="#fff/80"
              fontSize={{ base: "10px", md: "12px" }}
              fontWeight="normal"
            >
              {event.start_time} - {event.end_time}
            </Text>
          </Flex>
        </Flex>
        <Button
          as="a"
          href={event.event_link} //  the link from your backend
          target="_blank"
          bg="#202020"
          // px={5}
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
      </VStack>
      {/* Right Event Image */}
      <Box textAlign="center" position={"relative"}>
        <Image
          src={event.event_image}
          alt={event.title}
          w={{ base: "310px", md: "290px" }}
          h={{ base: "200px", md: "180px" }}
          // boxSize={{ base: "100%", md: "290px" }}
          borderRadius="xl"
          objectFit="fill"
          shadow="lg"
          // mb={1}
        />
        <HStack
          justify="end"
          position={"absolute"}
          right={0}
          bottom={-3}
          spacing={4}
        >
          <IconButton
            aria-label="Previous"
            onClick={prevEvent}
            rounded="full"
            bg="white"
            _hover={{ bg: "whiteAlpha.500" }}
            size={{ base: "20px", md: "xs" }}
          >
            <IoIosArrowBack size={20} color="#000" />
          </IconButton>
          <IconButton
            aria-label="Next"
            onClick={nextEvent}
            rounded="full"
            bg="white"
            _hover={{ bg: "whiteAlpha.500" }}
            size={{ base: "10px", md: "xs" }}
            className=" text-2xl"
          >
            <IoIosArrowForward
              className="text-[1400px]"
              fontSize={"10px"}
              size={20}
              color="#000"
            />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
}

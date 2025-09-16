import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { cardData } from "../../../hooks/useData";
import { CiClock2, CiSearch } from "react-icons/ci";
import tick from "../../../assets/check.png";
import file from "../../../assets/fileattach.png";

export const Program = () => {
  // ---------- News Slider ----------
  const newsItems = [
    {
      title: "Corporate Finance & Capital Markets Program",
      description:
        "The is also known as the Roseline Etuokwu Sigma Secondary School Quiz Competition is one of the philanthropic activities of the club to bring the club closer to the grassroots. It is the club’s believe that the secondary school students would grow to become University students. As such, introducing the club to them right from their secondary school days would guide them in manners to act and way of life to live as a student of higher institutions.",
    },
    {
      title: "Entrepreneurship & Innovation Program",
      description:
        "This program empowers young entrepreneurs by providing resources, mentorship, and guidance to scale their business ideas into reality.",
    },
    {
      title: "Leadership & Personal Development Workshop",
      description:
        "A workshop focused on building leadership qualities, self-awareness, and communication skills to prepare participants for real-world challenges.",
    },
  ];

  const [newsIndex, setNewsIndex] = useState(0);
  const newsRef = useRef(null);
  const newsSlides = [...newsItems, ...newsItems]; // duplicate for smooth looping

  const handleNewsPrev = () => setNewsIndex((prev) => prev - 1);
  const handleNewsNext = () => setNewsIndex((prev) => prev + 1);

  useEffect(() => {
    if (newsIndex < 0)
      setTimeout(() => setNewsIndex(newsItems.length - 1), 300);
    else if (newsIndex >= newsItems.length)
      setTimeout(() => setNewsIndex(0), 300);
  }, [newsIndex]);

  // ---------- Speaker Slider ----------
  const [speakerIndex, setSpeakerIndex] = useState(0);
  const speakerRef = useRef(null);
  const visibleSpeakerCards = 5;
  const speakerSlides = [...cardData, ...cardData];

  const handleSpeakerPrev = () => setSpeakerIndex((prev) => prev - 1);
  const handleSpeakerNext = () => setSpeakerIndex((prev) => prev + 1);

  useEffect(() => {
    if (speakerIndex < 0)
      setTimeout(() => setSpeakerIndex(cardData.length - 1), 300);
    else if (speakerIndex >= cardData.length)
      setTimeout(() => setSpeakerIndex(0), 300);
  }, [speakerIndex]);

  // ---------- Session Slider ----------
  const [sessionIndex, setSessionIndex] = useState(0);
  const sessionRef = useRef(null);
  const visibleSessionCards = 3;
  const sessionSlides = [...cardData, ...cardData]; // use separate data if available

  const handleSessionPrev = () => setSessionIndex((prev) => prev - 1);
  const handleSessionNext = () => setSessionIndex((prev) => prev + 1);

  useEffect(() => {
    if (sessionIndex < 0)
      setTimeout(() => setSessionIndex(cardData.length - 1), 300);
    else if (sessionIndex >= cardData.length)
      setTimeout(() => setSessionIndex(0), 300);
  }, [sessionIndex]);

  return (
    <Box px={5} h={"100vw"}>
      {/* Header */}
      {/* <HStack gap={5} mb={5}>
        <IconButton bg="#fff" border="1px solid #9E9E9E" rounded={20} aria-label="back">
          <IoIosArrowBack color="#9E9E9E" />
        </IconButton>
        <Text color="#202020" fontWeight={'medium'} fontSize={{ base: 17, md: 24 }} fontFamily="InterMedium">
          Learning Hub
        </Text>
      </HStack> */}
      {/* <InputGroup w={300} mt={-5} mb={5} startElement={<CiSearch size={15} />}>
        <Input
          py={15}
          fontSize={10}
          borderRadius={10}
          placeholder="Search..."
        />
      </InputGroup> */}

      {/* -------- News & Updates Slider -------- */}
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text
          color="#202020"
          fontWeight={"medium"}
          fontSize={{ base: 14, md: 16 }}
          fontFamily="LatoRegular"
        >
          News & Updates
        </Text>
        <HStack gap={2}>
          <IconButton
            bg="#fff"
            border="1px solid #9E9E9E"
            rounded={20}
            size={"xs"}
            aria-label="Prev"
            onClick={handleNewsPrev}
          >
            <IoIosArrowBack color="#9E9E9E" />
          </IconButton>
          <IconButton
            bg="#fff"
            border="1px solid #9E9E9E"
            rounded={20}
            size={"xs"}
            aria-label="Next"
            onClick={handleNewsNext}
          >
            <IoIosArrowForward color="#9E9E9E" />
          </IconButton>
        </HStack>
      </Flex>

      <Flex
        overflowX="hidden" // ✅ only hide horizontal overflow
        overflowY="auto" // ✅ allow vertical scroll if content is taller
        my={5}
        mr={{ base: 0, md: 100 }}
      >
        <Flex
          ref={newsRef}
          transform={`translateX(-${newsIndex * 100}%)`}
          transition="transform 0.5s ease-in-out"
          width={`${(newsSlides.length / newsItems.length) * 100}%`}
        >
          {newsSlides.map((item, idx) => (
            <Box
              key={idx}
              minW="100%"
              h="auto"
              overflow="visible"
              bg="white"
              p={10}
              border="1px solid #080F340F"
              rounded={20}
            >
              <Heading
                whiteSpace="normal"
                wordBreak="break-word"
                color="#202020"
                fontWeight="bold"
                fontSize={{ base: 18, md: 24 }}
                fontFamily="LatoBold"
              >
                {item.title}
              </Heading>
              <Text
                mt={3}
                flexWrap={"wrap"}
                wordBreak="break-word"
                whiteSpace="normal"
                color="#1C1C1CB2"
                fontWeight="normal"
                fontSize={{ base: 14, md: 16 }}
                fontFamily="LatoRegular"
              >
                {item.description}
              </Text>
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* -------- Speaker’s Highlights Slider -------- */}
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text
          color="#202020"
          fontWeight={"medium"}
          fontSize={{ base: 14, md: 16 }}
          fontFamily="LatoRegular"
        >
          Speaker’s Highlights
        </Text>
        <HStack gap={2}>
          <IconButton
            bg="#fff"
            border="1px solid #9E9E9E"
            rounded={20}
            aria-label="Prev"
            size={"xs"}
            onClick={handleSpeakerPrev}
          >
            <IoIosArrowBack color="#9E9E9E" />
          </IconButton>
          <IconButton
            bg="#fff"
            border="1px solid #9E9E9E"
            rounded={20}
            aria-label="Next"
            size={"xs"}
            onClick={handleSpeakerNext}
          >
            <IoIosArrowForward color="#9E9E9E" />
          </IconButton>
        </HStack>
      </Flex>

      <Flex overflow="hidden" my={2}>
        <Flex
          ref={speakerRef}
          transform={`translateX(-${
            (speakerIndex * (100 / visibleSpeakerCards)) %
            (100 * (cardData.length / visibleSpeakerCards))
          }%)`}
          transition="transform 0.5s ease-in-out"
        >
          {speakerSlides.map((card, idx) => (
            <Box key={idx} flex={`0 0 ${80 / visibleSpeakerCards}%`} p={2}>
              <Box
                bg="white"
                p={5}
                border="1px solid #080F340F"
                rounded={20}
                h="100%"
              >
                <HStack>
                  <Image
                    src={card.subimage}
                    alt="Speaker"
                    boxSize="40px"
                    rounded="full"
                  />
                  <Stack spacing={0}>
                    <Text
                      color="#202020"
                      fontSize={{ base: 10, md: 12 }}
                      fontFamily="InterMedium"
                    >
                      The Lounge Team
                    </Text>
                    <Text
                      color="#202020"
                      mt={-1}
                      fontSize={{ base: 9, md: 11 }}
                    >
                      {card.date}
                    </Text>
                  </Stack>
                </HStack>
                <Text
                  mt={1}
                  mb={-3}
                  fontFamily="InterRegular"
                  fontWeight={"normal"}
                  fontSize={{ base: 12, md: 14 }}
                  color="#333333E5"
                  // maxW={{ base: 167, md: 267 }}
                >
                  {/* {card.title || "Highlight details..."} */}
                  Served over 10 years in the finance industry analysing
                  international markets & economics.
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* -------- Session Slider -------- */}
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text
          color="#202020"
          fontWeight={"medium"}
          fontSize={{ base: 14, md: 16 }}
          fontFamily="LatoRegular"
        >
          Session
        </Text>
        <HStack gap={2}>
          <IconButton
            bg="#fff"
            border="1px solid #9E9E9E"
            rounded={20}
            aria-label="Prev"
            size={"xs"}
            onClick={handleSessionPrev}
          >
            <IoIosArrowBack color="#9E9E9E" />
          </IconButton>
          <IconButton
            bg="#fff"
            border="1px solid #9E9E9E"
            rounded={20}
            aria-label="Next"
            size={"xs"}
            onClick={handleSessionNext}
          >
            <IoIosArrowForward color="#9E9E9E" />
          </IconButton>
        </HStack>
      </Flex>

      <Flex overflow="hidden" my={5}>
        <Flex
          ref={sessionRef}
          transform={`translateX(-${
            (sessionIndex * (100 / visibleSessionCards)) %
            (100 * (cardData.length / visibleSessionCards))
          }%)`}
          transition="transform 0.5s ease-in-out"
        >
          {sessionSlides.map((card, idx) => (
            <Box
              key={idx}
              overflow={"hidden"}
              border="1px solid #080F340F"
              rounded={20}
              h="100%"
              mr={5}
              flex={`0 0 ${58 / visibleSessionCards}%`}
            >
              <Stack pt={5} pb={2} px={5} roundedTop={20} bg={"#2B362F"}>
                <Text
                  fontFamily="InterSemiBold"
                  fontSize={{ base: 17, md: 20 }}
                  color={"#fff"}
                >
                  Session 2
                </Text>
              </Stack>
              <Box
                bg="white"
                pt={2}
                pb={2}
                px={5}
                borderBottom={"2px solid #E8E8E8"}
              >
                <Text
                  fontFamily="LatoRegular"
                  fontSize={{ base: 13, md: 15 }}
                  fontWeight={"normal"}
                  color={"#10192899/80"}
                >
                  This session explores the meaning of capital markets, the
                  definition of debt and equities and their various forms.
                </Text>
              </Box>
              <Flex bg="white" pt={3} pl={4}>
                <Text
                  fontSize={{ base: 12, md: 14 }}
                  fontWeight={"bold"}
                  fontFamily="InterMedium"
                >
                  Friday, 6 July
                </Text>
                <Text
                  fontFamily="InterRegular"
                  display={"flex"}
                  fontSize={{ base: 12, md: 13 }}
                  color={"#475367"}
                  gap={2}
                  ml={3}
                  alignItems={"center"}
                >
                  <CiClock2 color="#667185" /> 11.30 - 12.00 (30 min)
                </Text>
              </Flex>
              <Box p={5} bg="white">
                <HStack>
                  <Stack position={"relative"}>
                    <Image
                      src={card.subimage}
                      alt="Speaker"
                      boxSize="40px"
                      rounded="full"
                    />
                    <Image
                      src={tick}
                      alt="tick"
                      w={"16px"}
                      position={"absolute"}
                      bottom={"0"}
                      right={"-1"}
                      borderRadius="md"
                      objectFit="cover"
                    />
                  </Stack>

                  <Stack spacing={0}>
                    <Text
                      color="#202020"
                      fontSize={{ base: 10, md: 12 }}
                      fontFamily="InterMedium"
                    >
                      The Lounge Team
                    </Text>
                    <Text
                      color="#475367B2/70"
                      mt={-1}
                      fontFamily={"LatoRegular"}
                      fontWeight={"normal"}
                      fontSize={{ base: 9, md: 11 }}
                    >
                      General Practitioner
                    </Text>
                  </Stack>
                </HStack>
                {/* <Text
                  mt={3}
                  fontFamily="InterRegular"
                  fontWeight={"normal"}
                  fontSize={{ base: 12, md: 14 }}
                  color="#333333E5"
                >
                  {card.title || "Highlight details..."}
                </Text> */}
              </Box>
              <Box bg="white" borderTop={"1px solid #E8E8E8"} py={2}>
                <Image pl={4} src={file} alt="Speaker" w={110} rounded="full" />
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

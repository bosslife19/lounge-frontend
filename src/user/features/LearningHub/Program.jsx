import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import tick from "../../../assets/check.png";
import file from "../../../assets/fileattach.png";
import axiosClient from "../../../axiosClient";
import { formattedDate } from "../../../lib/formatDate";
import { formatTimeToString } from "../../../lib/formatTimeTostring";
import { useNavigate, useParams } from "react-router-dom";

export const Program = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [newsData, setNewsData] = useState([]);
  const [currentNews, setCurrentNews] = useState(null);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [speakerIndex, setSpeakerIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);

  const currentSessions = currentNews?.sections || [];
  const currentSpeakers = currentNews?.speaker_highlights || [];
  const itemsPerSlide = 3; // 👈 show 3 speakers per slide

  // ---------- Fetch single program ----------
  useEffect(() => {
    const getProgram = async () => {
      const res = await axiosClient.get("/programs/" + id);
      setCurrentNews(res.data.program);
    };
    getProgram();
  }, [id]);

  // ---------- Fetch all programs ----------
  useEffect(() => {
    const getPrograms = async () => {
      const res = await axiosClient.get("/programs");
      setNewsData(res.data.programs);
    };
    getPrograms();
  }, [refresh]);

  // ---------- Handlers ----------
  const handleSpeakerNext = () => {
    if (speakerIndex + itemsPerSlide < currentSpeakers.length) {
      setSpeakerIndex((prev) => prev + itemsPerSlide);
    }
  };

  const handleSpeakerPrev = () => {
    if (speakerIndex - itemsPerSlide >= 0) {
      setSpeakerIndex((prev) => prev - itemsPerSlide);
    }
  };

  const handleSessionPrev = () =>
    setSessionIndex((prev) =>
      prev <= 0 ? currentSessions.length - 1 : prev - 1
    );
  const handleSessionNext = () =>
    setSessionIndex((prev) =>
      prev >= currentSessions.length - 1 ? 0 : prev + 1
    );

  return (
    <Box h="100%" mb="10%" px={{ base: 1, md: 5 }}>
      {/* ---------- Back Button ---------- */}
      <Heading
        fontSize={{ base: "13px", md: "24px" }}
        display="flex"
        pt={4}
        gap={2}
        alignItems="center"
        cursor="pointer"
        onClick={() => navigate(-1)}
      >
        <IconButton
          aria-label="Previous"
          rounded="full"
          bg="white"
          border="1px solid #9E9E9E"
          _hover={{ bg: "whiteAlpha.500" }}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(-1);
          }}
        >
          <IoIosArrowBack color="#9E9E9E" />
        </IconButton>
        Back
      </Heading>

      {/* ---------- Program Info ---------- */}
      {currentNews && (
        <Box
          key={currentNews.id}
          minW="100%"
          position="relative"
          h="auto"
          overflow="visible"
          bg="white"
          p={{ base: 3, md: 10 }}
          border="1px solid #080F340F"
          rounded={{ base: 10, md: 20 }}
          my={{ base: 2, md: 5 }}
        >
          <Heading
            whiteSpace="normal"
            wordBreak="break-word"
            color="#202020"
            fontWeight="bold"
            fontSize={{ base: "14px", md: 24 }}
            fontFamily="LatoBold"
          >
            {currentNews.title}
          </Heading>
          <Text
            mt={{ base: 0, md: 3 }}
            flexWrap="wrap"
            wordBreak="break-word"
            whiteSpace="normal"
            color="#1C1C1CB2"
            fontWeight="medium"
            fontSize={{ base: "11px", md: 16 }}
            fontFamily="LatoRegular"
          >
            {currentNews.content}
          </Text>
        </Box>
      )}

      {/* ---------- Speaker Highlights ---------- */}
      {currentSpeakers.length > 0 && (
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <Text
              color="#202020"
              fontWeight="medium"
              fontSize={{ base: "14px", md: 16 }}
              fontFamily="LatoRegular"
            >
              Speaker’s Highlights
            </Text>
            <HStack gap={2}>
              <IconButton
                bg="#fff"
                border="1px solid #9E9E9E"
                rounded={20}
                size={{ base: "10", md: "sm" }}
                aria-label="Prev"
                onClick={handleSpeakerPrev}
              >
                <IoIosArrowBack color="#9E9E9E" />
              </IconButton>
              <IconButton
                bg="#fff"
                border="1px solid #9E9E9E"
                rounded={20}
                size={{ base: "10", md: "sm" }}
                aria-label="Next"
                onClick={handleSpeakerNext}
              >
                <IoIosArrowForward color="#9E9E9E" />
              </IconButton>
            </HStack>
          </Flex>

          <Flex overflow="hidden" my={{ base: 3, md: 5 }}>
            {currentSpeakers.length > 0 ? (
              <Flex
                gap={4}
                w="100%"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                {currentSpeakers
                  .slice(speakerIndex, speakerIndex + itemsPerSlide)
                  .map((speaker, idx) => (
                    <Box
                      key={`${speaker.id}-${idx}`}
                      flex={{ base: "1 1 100%", md: "1 1 calc(33.333% - 1rem)" }}
                      bg="white"
                      p={5}
                      border="1px solid #080F340F"
                      rounded={{ base: 8, md: 20 }}
                      position="relative"
                      boxShadow="sm"
                    >
                      <HStack>
                        <Image
                          src={
                            speaker?.speaker_image ||
                            "https://www.w3schools.com/howto/img_avatar.png"
                          }
                          alt="Speaker"
                          boxSize={{ base: "25px", md: "40px" }}
                          rounded="full"
                          objectFit="cover"
                        />
                        <Stack spacing={0}>
                          <Text
                            color="#202020"
                            fontSize={{ base: "10px", md: 12 }}
                            fontFamily="InterMedium"
                          >
                            {speaker?.speaker_name}
                          </Text>
                          <Text
                            color="#808291"
                            mt={-1}
                            fontSize={{ base: "9px", md: 11 }}
                          >
                            {formattedDate(speaker?.created_at)}
                          </Text>
                        </Stack>
                      </HStack>

                      <Text
                        mt={3}
                        fontFamily="InterRegular"
                        fontWeight="normal"
                        fontSize={{ base: "11px", md: 14 }}
                        color="#333333E5"
                        noOfLines={4}
                      >
                        {speaker?.highlight}
                      </Text>
                    </Box>
                  ))}
              </Flex>
            ) : (
              <Text textAlign="center" w="100%">
                No Speaker Highlights yet
              </Text>
            )}
          </Flex>
        </>
      )}

      {/* ---------- Session Section ---------- */}
      {currentSessions.length > 0 && (
        <>
          <Flex alignItems="center" justifyContent="space-between">
            <Text
              color="#202020"
              fontWeight="medium"
              fontSize={{ base: "14px", md: 16 }}
              fontFamily="LatoRegular"
            >
              Session
            </Text>
            <HStack gap={2}>
              <IconButton
                bg="#fff"
                border="1px solid #9E9E9E"
                rounded={20}
                size={{ base: "10", md: "sm" }}
                aria-label="Prev"
                onClick={handleSessionPrev}
              >
                <IoIosArrowBack color="#9E9E9E" />
              </IconButton>
              <IconButton
                bg="#fff"
                border="1px solid #9E9E9E"
                rounded={20}
                size={{ base: "10", md: "sm" }}
                aria-label="Next"
                onClick={handleSessionNext}
              >
                <IoIosArrowForward color="#9E9E9E" />
              </IconButton>
            </HStack>
          </Flex>

          <Flex overflow="hidden" my={5}>
            <Box
              overflow="hidden"
              border="1px solid #080F340F"
              rounded={20}
              h="100%"
              mr={{ base: 1, md: 5 }}
              flex="1"
            >
              <Stack
                position="relative"
                p={{ base: 3, md: 5 }}
                roundedTop={{ base: 5, md: 20 }}
                bg="#000"
              >
                <Text
                  fontFamily="InterBold"
                  fontSize={{ base: "14px", md: 20 }}
                  color="#fff"
                >
                  {currentSessions[sessionIndex]?.title}
                </Text>
              </Stack>

              <Box
                bg="white"
                p={{ base: 3, md: 5 }}
                borderBottom="2px solid #E8E8E8"
              >
                <Text
                  fontFamily="LatoRegular"
                  fontSize={{ base: "11px", md: 16 }}
                  color="#10192899"
                >
                  {currentSessions[sessionIndex]?.description}
                </Text>
              </Box>

              <Flex bg="white" pt={3} pl={4}>
                <Text
                  fontSize={{ base: "11px", md: 14 }}
                  fontWeight="bold"
                  fontFamily="InterMedium"
                >
                  {formattedDate(currentSessions[sessionIndex]?.date)}
                </Text>
                <Text
                  fontFamily="InterRegular"
                  display="flex"
                  fontSize={{ base: "11px", md: 14 }}
                  color="#475367"
                  gap={2}
                  alignItems="center"
                >
                  <CiClock2 />{" "}
                  {formatTimeToString(currentSessions[sessionIndex]?.time)}
                </Text>
              </Flex>

              <Box mt={{ base: -3, md: 0 }} p={5} bg="white">
                <HStack>
                  <Stack position="relative">
                    <Image
                      src={
                        currentSessions[sessionIndex]?.speaker?.image ||
                        "https://www.w3schools.com/howto/img_avatar.png"
                      }
                      alt="Speaker"
                      boxSize={{ base: "30px", md: "40px" }}
                      rounded="full"
                    />
                    <Image
                      src={tick}
                      alt="tick"
                      w={{ base: 3, md: 4 }}
                      position="absolute"
                      bottom="0"
                      right="-1"
                      borderRadius="md"
                      objectFit="cover"
                    />
                  </Stack>
                  <Stack spacing={0}>
                    <Text
                      color="#202020"
                      fontSize={{ base: "10px", md: 12 }}
                      fontFamily="InterMedium"
                    >
                      {currentSessions[sessionIndex]?.speaker?.name ||
                        "The Lounge Team"}
                    </Text>
                    <Text
                      color="#202020"
                      mt={{ base: -2, md: -1 }}
                      fontSize={{ base: "9px", md: 11 }}
                    >
                      {formattedDate(
                        currentSessions[sessionIndex]?.created_at
                      )}
                    </Text>
                  </Stack>
                </HStack>
              </Box>

              <Box bg="white" pb={2}>
                <a href={currentSessions[sessionIndex]?.video_link}>
                  <Image
                    pl={4}
                    src={file}
                    alt="file"
                    w={{ base: "80px", md: 110 }}
                    rounded="full"
                  />
                </a>
              </Box>
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
};

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
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import tick from "../../../assets/check.png";
import file from "../../../assets/fileattach.png";
// import { RiPencilLine } from 'react-icons/ri'

import axiosClient from "../../../axiosClient";
import { formattedDate } from "../../../lib/formatDate";

import { formatTimeToString } from "../../../lib/formatTimeTostring";
import { useParams } from "react-router-dom";
// import { CreateSpeakerHighlight } from './Modal/CreateSpeakerHighlight'

export const Program = () => {
  // ---------- News Data (will come from backend) ----------
   const { id } = useParams();

  const [newsData, setNewsData] = useState([
    {
      id: 1,
      title: "Corporate Finance & Capital Markets Program",
      description:
        "The is also known as the Roseline Etuokwu Sigma Secondary School Quiz Competition ...",
      sessions: [
        {
          id: 1,
          title: "Capital Market Basics",
          description: "This session explores debt and equities...",
          date: "Friday, 6 July",
          time: "11.30 - 12.00 (30 min)",
          speaker: { name: "The Lounge Team", date: "2025-07-06", image: tick },
        },
      ],
      speakers: [
        {
          id: 1,
          name: "John Doe",
          date: "2025-07-06",
          image: tick,
          highlight: "Highlight for John Doe...",
        },
      ],
    },
    {
      id: 2,
      title: "Entrepreneurship & Innovation Program",
      description:
        "This program empowers young entrepreneurs by providing resources...",
      sessions: [
        {
          id: 2,
          title: "Startup Funding",
          description: "Explore ways to raise funding for startups...",
          date: "Monday, 10 July",
          time: "10.00 - 11.00 (1 hr)",
          speaker: { name: "Jane Smith", date: "2025-07-10", image: tick },
        },
      ],
      speakers: [
        {
          id: 2,
          name: "Jane Smith",
          date: "2025-07-10",
          image: tick,
          highlight: "Highlight for Jane Smith...",
        },
      ],
    },
  ]);
  const [spOpen, setSpOpen] = useState(false);

  const closeSpOpen = () => {
    setSpOpen(false);
  };

  // ---------- State ----------
  const [newsIndex, setNewsIndex] = useState(0);
  // const currentNews = newsData[newsIndex] || {};
  const [currentNews, setCurrentNews] = useState(null)
// let currentNews;
  const currentSessions = currentNews?.sections || [];
  const currentSpeakers = currentNews?.speaker_highlights || [];
  const [refresh, setRefresh] = useState(false);

  const [sessionIndex, setSessionIndex] = useState(0);
  const [speakerIndex, setSpeakerIndex] = useState(0);
// const [program, setProgram] = useState(null)
  // Reset sessions/speakers when news changes
  useEffect(() => {
    setSessionIndex(0);
    setSpeakerIndex(0);
  }, [newsIndex]);

  // ---------- Modals ----------
  const [isOpened, setIsOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpens, setIsOpens] = useState(false);
  const [isOpenin, setIsOpenin] = useState(false);
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  // ---------- Handlers ----------
  const handleNewsPrev = () =>
    setNewsIndex((prev) => (prev <= 0 ? newsData.length - 1 : prev - 1));
  const handleNewsNext = () =>
    setNewsIndex((prev) => (prev >= newsData.length - 1 ? 0 : prev + 1));

  const handleSpeakerPrev = () =>
    setSpeakerIndex((prev) =>
      prev <= 0 ? currentSpeakers.length - 1 : prev - 1
    );
  const handleSpeakerNext = () =>
    setSpeakerIndex((prev) =>
      prev >= currentSpeakers.length - 1 ? 0 : prev + 1
    );

  const handleSessionPrev = () =>
    setSessionIndex((prev) =>
      prev <= 0 ? currentSessions.length - 1 : prev - 1
    );
  const handleSessionNext = () =>
    setSessionIndex((prev) =>
      prev >= currentSessions.length - 1 ? 0 : prev + 1
    );

    useEffect(()=>{
      const getProgram = async()=>{
        const res = await axiosClient.get('/programs/' + id);
        // setProgram(res.data.program);

     setCurrentNews(res.data.program)
      }
      getProgram();
    }, []);

  useEffect(() => {
    const getPrograms = async () => {
      const res = await axiosClient.get("/programs");

      setNewsData(res.data.programs);
    };
    getPrograms();
  }, [refresh]);

  return (
    <Box h={"100%"} mb={"10%"} px={{ base: 1, md: 5 }}>
      {/* ---------- News Section ---------- */}

      {/* <Flex alignItems={"center"} justifyContent={"space-between"}>
        <HStack w={"100%"} justifyContent={"flex-end"} gap={2}>
          <IconButton
            bg="#fff"
            border="1px solid #9E9E9E"
            rounded={20}
            size={{ base: "10", md: "sm" }}
            aria-label="Prev"
            onClick={handleNewsPrev}
          >
            <IoIosArrowBack color="#9E9E9E" />
          </IconButton>
          <IconButton
            bg="#fff"
            border="1px solid #9E9E9E"
            rounded={20}
            aria-label="Next"
            size={{ base: "10", md: "sm" }}
            onClick={handleNewsNext}
          >
            <IoIosArrowForward color="#9E9E9E" />
          </IconButton>
        </HStack>
      </Flex> */}

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
            flexWrap={"wrap"}
            wordBreak="break-word"
            whiteSpace="normal"
            color="#1C1C1CB2"
            fontWeight="medium"
            fontSize={{ base: "11px", md: 16 }}
            fontFamily="LatoRegular"
          >
            {currentNews.content}
          </Text>
          {/* <Button
            position={'absolute'}
            top={0}
            bg={'transparent'}
            color={'#212121'}
            right={0}
            onClick={() => setIsOpened(true)}
          >
            <RiPencilLine />
          </Button> */}
        </Box>
      )}

      {/* ---------- Speaker Slider ---------- */}
       {currentSpeakers.length > 0 && (
        <>
         <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          {/* <Button bg={'transparent'} color={'#212121'} onClick={() => setIsOpens(true)}>
            <RiPencilLine />
          </Button> */}
          <Text
            color="#202020"
            fontWeight={"medium"}
            fontSize={{ base: "14px", md: 16 }}
            fontFamily="LatoRegular"
          >
            Speaker’s Highlights
          </Text>
        </Flex>
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
       
          <Box flex="1">
            <Box
              position={"relative"}
              bg="white"
              p={{ base: 3, md: 5 }}
              border="1px solid #080F340F"
              rounded={20}
              h="100%"
            >
              <HStack>
                <Image
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Speaker"
                  boxSize={{ base: "30px", md: "40px" }}
                  rounded="full"
                />
                <Stack spacing={0}>
                  <Text
                    color="#202020"
                    fontSize={{ base: "10px", md: 12 }}
                    fontFamily="InterMedium"
                  >
                    {currentSpeakers[speakerIndex]?.speaker_name}
                  </Text>
                  <Text
                    color="#202020"
                    mt={{ base: -2, md: -1 }}
                    fontSize={{ base: " 9px", md: 11 }}
                  >
                    {formattedDate(currentSpeakers[speakerIndex]?.created_at)}
                  </Text>
                </Stack>
              </HStack>
              <Text
                mt={3}
                fontFamily="InterRegular"
                fontWeight={"normal"}
                fontSize={{ base: "10px", md: 14 }}
                color="#333333E5"
              >
                {currentSpeakers[speakerIndex]?.highlight}
              </Text>
              {/* <Button
                position={'absolute'}
                top={0}
                bg={'transparent'}
                color={'#212121'}
                right={0}
                onClick={() => setIsOpen(true)}
              >
                <RiPencilLine />
              </Button> */}
            </Box>
          </Box>
       
      </Flex>
        </>
       )}

     

      {/* ---------- Session Slider ---------- */}
              {currentSessions.length > 0 &&(
                <>
                 <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text
          color="#202020"
          fontWeight={"medium"}
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
            overflow={"hidden"}
            border="1px solid #080F340F"
            rounded={20}
            h="100%"
            mr={{ base: 1, md: 5 }}
            flex="1"
          >
            <Stack
              position={"relative"}
              p={{ base: 3, md: 5 }}
              roundedTop={{ base: 5, md: 20 }}
              bg={"#000"}
            >
              <Text
                fontFamily="InterBold"
                fontSize={{ base: "14px", md: 20 }}
                color={"#fff"}
              >
                {currentSessions[sessionIndex]?.title}
              </Text>
              {/* <Button
                position={'absolute'}
                top={0}
                bg={'transparent'}
                color={'#212121'}
                right={0}
                onClick={() => setIsOpenin(true)}
              >
                <RiPencilLine color={'#fff'} />
              </Button> */}
            </Stack>
            <Box
              bg="white"
              p={{ base: 3, md: 5 }}
              borderBottom={"2px solid #E8E8E8"}
            >
              <Text
                fontFamily="LatoRegular"
                fontSize={{ base: "11px", md: 16 }}
                color={"#10192899"}
              >
                {currentSessions[sessionIndex]?.description}
              </Text>
            </Box>
            <Flex bg="white" pt={3} pl={4}>
              <Text
                fontSize={{ base: "11px", md: 14 }}
                fontWeight={"bold"}
                fontFamily="InterMedium"
              >
                {formattedDate(currentSessions[sessionIndex]?.date)}
              </Text>
              <Text
                fontFamily="InterRegular"
                display={"flex"}
                fontSize={{ base: "11px", md: 14 }}
                color={"#475367"}
                gap={2}
                alignItems={"center"}
              >
                <CiClock2 />{" "}
                {formatTimeToString(currentSessions[sessionIndex]?.time)}
              </Text>
            </Flex>
            <Box mt={{ base: -3, md: 0 }} p={5} bg="white">
              <HStack>
                <Stack position={"relative"}>
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
                    fontSize={{ base: "10px", md: 12 }}
                    fontFamily="InterMedium"
                  >
                    {/* {currentSessions[sessionIndex]?.speaker?.name} */}
                    The Lounge Team
                  </Text>
                  <Text
                    color="#202020"
                    mt={{ base: -2, md: -1 }}
                    fontSize={{ base: "9px", md: 11 }}
                  >
                    {formattedDate(currentSessions[sessionIndex]?.created_at)}
                  </Text>
                </Stack>
              </HStack>
            </Box>
            <Box bg="white" pb={2}>
              <a href={currentSessions[sessionIndex]?.video_link}>
                {" "}
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
              ) }

     

      {/* ---------- Modals ---------- */}
      {/* <EditProgram isOpen={isOpened} onClose={() => setIsOpened(false)} />
      <EditSpeakerHeader isOpen={isOpens} onClose={() => setIsOpens(false)} />
      <EditSpeakerHighlight isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <EditSession isOpen={isOpenin} onClose={() => setIsOpenin(false)} />
      <CreateProgram onClose={closeModal} open={open} setNewsData={setNewsData}/> */}
      {/* <CreateSpeakerHighlight onClose={closeSpOpen} isOpen={spOpen} refresh={()=>setRefresh(prev=>!prev)} programId={currentNews.id}/> */}
    </Box>
  );
};

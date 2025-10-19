import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  HStack,
  SimpleGrid,
  InputGroup,
  Input,
  AspectRatio,
} from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import axiosClient from "../../../axiosClient";
import { formatTime } from "../../../lib/formatTime";
import { userAvatar } from "../setting/posts/Posts";
import ReactPlayer from "react-player";
import { getVideoThumbnail } from "../../../utlis/ResponsiveText";

export const VideosPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      const res = await axiosClient.get("/get-videos");
      setVideos(res.data.videos);
    };
    getVideos();
  }, []);
  useEffect(() => {
    if (search) {
      const lowerSearch = search.toLowerCase();
      const results = videos?.filter((item) =>
        [item.title, item.video_link]
          .filter(Boolean) // removes null/undefined
          .some((field) => field.toLowerCase().includes(lowerSearch))
      );
      setFilteredResults(results);
    } else {
      setFilteredResults(videos); // if no search, show all
    }
  }, [search, videos]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  return (
    <Box px={4} py={6}>
      {/* Search Input */}
      <InputGroup
        w={{ base: "100%", md: 300 }}
        mt={{ base: -7, md: -5 }}
        mb={5}
        startElement={<CiSearch size={15} />}
      >
        <Input
          py={15}
          fontSize={10}
          borderRadius={10}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {/* Video Grid */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} gap={7}>
        {filteredResults.length > 0 &&
          filteredResults.map((card, idx) => (
            <Box
              key={`${card.id}-${idx}`}
              cursor="pointer"
              p={2}
              bg="#fff"
              border="1px solid #080F340F"
              className="rounded-2xl relative"
            >
                           <AspectRatio ratio={3 / 2} w="100%">
                            <Image
                roundedTop={10}
                src={card.thumbnail || getVideoThumbnail(card.video_link)}
                alt={card.title}
                // h={{ base: "100px", md: "200px" }}
                // className="w-full h-30 object-cover"
                className="object-cover"
              />
                           
                            </AspectRatio>
             

              {/* Play Button Overlay */}
              <button
                onClick={() => handleCardClick(card)}
                style={{
                  position: "absolute",
                  top: "35%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "red",
                  color: "white",
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 6px 12px rgba(0,0,0,0.25)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform =
                    "translate(-50%, -50%) scale(1.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform =
                    "translate(-50%, -50%) scale(1)")
                }
              >
                ▶
              </button>

              {/* Card Title */}
              <Box pt={2} px={2}>
                <Text
                  fontSize={{ base: "11px", md: 14 }}
                  className="font-semibold"
                >
                  {card.title}
                </Text>
              </Box>

              {/* Footer Info */}
              <HStack
                pt={4}
                pb={2}
                spacing={4}
                align="center"
                justifyContent="space-between"
                px={2}
              >
                <HStack>
                  <Stack position="relative">
                    <Image
                      src={userAvatar}
                      alt="Update"
                      boxSize={{ base: "20px", md: "30px" }}
                      rounded="full"
                    />
                  </Stack>
                  <Stack spacing={0}>
                    <Text
                      color="#202020"
                      fontSize={{ base: 8, md: 12 }}
                      fontFamily="InterMedium"
                    >
                      The Lounge Team
                    </Text>
                    <Text
                      color="#202020"
                      mt={-2}
                      fontSize={{ base: 8, md: 11 }}
                    >
                      {formatTime(card.created_at)}
                    </Text>
                  </Stack>
                </HStack>
                <MdKeyboardArrowRight />
              </HStack>
            </Box>
          ))}
        {videos.length === 0 && <Text textAlign={"center"}>No Videos yet</Text>}
      </SimpleGrid>

      {/* Custom Modal */}
      {isOpen && selectedCard && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "80%",

              maxWidth: "900px",
              background: "transparent",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0px 8px 25px rgba(0,0,0,0.5)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                zIndex: 10000,
                top: "15px", // inside modal
                right: "15px", // inside modal
                backgroundColor: "rgba(0,0,0,0.6)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                color: "white",
                fontSize: "22px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            {/* Video Player */}
            <ReactPlayer
              src={selectedCard.video_link}
              playing
              controls
              width="100%"
              height="70vh"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "black",
              }}
            />
          </div>
        </div>
      )}
    </Box>
  );
};

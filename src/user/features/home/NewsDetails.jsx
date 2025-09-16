import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Stack,
  HStack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { cardData } from "../../../hooks/useData";
import btns from "../../../assets/btn.svg";
import { useEffect, useState } from "react";
import { formatTime } from "../../../lib/formatTime";
import axiosClient from "../../../axiosClient";

const NewsDetails = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const profile = cardData.find((item) => item.id === Number(id));

  const [moreNews, setMoreNews] = useState([]);

  const [update, setUpdate] = useState(null);
  useEffect(() => {
    const getMoreNews = async () => {
      const res = await axiosClient.get("/updates");

      const same = res.data.articles.filter((item) => item.id == id);
      setUpdate(same[0]);
      setMoreNews(res.data.articles);
    };
    getMoreNews();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!profile) {
    return <Text>Profile not found</Text>;
  }

  return (
    <Flex
      // bg={"#FAFAFA"}
      flexDirection={{ base: "column", md: "row" }}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
    >
      <Box w={{ base: "100%", md: "80%" }} mb={"auto"} mx="auto" px={6}>
        {/* Back Button */}
        <Flex alignItems={"center"} gap={2}>
          <Button
            size={"xs"}
            rounded={30}
            p={0}
            m={0}
            variant="outline"
            mb={4}
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack />
          </Button>
          <Text
            fontWeight={"normal"}
            mt={-3}
            fontFamily={"InterMedium"}
            fontSize={{ base: 13, md: 15 }}
          >
            News & Updates
          </Text>
        </Flex>
        {/* Profile Info */}
        <Stack
          bg={"#FAFAFA"}
          shadow={"lg"}
          px={4}
          spacing={4}
          rounded={20}
          mb={4}
        >
          <Text
            fontWeight="medium"
            fontFamily="LatoMedium"
            textTransform={"capitalize"}
            fontSize={{ base: 18, md: 24 }}
            color={"#202020"}
          >
            {update?.title}
          </Text>
          <Box position={"relative"}>
            <Image
              src={update?.image}
              alt={update?.title}
              w="100%"
              h={{ base: "150px", md: "200px" }}
              objectFit="cover"
              objectPosition={"center"}
              rounded={12}
              // overflow={"hidden"}
              mb={6}
            />
            <button className=" absolute cursor-pointer top-5 right-6">
              <Image
                roundedTop={10}
                src={btns}
                boxSize={"35px"}
                alt={"title"}
                objectFit={"cover"}
                className="w-full   "
              />
            </button>
          </Box>
          <Stack mt={-5} spacing={0}>
            <Text
              fontFamily="LatoRegular"
              fontSize={{ base: 14, md: 16 }}
              color={"#1C1C1CB2/70"}
            >
              {update?.content}
            </Text>
          </Stack>
          <HStack
            // px={6}
            pt={4}
            pb={2}
            spacing={4}
            align="flex-start"
          >
            <Stack position={"relative"}>
              <Image
                src={profile.subimage}
                alt="Update"
                boxSize="30px"
                rounded={20}
                // objectFit="cover"
              />
            </Stack>
            <Stack>
              <Text
                color={"#202020"}
                fontSize={{ base: 8, md: 10 }}
                fontFamily="InterMedium"
              >
                The Lounge Team
              </Text>
              <Text color={"#202020"} fontSize={{ base: 8, md: 10 }} mt={"-2"}>
                {formatTime(update?.created_at)}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      </Box>
      {/* small cards */}
      <Box
        // shadow={"lg"}
        border={"1px solid #080F340F/90"}
        shadowColor={"#080F340F"}
        w={{ base: "100%", md: "30%" }}
        p={3}
        bg={"#FFFFFF/90"}
        className="pb={4}"
      >
        <Text
          pl={4}
          pt={3}
          mb={-2}
          fontSize={{ base: 15, md: 22 }}
          fontFamily={"LatoBold"}
          color={"#101928"}
          fontWeight={"semibold"}
        >
          More News & Updates
        </Text>
        <Box>
          {moreNews.length > 0 &&
            moreNews.map((card, idx) => (
              <Box
                key={`${card.id}-${idx}`}
                flexShrink={0}
                px={4}
                pt={4}
                m={3}
                cursor={"pointer"}
                className="bg-white   rounded-2xl shadow-lg relative"
                onClick={() => setUpdate(card)}
              >
                <Image
                  rounded={12}
                  src={card.image}
                  alt={card.title}
                  h={113}
                  className="w-full  object-cover"
                />
                <button className="absolute cursor-pointer top-6 right-6">
                  <Image
                    roundedTop={10}
                    src={btns}
                    alt={card.title}
                    className="w-full h-40 object-cover"
                  />
                </button>
                <Box pt={2}>
                  <Text
                    fontFamily="LatoMedium"
                    textTransform={"capitalize"}
                    fontSize={{ base: 12, md: 14 }}
                    lineHeight={-2}
                    className="font-semibold"
                  >
                    {card.title}
                  </Text>
                </Box>
                <HStack
                  // px={6}
                  pt={4}
                  pb={2}
                  spacing={4}
                  align="flex-start"
                >
                  <Stack position={"relative"}>
                    <Image
                      src={profile.subimage}
                      alt="Update"
                      boxSize="24px"
                      rounded={50}
                      // objectFit="cover"
                    />
                  </Stack>
                  <Stack>
                    <Text
                      color={"#202020"}
                      fontSize={{ base: 8, md: 10 }}
                      fontFamily="InterMedium"
                    >
                      The Lounge Team
                    </Text>
                    <Text
                      color={"#202020"}
                      fontSize={{ base: 8, md: 10 }}
                      mt={"-2"}
                    >
                      {formatTime(card.created_at)}
                    </Text>
                  </Stack>
                </HStack>
              </Box>
            ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default NewsDetails;

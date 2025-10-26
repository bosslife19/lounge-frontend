import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Stack,
  HStack,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { cardData } from "../../../hooks/useData";
import logo from "../../../assets/userImage.jpg";
import btns from "../../../assets/btn.svg";
import { useContext, useEffect, useState } from "react";
import { Card } from "./RightSide/Card";
import MentorsBoxPage from "./RightSide/mentorsCard";
import axiosClient from "../../../axiosClient";
import { formatTime } from "../../../lib/formatTime";

import { AuthContext } from "../../../context/AuthContext";
import Avatar from "../../components/header/Avatar";
import { FaCog } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";

const PostHistory = () => {
  const navigate = useNavigate();
  const [histories, setHistories] = useState([]);
  const { userDetails } = useContext(AuthContext);

  useEffect(() => {
    const getHistories = async () => {
      const res = await axiosClient.get(`/points-histories/${userDetails.id}`);

      setHistories(res.data.histories);
    };
    getHistories();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const dropdownOptions = [
    // {
    //   text: "Change Image",
    //   icon: FaImage,
    //   handler: () => fileInputRef.current?.click(),
    // },
    {
      text: "Settings",
      icon: FaCog,
      handler: () => navigate("/settings"),
    },
    {
      text: "Logout",
      icon: HiOutlineLogout,
      color: "text-red-500",
      handler: () => {
        // localStorage.clear();
        navigate("/logout");
      },
    },
  ];

  return (
    <Box pb={4}>
      <HStack>
        <Heading
          pl={5}
          fontSize={{ base: "13px", md: "24px" }}
          display={"flex"}
          pb={4}
          gap={2}
          alignItems={"center"}
        >
          {/* <IconButton
                aria-label="Previous"
                rounded="full"
                bg="white"
                border={"1px solid #9E9E9E"}
                _hover={{ bg: "whiteAlpha.500" }}
                size="sm"
              >
                <IoIosArrowBack color="#9E9E9E" />
              </IconButton> */}
          Points History
        </Heading>
        <Box
          display={{ base: "none", xl: "flex" }}
          className="border-l-2 pl-4"
          pb={6}
          ml={"auto"}
          justifyContent={"center"}
          // bg={"#000"}
          pr={"2%"}
          pt={1}
        >
          {/* <button onClick={() => toggleDropdown("avatar")}> */}
          <Avatar options={dropdownOptions} />
          {/* </button> */}
        </Box>
      </HStack>
      <Flex
        bg={"#FAFAFA"}
        h={"100%"}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        <Box w={{ base: "100%", md: "80%" }} pl={4}>
          {/* Profile Info */}
          <Box>
            {histories.length > 0 ? (
              histories.map((card, idx) => (
                <Box
                  key={`${card.id}-${idx}`}
                  flexShrink={0}
                  px={4}
                  py={2}
                  m={3}
                  cursor={"pointer"}
                  shadowColor={"#3E67A52E"}
                  shadow={"sm"}
                  rounded={10}
                  className="bg-white relative"
                >
                  <HStack
                    py={3}
                    spacing={4}
                    align="center"
                    justifyContent="space-between"
                  >
                    {/* Left section: Image + Title/Description */}
                    <HStack align="center" spacing={3} flex="1">
                      <Image
                        src={userDetails?.profile_picture || logo}
                        alt="User"
                        boxSize="50px"
                        rounded={50}
                      />
                      <Stack spacing={0}>
                        <Text
                          color="#202020"
                          fontSize={{ base: 10, md: 12 }}
                          fontFamily="InterRegular"
                        >
                          {card.title}
                        </Text>
                        <Text
                          color="#808291"
                          fontFamily="InterRegular"
                          fontSize={{ base: 10, md: 13 }}
                        >
                          {card.description}
                        </Text>
                      </Stack>
                    </HStack>

                    {/* Center: Time */}
                    <Box flex="0.5" alignItems="center" justifyContent="center">
                      <Text
                        textAlign="center"
                        color="#202020"
                        fontSize={{ base: 10, md: 14 }}
                        fontFamily="InterRegular"
                      >
                        {formatTime(card.created_at)}
                      </Text>
                    </Box>

                    {/* Right: Addition */}
                    <Box
                      flex="0.5"
                      alignItems="flex-end"
                      justifyContent="center"
                    >
                      <Text
                        fontFamily="InterBold"
                        color="#179F3B"
                        fontSize={{ base: 14, md: 18 }}
                        textAlign="right"
                      >
                        {card.addition}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ))
            ) : (
              <Text textAlign="center">No Points Histories yet</Text>
            )}
          </Box>
        </Box>

        {/* small cards */}
        <Box
          bg={"#fff"}
          h={"100%"}
          w={{ base: "100%", md: "30%" }}
          p={3}
          className="pb={4}"
        >
          <Box>
            <Card />
            <Box
              bg="#F8FBFF"
              mt={5}
              p={5}
              borderRadius="xl"
              boxShadow="md"
              border="1px solid #E3ECF6"
            >
              <Heading
                as="h3"
                size="md"
                color="#111"
                // fontFamily="InterBold"
                mb={3}
                textAlign="center"
              >
                Understanding Your Points
              </Heading>

              <Stack spacing={3} fontSize="sm" color="#3E4C59">
                <Box
                  bg="white"
                  p={3}
                  borderRadius="lg"
                  boxShadow="sm"
                  border="1px solid #E6EDF5"
                >
                  <HStack justify="space-between">
                    <Text fontFamily="InterMedium">Login</Text>
                    <Text color="#179F3B" fontFamily="InterBold">
                      +2 pts
                    </Text>
                  </HStack>
                </Box>

                <Box
                  bg="white"
                  p={3}
                  borderRadius="lg"
                  boxShadow="sm"
                  border="1px solid #E6EDF5"
                >
                  <HStack justify="space-between">
                    <Text fontFamily="InterMedium">Post on the community</Text>
                    <Text color="#179F3B" fontFamily="InterBold">
                      +5 pts
                    </Text>
                  </HStack>
                </Box>

                <Box
                  bg="white"
                  p={3}
                  borderRadius="lg"
                  boxShadow="sm"
                  border="1px solid #E6EDF5"
                >
                  <HStack justify="space-between">
                    <Text fontFamily="InterMedium">Comment on a post</Text>
                    <Text color="#179F3B" fontFamily="InterBold">
                      +3 pts
                    </Text>
                  </HStack>
                </Box>

                <Box
                  bg="white"
                  p={3}
                  borderRadius="lg"
                  boxShadow="sm"
                  border="1px solid #E6EDF5"
                >
                  <HStack justify="space-between">
                    <Text fontFamily="InterMedium">Like a post</Text>
                    <Text color="#179F3B" fontFamily="InterBold">
                      +2 pts
                    </Text>
                  </HStack>
                </Box>
              </Stack>

              <Box
                mt={5}
                bg="#E9F5EE"
                p={4}
                borderRadius="lg"
                textAlign="center"
                border="1px solid #CDE9D6"
              >
                <Text fontSize="sm" color="#2C7A4B" fontFamily="InterMedium">
                  Accumulate points through daily engagement. Redeem them for
                  exclusive benefits such as:
                </Text>
                <Text
                  mt={2}
                  fontFamily="InterBold"
                  color="#179F3B"
                  fontSize="sm"
                >
                  🎁 LinkedIn Premium (3 Months) <br />
                  💡 Skill Courses & Platform Perks
                </Text>
              </Box>
            </Box>

            <MentorsBoxPage />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default PostHistory;

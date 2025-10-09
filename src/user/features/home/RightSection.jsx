import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Card } from "./RightSide/Card";
import MentorsBoxPage from "./RightSide/mentorsCard";
import Avatar from "../../components/header/Avatar";
import { FaCoffee, FaCog, FaImage } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import {SwitchPage} from '../../components/switchPage/switch'

export const RightSection = () => {
  const navigate = useNavigate();
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
    <Box
      shadow={{ base: "none", xl: "md" }}
      // shadowColor={"bg.muted"}
      flex={1}
      boxShadowColor={"bg.#080F340F"}
      bg={"#fff"}
      // mb={{ base: 2, md: 10 }}
    >
      <Box
        // w={"100%"}
        display={{ base: "none", xl: "block" }}
        ml={"auto"}
        justifyContent={"flex-end"}
        className="flex items-center gap-5"
        // bg={"#fff"}
        pt={1}
        px={"6%"}
        pb={2}
      >
        <Box className="border-l-2 pl-4">
          {/* <button onClick={() => toggleDropdown("avatar")}> */}
          <Avatar options={dropdownOptions} />
          {/* </button> */}
        </Box>
      </Box>
      <Box pl={5} pr={{ base: 0, xl: 5 }} py={{ base: 0, xl: 5 }}>
        <Card />
              <Box
        shadow={"xs"}
        bg={"#fff"}
        rounded={10}
        p={6}
        mt={4}
        // w={{ base: "50%", xl: 475 }}
        border={"1px solid #EDEDF2"}
      >
        <Flex
          my={{ base: -2, md: 0 }}
          ml={{ base: -3, md: 0 }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <HStack>
            <IoIosNotificationsOutline size={20} />
            <Stack>
              <Text
                color={"#191919"}
                fontSize={{ base: "11px", md: 14 }}
                fontFamily="InterBold"
              >
                Become a Mentor
              </Text>
              <Text
                mt={-3}
                color={"#475467"}
                fontWeight={"normal"}
                fontSize={{ base: "11px" }}
                fontFamily="InterRegular"
                display={"flex"}
                alignItems={"center"}
                gap={2}
                py={1}
              >
                We will Approve your mentorship status
              </Text>
            </Stack>
          </HStack>
          <SwitchPage/>
        </Flex>
      </Box>
        <Box
        shadow={"xs"}
        bg={"#fff"}
        rounded={10}
        p={6}
        mt={5}
        // w={{ base: "50%", xl: 475 }}
        border={"1px solid #EDEDF2"}
      >
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <HStack>
                  <FaCoffee />
                  <Stack spacing={0}>
                    <Flex align="center" gap={2}>
                      <Text
                        color={"#191919"}
                        fontSize={{ base: "11px"}}
                        fontFamily="InterBold"
                      >
                        Coffee Roulette Participation
                      </Text>
      
                      {/* Simple ? with hover explanation */}
                     
                    </Flex>
      
                    <Text
                      mt={{ base: -2, md: -1 }}
                      color={"#475467"}
                      fontWeight={"normal"}
                      fontSize={{ base: "11px"}}
                      fontFamily="InterRegular"
                      display={"flex"}
                      alignItems={"center"}
                      gap={2}
                      py={1}
                    >
                      Opt-in for our weekly coffee roulette
                    </Text>
                  </Stack>
                </HStack>
      
                <SwitchPage coffee={true} />
              </Flex>
            </Box>
        <MentorsBoxPage />
      </Box>
    </Box>
  );
};

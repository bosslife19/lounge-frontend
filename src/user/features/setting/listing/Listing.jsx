import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
// import { cardData } from "../../../hooks/useData";
// import { MentoringDetails } from "./MentoringDetails";
import { MdKeyboardArrowRight } from "react-icons/md";
// import { Dropdown } from "../../components/select/Dropdown";
import { IoIosArrowBack, IoIosNotificationsOutline } from "react-icons/io";
import { SwitchPage } from "../../../components/switchPage/switch";
import { cardData } from "../../../../hooks/useData";
import { CiCirclePlus } from "react-icons/ci";
import { CreateListOverlay } from "./modal/CreateListOverlay";
import { EditList } from "./modal/EditList";
import axiosClient from "../../../../axiosClient";
import { AuthContext } from "../../../../context/AuthContext";
import { userAvatar } from "../posts/Posts";

export const SettingsListing = () => {
  //   const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [listings, setListings] = useState([]);
  const [beingEdited, setBeingEdited] = useState(null);
  const {userDetails} = useContext(AuthContext)

  useEffect(() => {
    const getMyListings = async () => {
      const res = await axiosClient.get("/get-my-listings");

      setListings(res.data.listings);
    };
    getMyListings();
  }, []);

  const handleCardClick = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    // setSelectedCard(null);
  };
  const handleCardClicks = () => {
    setisEdit(true);
  };

  const handleCloses = () => {
    setisEdit(false);
    // setSelectedCard(null);
  };

  return (
    <Box h={"100%"} p={3}>
      <HStack
        w={"100%"}
        alignItems={"end"}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        mb={5}
      >
        <Box
          shadow={"xs"}
          bg={"#fff"}
          rounded={10}
          p={{ base: 3, md: 6 }}
          w={{ base: "100%", xl: 475 }}
          border={"1px solid #EDEDF2"}
        >
          <Flex
            // flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack>
              <Text
                color={"#191919"}
                fontSize={{ base: 10, md: 14 }}
                fontFamily="InterBold"
              >
                Become a Mentor
              </Text>
              <Text
                mt={-3}
                color={"#475467"}
                fontWeight={"normal"}
                fontSize={{ base: 10, md: 14 }}
                fontFamily="InterRegular"
                display={"flex"}
                alignItems={"center"}
                gap={2}
                py={1}
              >
                We will Approve your mentorship status
              </Text>
            </Stack>
            {/* switch */}
            <SwitchPage />
          </Flex>
        </Box>
        <Button
          p={{ base: 1, md: 1 }}
          onClick={() => handleCardClick()}
          rounded={10}
          w={{ base: "100%", md: "auto" }}
          fontSize={{ base: "9px", md: 12 }}
        >
          Create New Listing
          <CiCirclePlus />
        </Button>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6} gap={5}>
        {listings.length > 0 ? (
          listings.map((card, idx) => (
            <Card.Root
              key={idx + card.id}
              bg={"#fff"}
              shadowColor={"#080F340F"}
              shadow={"sm"}
              rounded={20}
              border={"1px solid #fff"}
            >
              <Card.Body gap="2">
                <Avatar.Root
                  mx={"auto"}
                  boxSize={{ base: "40px", md: 20 }}
                  rounded={50}
                >
                  <Avatar.Image src={card.user?.profile_picture ||userDetails?.profile_picture ||userAvatar} />
                  <Avatar.Fallback name={card.name} />
                </Avatar.Root>
                <Text
                  textAlign={"center"}
                  color={"#070416"}
                  fontSize={{ base: "11px", md: 16 }}
                  fontFamily="InterRegular"
                >
                  {card.user?.name ||userDetails?.name}
                </Text>
                <Text
                  mt={{ base: "-2", md: "0" }}
                  textAlign={"center"}
                  color={"#64626D"}
                  fontSize={{ base: "10px", md: 16 }}
                  fontFamily="LatoRegular"
                >
                  {card.user?.profession ||userDetails?.profession}
                </Text>
                <Card.Title
                  mt={{ base: "-2", md: "2" }}
                  color={"#070416"}
                  fontSize={{ base: "11px", md: 16 }}
                  textAlign={"center"}
                  fontFamily="InterBold"
                >
                  {card.title}
                </Card.Title>
                <Button
                  onClick={() => {
                    setBeingEdited(card);
                    handleCardClicks();
                  }}
                  bg={"transparent"}
                  mx={-4}
                >
                  <Card.Description
                    py={1}
                    w={"100%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    textAlign={"center"}
                  >
                    <Text
                      color={"#64626D"}
                      fontSize={{ base: "10px", md: 16 }}
                      fontFamily="InterRegular"
                      textAlign={"left"}
                    >
                      Edit Listing
                    </Text>
                    <MdKeyboardArrowRight />
                  </Card.Description>
                </Button>
              </Card.Body>
            </Card.Root>
          ))
        ) : (
          <Text fontSize={{ base: "10px", md: 16 }}>
            You have no listings yet
          </Text>
        )}
      </SimpleGrid>

      {/* Modal */}
      <CreateListOverlay isOpen={isOpen} onClose={handleClose} setListings={setListings} />

         <EditList
          isOpen={isEdit}
          onClose={handleCloses}
          card={beingEdited}
          setListings={setListings}
         />
    
    </Box>
  );
};

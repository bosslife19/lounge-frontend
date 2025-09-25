import {
  Avatar,
  Box,
  Button,
  Card,
  createListCollection,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
// import { cardData } from "../../../hooks/useData";
import { MentoringDetails } from "./MentoringDetails";
import { MdKeyboardArrowRight } from "react-icons/md";
// import { SelectOption } from "../../components/select/Select";
import { CiSearch } from "react-icons/ci";
import { Dropdown } from "../../components/select/Dropdown";
import { IoIosArrowBack } from "react-icons/io";
import axiosClient from "../../../axiosClient";
import { userAvatar } from "../setting/posts/Posts";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";
import Avatars from "../../components/header/Avatar";
import { useNavigate } from "react-router-dom";

const Mentoring = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };
  const [search, setSearch] = useState('');
  const [filteredResults, setFilteredResults] = useState([])
  const { makeRequest, loading } = useRequest();

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };
  const handleRequestSession = async (id) => {
    const res = await makeRequest("/request-session", { mentorId: id });
    if (res.error) return;
    toast.success("Session Requested successfully");
  };

  useEffect(() => {
    const getAlllistings = async () => {
      const res = await axiosClient.get("/get-all-listings");

      setListings(res.data.listings);
    };
    getAlllistings();
  }, []);

  const frameworks = createListCollection({
    items: [
      { label: "Finance", value: "finance" },
      { label: "Engineering", value: "engineering" },
      
    ],
  });

      useEffect(() => {
        if (search) {
         
          const lowerSearch = search.toLowerCase();
          const results = listings?.filter((item) =>
            [item.title, item.description, item.category, item.user?.first_name, item.user?.last_name, item.access_email]
              .filter(Boolean) // removes null/undefined
              .some((field) => field.toLowerCase().includes(lowerSearch))
          );
          setFilteredResults(results);
        } else {
          setFilteredResults(listings); // if no search, show all
        }
      }, [search, listings]);
  return (
    <Box bg={"#F5F6FA"} h={"100vw"} p={3}>
      <Heading display={"flex"} pb={4} gap={2} alignItems={"center"}>
        {/* <IconButton
          aria-label="Previous"
          rounded="full"
          bg="white"
          border={"1px solid #9E9E9E"}
          _hover={{ bg: "whiteAlpha.500" }}
          size="xs"
          color={"#202020"}
        >
          <IoIosArrowBack color="#9E9E9E" />
        </IconButton> */}
        Mentor Listings
      </Heading>
      <Flex
        px={{ base: 4, md: 0 }}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", md: "row" }}
        pb={5}
        alignItems={{ base: "flex-start", md: "center" }}
        gap={{ base: 4, md: 10 }}
      >
        <InputGroup
          w={{ base: "100%", md: 700 }}
          startElement={<CiSearch size={15} />}
        >
          <Input
            py={{ base: 3, md: 6 }}
            fontSize={10}
            borderRadius={10}
            placeholder="Search Listing"
            onChange={e=>setSearch(e.target.value)}
          />
        </InputGroup>

        <Dropdown
          color={"#EBEBEB"}
          // title={'finance'}
          frameworks={frameworks}
          filteredResults={listings}
          setFilteredResults={setFilteredResults}
          
          
        />
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6} gap={5}>
        {filteredResults.length > 0 ? (
          filteredResults.map((card, idx) => (
            <Card.Root
              key={idx + card.id}
              bg={"#fff"}
              shadowColor={"#080F340F"}
              shadow={"sm"}
              w={{ base: "100%", md: "341px" }}
              // h={{ base: "100%", md: "340px" }}
              rounded={20}
              border={"1px solid #fff"}
            >
              <Card.Body gap="2">
                <Avatar.Root
                  mx={"auto"}
                  boxSize={{ base: "40px", md: "89px" }}
                  rounded={50}
                >
                  <Avatar.Image src={card.user.profile_picture || userAvatar} />
                  <Avatar.Fallback name={card.user.name} />
                </Avatar.Root>
                <Text
                  textAlign={"center"}
                  color={"#070416"}
                  fontSize={{ base: 11, md: "16px" }}
                  fontFamily="InterRegular"
                >
                  {card.user.first_name} {card.user.last_name}
                </Text>
                <Text
                  my="-2"
                  textAlign={"center"}
                  color={"#64626D"}
                  fontSize={{ base: 11, md: "16px" }}
                  fontFamily="LatoRegular"
                >
                  {card.category}
                </Text>
                <Card.Title
                  color={"#070416"}
                  fontSize={{ base: 11, md: 16 }}
                  textAlign={"center"}
                  fontFamily="InterBold"
                >
                  {card.title}
                </Card.Title>
                <Button
                  onClick={() => handleCardClick(card)}
                  bg={"transparent"}
                >
                  <Card.Description
                    // py={1}

                    w={"100%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    textAlign={"center"}
                    px={-4}
                    mt={{ base: -15, md: 0 }}
                    // gap={40}
                    mx={-43}
                  >
                    <Text
                      ml={{ base: -13, md: -23 }}
                      color={"#64626D"}
                      fontSize={{ base: "12px", md: "16px" }}
                      fontFamily="InterRegular"
                      textAlign={"left"}
                    >
                      View Details
                    </Text>
                    <Box mr={-23}>
                      <MdKeyboardArrowRight color={"#64626D"} />
                    </Box>
                  </Card.Description>
                </Button>
              </Card.Body>
              <Card.Footer>
                <Button
                  w={"full"}
                  fontFamily="InterMedium"
                  fontSize={{ base: "12px", md: "16px" }}
                  bg={"#F2F2F2"}
                  color={"#333333B2/70"}
                  rounded={{ base: 10, md: 20 }}
                  mt={{ base: "-25px", md: 0 }}
                  h={{ base: "30px", md: "43px" }}
                  onClick={() => handleRequestSession(card.user.id)}
                >
                  {loading ? <Spinner /> : "Request Session"}
                </Button>
              </Card.Footer>
            </Card.Root>
          ))
        ) : (
          <Text fontSize={{ base: "12px", md: "14px" }} textAlign={"center"}>
            No Listings yet
          </Text>
        )}
      </SimpleGrid>

      {/* Modal */}
      {selectedCard && (
        <MentoringDetails
          isOpen={isOpen}
          onClose={handleClose}
          profile={selectedCard}
        />
      )}
    </Box>
  );
};

export default Mentoring;

import {
  Avatar,
  Box,
  Button,
  Card,
  createListCollection,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  Menu,
  Portal,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { cardData } from "../../../hooks/useData";
import { MentoringDetails } from "./MentoringDetails";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Dropdown } from "../../components/select/Dropdown";
import { IoIosArrowBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { BiDotsVerticalRounded, BiPencil, BiTrash } from "react-icons/bi";
import { EditMentor } from "./modal/Editoverlay";
import axiosClient from "../../../axiosClient";
import { userAvatar } from "../../../user/features/setting/posts/Posts";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";

export const AdminMentor = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [listings, setListings] = useState([]);

  const { makeRequest } = useRequest();

  const handleDelete = async (id) => {
    const res = await makeRequest("/delete-listing", { listingId: id });
    if (res.error) return;
    toast.success("Listing deleted successfully");
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const getListings = async () => {
      const res = await axiosClient.get("/get-all-listings");

      setListings(res.data.listings);
    };
    getListings();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  const frameworks = createListCollection({
    items: [
      { label: "Experience", value: "Experience" },
      { label: "finances", value: "finances" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });

  const [isOpened, setIsOpened] = useState(false);

  const handleAction = () => {
    setIsOpened(true);
  };

  const handleClosed = () => {
    setIsOpened(false);
  };
  return (
    <Box bg={"#F5F6FA"} h={"100%"} p={3}>
      <Heading display={"flex"} pb={4} gap={2} alignItems={"center"}>
        <IconButton
          aria-label="Previous"
          rounded="full"
          bg="white"
          border={"1px solid #9E9E9E"}
          _hover={{ bg: "whiteAlpha.500" }}
          size={{ base: "10", md: "xs" }}
        >
          <IoIosArrowBack color="#9E9E9E" />
        </IconButton>
        <Text
          fontSize={{ base: "10px", md: 14 }}
          size={{ base: "xs", md: "sm" }}
        >
          Mentor Listings
        </Text>
      </Heading>
      <Flex
        justifyContent={"space-between"}
        flexDirection={{ base: "column", md: "row" }}
        pb={5}
        alignItems={{ base: "flex-start", md: "center" }}
        gap={{ base: 4, md: 10 }}
      >
        <InputGroup
          w={{ base: "100%", md: 700 }}
          bg={"white"}
          startElement={<CiSearch size={15} />}
        >
          <Input
            py={{ base: 2, md: 6 }}
            fontSize={{ base: "10px", md: 14 }}
            size={{ base: "xs", md: "sm" }}
            borderRadius={10}
            placeholder="Search..."
          />
        </InputGroup>

        <Dropdown
          frameworks={frameworks}

          // title={'finance'}
        />
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6} gap={5}>
        {listings.length > 0 ? (
          listings.map((card, idx) => (
            <Card.Root
              key={idx}
              bg={"#fff"}
              shadowColor={"#080F340F"}
              shadow={"sm"}
              rounded={20}
              size={{ base: "sm", md: "md" }}
              border={"1px solid #fff"}
            >
              <Card.Body gap="2">
                <Avatar.Root
                  mx={"auto"}
                  boxSize={{ base: 10, md: 20 }}
                  rounded={50}
                >
                  <Avatar.Image src={card.user.profile_picture || userAvatar} />
                  <Avatar.Fallback name={card.user.name} />
                </Avatar.Root>
                <Menu.Root>
                  <Menu.Trigger position={"absolute"} right={5} top={5} asChild>
                    <Button p={0} rounded={30} bg={"#fff"} size="sm">
                      <BiDotsVerticalRounded size={10} color="#212121" />
                    </Button>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Item
                          value="new-file"
                          onClick={() => handleDelete(card.id)}
                        >
                          <BiTrash />
                          Delete
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
                <Text
                  textAlign={"center"}
                  color={"#070416"}
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  fontFamily="InterRegular"
                >
                  {card.user.first_name} {card.user.last_name}
                </Text>
                <Text
                  textAlign={"center"}
                  color={"#64626D"}
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  fontFamily="LatoRegular"
                >
                  {card.user.profession}
                </Text>
                <Card.Title
                  mt={{ base: "-2", md: "2" }}
                  color={"#070416"}
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  textAlign={"center"}
                  fontFamily="InterBold"
                >
                  {card.title}
                </Card.Title>
                <Button
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  onClick={() => handleCardClick(card)}
                  bg={"transparent"}
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
                      fontSize={{ base: "10px", md: 14 }}
                      size={{ base: "xs", md: "sm" }}
                      fontFamily="InterRegular"
                      textAlign={"left"}
                    >
                      View Details
                    </Text>
                    <MdKeyboardArrowRight />
                  </Card.Description>
                </Button>
              </Card.Body>
            </Card.Root>
          ))
        ) : (
          <Text
            fontSize={{ base: "10px", md: 14 }}
            size={{ base: "xs", md: "sm" }}
            textAlign={"center"}
          >
            No Listings available yet
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
      <EditMentor isOpen={isOpened} onClose={handleClosed} />
    </Box>
  );
};

import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { cardData } from "../../../../hooks/useData";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { Dropdown } from "../../../components/select/Dropdown";
import { IoIosArrowBack } from "react-icons/io";
import { AdminMentoringDetails } from "../modal/MentorDetailsModal";

export const MentorListing = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  return (
    <Box bg={"#FDFDFD"} h={"100%"} p={3}>
      <Heading display={"flex"} pb={4} gap={2} alignItems={"center"}>
        <IconButton
          aria-label="Previous"
          rounded="full"
          bg="white"
          border={"1px solid #9E9E9E"}
          _hover={{ bg: "whiteAlpha.500" }}
          size="sm"
        >
          <IoIosArrowBack color="#9E9E9E" />
        </IconButton>
        Mentor Listings
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6} gap={5}>
        {cardData.map((card, idx) => (
          <Card.Root
            key={idx}
            bg={"#fff"}
            shadowColor={"#080F340F"}
            shadow={"sm"}
            rounded={20}
            border={"1px solid #fff"}
          >
            <Card.Body gap="2">
              <Avatar.Root mx={"auto"} boxSize={20} rounded={50}>
                <Avatar.Image src={card.eImage} />
                <Avatar.Fallback name={card.name} />
              </Avatar.Root>
              <Text
                textAlign={"center"}
                color={"#070416"}
                fontSize={{ base: 12, md: 16 }}
                fontFamily="InterRegular"
              >
                Manuel Neuer
              </Text>
              <Text
                textAlign={"center"}
                color={"#64626D"}
                fontSize={{ base: 12, md: 16 }}
                fontFamily="LatoRegular"
              >
                Web Developer
              </Text>
              <Card.Title
                mt="2"
                color={"#070416"}
                fontSize={{ base: 12, md: 16 }}
                textAlign={"center"}
                fontFamily="InterBold"
              >
                {card.title}
              </Card.Title>
              <Button onClick={() => handleCardClick(card)} bg={"transparent"}>
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
                    fontSize={{ base: 12, md: 16 }}
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
        ))}
      </SimpleGrid>

      {/* Modal */}
      {selectedCard && (
        <AdminMentoringDetails
          isOpen={isOpen}
          onClose={handleClose}
          profile={selectedCard}
        />
      )}
    </Box>
  );
};

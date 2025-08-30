import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text, 
} from "@chakra-ui/react";
 import { BiPlus } from "react-icons/bi";
import logo from "../../../../assets/Image.png";
import { CiCirclePlus } from "react-icons/ci";

// Dummy Data
const cardData = [
  {
    id: 1, 
    image: logo,
    title: "Project One",
    subtitle: "software developer",
  },
  {
    id: 2,
    image: logo,
    title: "Project One",
    subtitle: "software developer",
  },
];


export const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
};

const MentorsBoxPage = () => {
  return (
    <Box  w={'100%'} p={6} >
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="xl" fontWeight="bold" color="#202020">
          My Mentors
        </Text>
        <Button
          bg="transparent"
          color="#9E9E9E"
          _hover={{ bg:"transparent" }}
          rounded="lg"
        >
          <CiCirclePlus />
        </Button>
      </Flex>

      {/* Grid 2x */}
      <Stack   spacing={6}>
        {cardData.map((card) => (
          <Box
            key={card.id}
            transition="all 0.2s ease-in-out"
            borderBottom={'1px solid #D8D8D8'}
            pb={3}
          >
            <HStack spacing={4} align="center">
              <Image
                src={card.image}
                alt={card.title}
                boxSize="20px"
                rounded="full"
              />
              <Stack spacing={0} flex="1">
                <Text fontSize={12} fontWeight="semibold" color="#111827">
                  {truncateText(card.title)}
                </Text>
                <Text mt={-2} fontSize={9} color="#6B7280">
                  {truncateText(card.subtitle)}
                </Text>
              </Stack>
              <Button
                size="sm"
                variant="outline"
                borderColor="#E5E7EB"
                rounded="md"
                fontSize={9}
              >
                View Profile
              </Button>
            </HStack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default MentorsBoxPage;

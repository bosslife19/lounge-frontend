import { useState } from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  HStack,
  SimpleGrid,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import btns from "../../../assets/btn.svg";
import { cardData } from "../../../hooks/useData";
import { ProfileDetailsModal } from "./profileDetails";
// import { ProfileDetailsModal } from "./profileDetails";
import { userAvatar } from "../../../user/features/setting/posts/Posts";


export const Articles = ({articles, setArticles}) => {
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
    <Box px={4} py={6}>
      <InputGroup
        w={300}
        mt={-5}
        mb={5}
        startElement={<CiSearch size={15} />}
      >
        <Input
          py={15}
          fontSize={10}
          borderRadius={10}
          placeholder="Search..."
        /> 
      </InputGroup>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} gap={7}>
        {articles.length>0 ? articles.map((card, idx) => (
          <Box
            key={`${card.id}-${idx}`}
            cursor="pointer"
            p={2}
            bg="#fff"
            border="1px solid #080F340F"
            className="rounded-2xl relative"
            onClick={() => handleCardClick(card)}
          >
            <Image
              roundedTop={10}
              src={card.image}
              alt={card.title}
              h="100px"
              className="w-full h-30 object-cover"
            />

            <button className="absolute cursor-pointer top-5 right-6">
              <Image src={btns} alt="btn" boxSize="20px" rounded="full" />
            </button>

            <Box pt={2} px={2}>
              <Text fontSize={{ base: 12, md: 14 }} className="font-semibold">
                {card.title}
              </Text>
            </Box>

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
                    boxSize="30px"
                    rounded="full"
                  />
                </Stack>
                <Stack spacing={0}>
                  <Text
                    color="#202020"
                    fontSize={{ base: 10, md: 12 }}
                    fontFamily="InterMedium"
                  >
                    The Lounge Team
                  </Text>
                  <Text color="#202020" mt={-2} fontSize={{ base: 9, md: 11 }}>
                    {card.date}
                  </Text>
                </Stack>
              </HStack>
              <MdKeyboardArrowRight />
            </HStack>
          </Box> 
        )):<Text>No articles yet</Text>}
      </SimpleGrid>

      {/* Modal */}
      {selectedCard && (
        <ProfileDetailsModal
          isOpen={isOpen}
          onClose={handleClose}
          profile={selectedCard}
        />
      )}
    </Box>
  );
};

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
  AspectRatio,
} from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import btns from "../../../assets/btn.svg";
import { cardData } from "../../../hooks/useData";
import { ProfileDetailsModal } from "./profileDetails";
// import { ProfileDetailsModal } from "./profileDetails";
import { userAvatar } from "../../../user/features/setting/posts/Posts";
import { useNavigate } from "react-router-dom";

export const Articles = ({ articles, setArticles }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    // setSelectedCard(card);
    // setIsOpen(true);
    navigate(`/articles/${card.id}`);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  return (
    <Box h={"100%"} px={4} pt={2} pb={6}>
      {/* <InputGroup
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
      </InputGroup> */}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} gap={7}>
        {articles.length > 0 ? (
          articles.map((card, idx) => (
            <Box
              key={`${card.id}-${idx}`}
              cursor="pointer"
              p={2}
              // w={341}
              mt={{ base: -3, md: 0 }}
              bg="#fff"
              border="1px solid #080F340F"
              className="rounded-2xl relative"
              onClick={() => handleCardClick(card)}
            >
              <AspectRatio ratio={16 / 9} w="100%">
                <Image
                  roundedTop={12}
                  src={card.image}
                  alt={card.title}
                  h={{ base: "80px", md: "110px" }}
                  className="w-full h-30 object-cover"
                />
              </AspectRatio>

              {/* <button className="absolute cursor-pointer top-5 right-6">
                <Image
                  src={btns}
                  alt="btn"
                  boxSize={{ base: "15px", md: "20px" }}
                  rounded="full"
                />
              </button> */}

              <Box pt={2} px={2}>
                <Text
                  fontSize={{ base: "10px", md: 14 }}
                  fontFamily={"InterMedium"}
                  className="font-semibold"
                  color={"#202020"}
                >
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
                      boxSize={{ base: "15px", md: "24px" }}
                      rounded="full"
                    />
                  </Stack>
                  <Stack spacing={0}>
                    <Text
                      color="#202020"
                      fontSize={{ base: "10px", md: 12 }}
                      fontFamily="InterMedium"
                    >
                      The Lounge Team
                    </Text>
                    <Text
                      color="#202020"
                      mt={-2}
                      fontSize={{ base: "8px", md: 11 }}
                    >
                      {card.date}
                    </Text>
                  </Stack>
                </HStack>
                <MdKeyboardArrowRight color="#00000099/60" />
              </HStack>
            </Box>
          ))
        ) : (
          <Text fontSize={{ base: "10px", md: 12 }}>No articles yet</Text>
        )}
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

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
  Button,
  Menu,
  Portal,
} from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import btns from "../../../assets/btn.svg";
import { cardData } from "../../../hooks/useData";
import { ProfileDetailsModal } from "./profileDetails";
import { BiDotsVerticalRounded, BiPencil, BiTrash } from "react-icons/bi";
import { EditArticle } from "./Modal/EditArticle";
 
export const AdminArticles = ({articles, setArticles}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

    const handleAction = () => {
     setIsOpened(true);
  };

  const handleClosed = () => {
    setIsOpened(false);
   };
  return (
    <Box px={4} py={6}>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} gap={7}>
        {articles?.map((card, idx) => (
          <Box
            key={`${card.id}-${idx}`}
            cursor="pointer"
            p={3}
            bg="#fff"
            border="1px solid #080F340F"
            className="rounded-2xl relative"
           
          >
            <Image
              roundedTop={10}
              src={card.image}
              alt={card.title}
              h="100px"
              className="w-full h-30 object-cover"
            />
            <Menu.Root >
           <Menu.Trigger 
           position={'absolute'}
           right={5}
            top={5}  asChild>
            <Button 
            p={0}
            rounded={30}
            bg={'#55555580'}  size="sm">
             <BiDotsVerticalRounded size={10}/>
            </Button>
           </Menu.Trigger>
          <Portal>
           <Menu.Positioner>
             <Menu.Content>
              <Menu.Item 
               onClick={() => handleAction()} 
              value="new-txt">
                <BiPencil/>
                Edit
              </Menu.Item>
              <Menu.Item value="new-file">
                <BiTrash/>
                Delete
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
        </Menu.Root>
          
            <Box pt={2} px={2}>
              <Text fontSize={{ base: 12, md: 14 }} className="font-semibold">
                {card.title}
              </Text>
            </Box>

            <Button
            bg={'transparent'}
            color={'#212121'}
            w={'100%'}
              pt={4}
              pb={4}
              spacing={4}
               onClick={() => handleCardClick(card)}   
              flexDirection={'row'}
              // alignItems={'flex-start'}
              justifyContent="space-between"
              px={2}
            >
                 
                <Stack gap={1}  alignItems={'flex-start'}>
                  <Text
                    color="#202020"
                    fontSize={{ base: 10, md: 12 }}
                    fontFamily="InterMedium"
                  >
                    View Article
                  </Text>
                  <Text color="#202020" mt={-2} fontSize={{ base: 9, md: 11 }}>
                    {card.date}
                  </Text>
                </Stack>
               <MdKeyboardArrowRight />
            </Button>
          </Box> 
        ))}
      </SimpleGrid>

      {/* Modal */}
      {selectedCard && (
        <ProfileDetailsModal
          isOpen={isOpen}
          onClose={handleClose}
          profile={selectedCard}
          setArticles={setArticles}
        />
      )}

         <EditArticle
          isOpen={isOpened}
          onClose={handleClosed}
         />
    
    </Box>
  );
};

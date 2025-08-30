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
  Image,
  Input,
  InputGroup,
  Menu,
  Portal,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import  { useState } from "react";
import { cardData } from "../../../hooks/useData";
 import coins from "../../../assets/coingold.png"
import { BiDotsVerticalRounded, BiPencil, BiTrash } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { CreateBenefits } from "./modal/CreateBenefit";
import { EditBenefits } from "./modal/EditBenefits";
import { CreatePoints } from "./modal/CreatePoints";
import { EditPoints } from "./modal/EditPoints";
 
export const BonusPoints = () => {
   const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
     setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
   };

    const frameworks = createListCollection({
    items: [
      { label: "Experience", value: "Experience" },
      { label: "finances", value: "finances" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  })

    const [isOpened, setIsOpened] = useState(false);
 
      const handleAction = () => {
     setIsOpened(true);
  };

  const handleClosed = () => {
    setIsOpened(false);
   };
  return (
    <Box bg={'#F5F6FA'} h={"100%"} p={3}>
       <Button
         mb={4}
            position={'absolute'}
            right={0}
              top={5}
               size="sm"
                border={`1px solid #333`}
                rounded={20}
                color={"#333"}
                 bg="#fff"
                onClick={handleCardClick}
               _hover={{ bg: "#f0f0f0" }}
                >
                <HStack spacing={2}>
               <FiPlusCircle size={12} />
                <Text
                   fontSize={{base:10,md:13}}
                   fontWeight="400"
                   fontFamily="OutfitRegular"
                 >
                 Add Points
               </Text>
           </HStack>
         </Button>
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
             
               <Menu.Root >
                      <Menu.Trigger 
                         position={'absolute'}
                         right={5}
                          top={5}  asChild>
                          <Button 
                          p={0}
                          rounded={30}
                          bg={'#6C3433'}  size="sm">
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
               
              
              <Card.Title
                mt="2"
                color={'#070416'}
               fontSize={{base:12,md:16}}
                 
                fontFamily="InterBold"
              >
                {card.title}
              </Card.Title>
              <HStack 
              bg={'#BFBFBF'}
              mr={'auto'}
              py={2}
              px={3}
              borderRadius={20}
              alignItems={'center'}>
                <Image 
                src={coins}
                w={5}
                h={5}
                />
                <Text color={'#fff'}>
                    300
                </Text>
              </HStack>
            </Card.Body>
             
          </Card.Root>
        ))}
      </SimpleGrid>

       <CreatePoints
        isOpen={isOpen}
        onClose={handleClose}
       />

       <EditPoints
        isOpen={isOpened}
        onClose={handleClosed}
       />
       
    </Box>
  );
};

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
import React, { useState } from "react";
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

export const SettingsListing = () => {
//   const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setisEdit] = useState(false);

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
    <Box bg={'#F5F6FA'} h={"100%"} p={3}>
        <HStack  
        w={'100%'}
        alignItems={'end'} 
        justifyContent={'space-between'}
        mb={5}
        >
      <Box 
        shadow={'xs'}
        bg={'#fff'} 
        
        rounded={10} p={6} 
        w={{base:'100%',xl:475}}
        border={'1px solid #EDEDF2'}>
         <Flex 
             alignItems={'center'}
                justifyContent={'space-between'}>
                 <Stack>
                     <Text
                       color={"#191919"}
                       fontSize={{ base: 10, md: 14 }}
                       fontFamily="InterBold"
                      >
                         Become a Metor
                      </Text>
                     <Text
                       mt={-3}
                       color={"#475467"}
                       fontWeight={'normal'}
                       fontSize={{ base: 10, md: 14 }}
                       fontFamily="InterRegular"
                       display={'flex'}
                       alignItems={'center'}
                       gap={2}
                       py={1}
                      >
                    We will Approve your mentorship status
                 </Text>
                
               </Stack>
             {/* switch */}
          <SwitchPage/>
         </Flex>
      </Box>
        <Button 
         onClick={() => handleCardClick()} 
        rounded={10}>
            Create New Listing
            <CiCirclePlus />
        </Button>
        </HStack>
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
              <Text textAlign={"center"}
              color={'#070416'}
              fontSize={{base:12,md:16}}
                fontFamily="InterRegular">
                Manuel Neuer
              </Text>
              <Text textAlign={"center"}
               color={'#64626D'}
               fontSize={{base:12,md:16}}
                fontFamily="LatoRegular"
                >
               Web Developer
              </Text>
              <Card.Title
                mt="2"
                color={'#070416'}
               fontSize={{base:12,md:16}}
                textAlign={"center"}
                fontFamily="InterBold"
              >
                {card.title}
              </Card.Title>
              <Button 
              onClick={() => handleCardClicks()} 
              bg={'transparent'}>
              <Card.Description 
               py={1}
               w={'100%'}
              display={'flex'} 
              alignItems={'center'} 
              justifyContent={'space-between'} 
              textAlign={"center"}>
                <Text color={'#64626D'} 
                fontSize={{base:12,md:16}}
                fontFamily="InterRegular"
                textAlign={"left"}>View Details</Text>
                <MdKeyboardArrowRight />
              </Card.Description>
              </Button>
            </Card.Body>
             
          </Card.Root>
        ))}
      </SimpleGrid>

      {/* Modal */}
         <CreateListOverlay
          isOpen={isOpen}
          onClose={handleClose}
         />

         <EditList
          isOpen={isEdit}
          onClose={handleCloses}
         />
    
    </Box>
  );
};

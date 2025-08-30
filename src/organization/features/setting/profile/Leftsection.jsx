import { Box, Button, Flex, Heading, HStack, Image, List, Stack, Text } from '@chakra-ui/react'
 import images from "../../../../assets/course.png"
import { LuPencil } from 'react-icons/lu'
import tick from "../../../../assets/Verified tick.png";
import { FaBriefcase } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { truncateText } from '../../home/RightSide/mentorsCard';
import logo from "../../../../assets/userImage.jpg";
import { useState } from 'react';
import { EditProfile } from './modals/EditProfile';
import { FirstModal } from '../../home/modal/firstmodal';

export const LeftSectionProfile = () => {
   
   const [isOpen, setIsOpen] = useState(false);
   
    const handleCardClick = () => {
       setIsOpen(true);
    };
      const handleClose = () => {
      setIsOpen(false);
     };
      
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
    

  return (
    <Box  mb={'auto'} w={'100%'} >
        {/* profile name */}
        <Box 
        shadow={'xs'}
        bg={'#fff'} 
        rounded={10} p={3} 
        w={{base:'100%',xl:475}} 
        border={'1px solid #EDEDF2'}>
        <Flex 
        alignItems={'center'}
        justifyContent={'space-between'}>
          <HStack >
           <Stack position={"relative"}>
               <Image
                 src={images}
                 alt="Update"
                 boxSize="60px"
                 rounded={30}
                />
                <Image
                   src={tick}
                    alt="tick"
                    w={4}
                    position={'absolute'}
                    bottom={'0'}
                    right={'-1'}
                    borderRadius="md"
                    objectFit="cover"
                />
               </Stack>
              <Stack >
             <Text
               color={"#191919"}
               fontSize={{ base: 10, md: 14 }}
               fontFamily="InterBold"
              >
                 John Joe
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
              <FaBriefcase />  Financial Analyst
             </Text>
              <Text
               mt={-3}
               color={"#7C7C7C"}
               fontWeight={'normal'}
               fontSize={{ base: 10, md: 14 }}
               fontFamily="InterRegular"
               display={'flex'}
               alignItems={'center'}
               gap={2}
              >
                <FaLocationDot />
                Berlin, Germany.
             </Text>
                         
          </Stack>
         </HStack>
         <Button
         bg={'transparent'}
         color={'#475367'}
         onClick={() => handleCardClick()} 
         >
           <LuPencil />
         </Button>
        
        </Flex>
        </Box>

        {/* ABout Company */}
         <Box 
         mt={5}
        shadow={'xs'}
        bg={'#FCFCFC'} 
        rounded={10} p={3} 
        w={{base:'100%',xl:475}} 
        border={'1px solid #EDEDF2'}>
        <Flex 
        alignItems={'center'}
        justifyContent={'space-between'}>
          <HStack >
           <Stack position={"relative"}>
               <Image
                 src={images}
                 alt="Update"
                 boxSize="60px"
                 rounded={30}
                />
                <Image
                   src={tick}
                    alt="tick"
                    w={4}
                    position={'absolute'}
                    bottom={'0'}
                    right={'-1'}
                    borderRadius="md"
                    objectFit="cover"
                />
               </Stack>
              <Stack >
             <Text
               color={"#191919"}
               fontSize={{ base: 10, md: 14 }}
               fontFamily="InterBold"
              >
                Living Springs Finance LTD
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
              <FaBriefcase />  Financial Industry
             </Text>
              <Text
               mt={-3}
               color={"#7C7C7C"}
               fontWeight={'normal'}
               fontSize={{ base: 10, md: 14 }}
               fontFamily="InterRegular"
               display={'flex'}
               alignItems={'center'}
               gap={2}
              >
                <FaLocationDot />
                Berlin, Germany.
             </Text>
                         
          </Stack>
         </HStack>
         <LuPencil />
        </Flex>
         <Box shadow={'xl'} 
         mt={4} 
         rounded={20} 
         pb={4}
         bg={'#fff'} px={7} >
        <Heading 
        display={'flex'} 
        pt={5}
        pb={2}
        justifyContent={'space-between'}>
            About Company
            <LuPencil/>
        </Heading>
             <List.Root gap={2}>
               <List.Item fontSize={14} color={'#7C7C7C'}>
                Bachelor's degree in Design, related field, or equivalent practical experience.
               </List.Item>
               <List.Item fontSize={14} color={'#7C7C7C'}>
                7 years of experience as a UX or Interaction Designer.
               </List.Item>
               <List.Item fontSize={14} color={'#7C7C7C'}>
                Experience in representing and advocating for UX the and users.
               </List.Item>
             </List.Root>
        </Box>

        {/*company members*/}
         <Box shadow={'xl'} 
         mt={4} 
         rounded={20} 
         pb={4}
         bg={'#fff'} px={7} >
        <Heading 
         pt={5}
        pb={2}
        textAlign={'center'}
        >
            Company Members
         </Heading>
             <Stack spacing={6}>
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
                            <Text mt={-2} fontSize={10} color="#6B7280">
                              {truncateText(card.subtitle)}
                            </Text>
                          </Stack>
                          <Button
                            size="xs"
                             bg={'#000'}
                            borderColor="#E5E7EB"
                            rounded={15}
                            px={5}
                            color={'#fff'}
                             fontFamily="InterMedium"
                            fontSize={8}
                          >
                            View Profile
                          </Button>
                        </HStack>
                      </Box>
                 ))}
           </Stack>
        </Box>
        </Box>

        <EditProfile
                 isOpen={isOpen}
                 onClose={handleClose}
               />
    </Box>
  )
}

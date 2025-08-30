import { Box, Button, Flex, Heading, HStack, Image, List, Stack, Text } from '@chakra-ui/react'
 import images from "../../../../assets/course.png"
import { LuPencil } from 'react-icons/lu'
import tick from "../../../../assets/Verified tick.png";
import { FaBriefcase, FaFacebook } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
// import { truncateText } from '../../home/RightSide/mentorsCard';
import logo from "../../../../assets/userImage.jpg";
import { useState } from 'react';
import { EditNewUser } from '../modal/EditUser';
import { truncateText } from '../../../../user/features/home/RightSide/mentorsCard';
import { MdEmail, MdOutlineMailOutline } from 'react-icons/md';
import { BsLinkedin } from 'react-icons/bs';
import { IoAttach, IoCall, IoCallOutline } from 'react-icons/io5';
 import badge from "../../../../assets/stash_badge-verified-solid.png"
import { EditOrganization } from '../modal/EditOrganization';

export const OrganizationIInfo = () => {

      
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
    <HStack alignItems={'flex-start'} flexDirection={{base:'column',lg:'row'}} justifyContent={'space-between'}  mb={'auto'} w={'100%'} >
        {/* LeftSide */}
         <Box 
         mt={5}
         position={"relative"}
        shadow={'xs'}
        bg={'#FCFCFC'} 
        rounded={10} p={3} 
        w={{base:'100%',xl:475}} 
        border={'1px solid #EDEDF2'}>
        <Flex 
        
        alignItems={'center'}
        justifyContent={'space-between'}>
          <HStack  >
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
                <Image
                   src={badge}
                    alt="tick"
                    w={7}
                    position={'absolute'}
                    top={'-2'}
                    right={'-2'}
                    borderRadius="md"
                    objectFit="cover"
                />
              <Stack >
             <Text
               color={"#191919"}
               fontSize={{ base: 10, md: 14 }}
               fontFamily="InterBold"
               flexDirection={'row'}
               display={'flex'}
               gap={1}
              >
                Amarachi Okoro 
                <Text color={'#6C3433'}>
                    (Expert)
                </Text>
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
               color={"#475467"}
               fontWeight={'normal'}
               fontSize={{ base: 10, md: 14 }}
               fontFamily="InterRegular"
               display={'flex'}
               alignItems={'center'}
               gap={2}
               py={1}
              >
              10 years of Experience
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
        color={'#212121'}
        bg={'transparent'}
        p={0}
        m={0}
         onClick={() => handleCardClick()} 
         >
            <LuPencil size={14} />
        </Button>
         
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
           Bio
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

        {/* Other Info */}
          <Box shadow={'xl'} 
         mt={4} 
         rounded={20} 
         pb={4}
         bg={'#fff'} px={4} >
        <Heading 
         pt={5}
        pb={2}
        fontSize={17}
         w={'100%'}
        // textAlign={'center'}
        >
           Organization's URL
         </Heading>
             <HStack gap={4} flexWrap={'wrap'} spacing={6}>
                  <IoAttach/>
                  <Text display={'flex'} 
                  color={'#3B3B3B'}
                  fontSize={{base:10,md:13}}
                   
                  fontWeight={'500'}
                  alignItems={'center'}>
                   BabingtoMacaulayFoundation.experts.com
                  </Text>
                  
           </HStack>
        </Box>
        </Box>

        
        <EditOrganization
          isOpen={isOpen}
          onClose={handleClose}
        />
    </HStack>
  )
}

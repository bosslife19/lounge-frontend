import { Box, Button, Flex, HStack, Image, Stack, Text } from '@chakra-ui/react'
 import images from "../../../../assets/unlocked.png"
import { LuPencil } from 'react-icons/lu'
import logo from "../../../../assets/userImage.jpg";
import { IoIosNotificationsOutline } from 'react-icons/io';
import { SwitchPage } from '../../../components/switchPage/switch';
import { useState } from 'react';
import { UpdatePasword } from './modals/updatePassword';

export const RightSectionProfile = () => {
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
    <Box mb={'auto'} w={'100%'} >
        {/* profile name */}
        <Box 
        shadow={'xs'}
        bg={'#fff'} 
        rounded={10} p={6} 
        w={{base:'100%',xl:475}}
        border={'1px solid #EDEDF2'}>
        <Flex 
        alignItems={'center'}
        justifyContent={'space-between'}>
          <HStack >
           <IoIosNotificationsOutline size={20} />
              <Stack >
             <Text
               color={"#191919"}
               fontSize={{ base: 10, md: 14 }}
               fontFamily="InterBold"
              >
                 Become a Mentor
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
         </HStack>
         <SwitchPage/>
        </Flex>
        </Box>

        {/* Security */}
        <Box 
          mt={5}
        shadow={'xs'}
        bg={'#fff'} 
        rounded={10} p={5} 
        w={{base:'100%',xl:475}}
        border={'1px solid #EDEDF2'}>
        <Flex 
        alignItems={'center'}
        justifyContent={'space-between'}>
          <HStack >
            <Image
            src={images}
            alt="Update"
                //  boxSize={30}
            objectFit={'contain'}
             w={'15%'} />
              <Stack >
             <Text
               color={"#191919"}
               fontSize={{ base: 10, md: 14 }}
               fontFamily="InterBold"
              >
                 Security
              </Text>
             <Text
               mt={-3}
               color={"#475467"}
               fontWeight={'normal'}
               fontSize={{ base: 10, md: 14 }}
               fontFamily="InterRegular"
               py={1}
              >
                Change Password
             </Text>
            </Stack>
         </HStack>
         <Button onClick={handleCardClick} color={'#475367'} bg={'transparent'}>
          <LuPencil />
         </Button>
        </Flex>
        </Box>

        {/* Notification */}
        <Box 
        // mt={5}
        shadow={'xs'}
        bg={'#fff'} 
        rounded={10} p={6} 
        w={{base:'100%',xl:475}}
        border={'1px solid #EDEDF2'}>
        <Flex 
        alignItems={'center'}
        justifyContent={'space-between'}>
          <HStack >
           <IoIosNotificationsOutline size={20} />
              <Stack >
             <Text
               color={"#191919"}
               fontSize={{ base: 10, md: 14 }}
               fontFamily="InterBold"
              >
                 Notification
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
               Mute from non-transactional emails
             </Text>
        
          </Stack>
         </HStack>
         <SwitchPage/>
        </Flex>
        </Box>
        <UpdatePasword
         isOpen={isOpen}
         onClose={handleClose}
        />
    </Box>
  )
}

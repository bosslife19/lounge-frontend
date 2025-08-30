import { Box, Button, Field, Flex, Heading, HStack, Image, Input, InputGroup, List, Stack, Text } from '@chakra-ui/react'
 import images from "../../../../assets/course.png"
import { LuPencil } from 'react-icons/lu'
import tick from "../../../../assets/Verified tick.png";
import { FaBriefcase } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
// import { truncateText } from '../../../home/RightSide/mentorsCard';
import logo from "../../../../assets/Image.png";
import { truncateText } from '../../../../user/features/home/RightSide/mentorsCard';
import { RxDotsVertical } from 'react-icons/rx';
import { CiUser } from 'react-icons/ci';
import { MdOutlineEmail } from 'react-icons/md';
import { IoCallOutline } from 'react-icons/io5';
 
export const LeftSectionProfile = () => {

      
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
        //  onClick={() => handleCardClick()} 
         >
           <RxDotsVertical />
         </Button>
        
        </Flex>
         <Field.Root py={4}>
            <Field.Label
              fontWeight={'400'}
              fontSize={{base:11,md:14}}
              fontFamily="InterMedium"
              color={'#101928'} >Full Name</Field.Label>
               <InputGroup startElement={<CiUser/>}>
                   <Input  py={6} fontSize={{base:10,md:13}} 
                     placeholder="" />
                </InputGroup>
           </Field.Root>

            <Field.Root>
            <Field.Label
              fontWeight={'400'}
              fontSize={{base:11,md:14}}
              fontFamily="InterMedium"
              color={'#101928'} >Email</Field.Label>
               <InputGroup startElement={<MdOutlineEmail/>}>
                   <Input  py={6} 
                   type="email"
                   fontSize={{base:10,md:13}} 
                   placeholder="" />
                </InputGroup>
           </Field.Root>

           {/* button */}
              <HStack pt={4} w={'100%'}>
                <Button 
                    flex={0.4}
                      onClick={()=>onClose()}
                      py={6} 
                      px={{base:5,md:50}}
                      // w={{base:'35%'}}
                      bg={'#fff'} color={'#2B362F'} border={"1px solid #2B362F"} >
                        Cancel
                     </Button>
                 <Button
                 //   onClick={onFinish}
                  py={6}
                  flex={1}
                  // w={{ base: "100%" }}
                  rounded={5}
                  bg={"#2B362F"}
                  color="white"
                 >
                  Save Changes 
                </Button>
            </HStack>
        </Box>

        {/* Help Info */}
         <Box 
         mt={5}
        shadow={'xs'}
        bg={'#FCFCFC'} 
        rounded={10} p={3} 
        w={{base:'100%',xl:475}} 
        border={'1px solid #EDEDF2'}>
         
         <Field.Root py={4}>
            <Field.Label
              fontWeight={'400'}
              fontSize={{base:11,md:14}}
              fontFamily="InterMedium"
              color={'#101928'} >Email</Field.Label>
               <InputGroup startElement={<MdOutlineEmail/>}>
                   <Input type='email' py={6} fontSize={{base:10,md:13}} 
                     placeholder="" />
                </InputGroup>
           </Field.Root>

            <Field.Root>
            <Field.Label
              fontWeight={'400'}
              fontSize={{base:11,md:14}}
              fontFamily="InterMedium"
              color={'#101928'} >Phone Number</Field.Label>
               <InputGroup startElement={<IoCallOutline/>}>
                   <Input  py={6} 
                   type="number"
                   fontSize={{base:10,md:13}} 
                   placeholder="" />
                </InputGroup>
           </Field.Root>

           {/* button */}
              <HStack pt={4} w={'100%'}>
                <Button 
                    flex={0.4}
                      onClick={()=>onClose()}
                      py={6} 
                      px={{base:5,md:50}}
                      // w={{base:'35%'}}
                      bg={'#fff'} color={'#2B362F'} border={"1px solid #2B362F"} >
                        Cancel
                     </Button>
                 <Button
                 //   onClick={onFinish}
                  py={6}
                  flex={1}
                  // w={{ base: "100%" }}
                  rounded={5}
                  bg={"#2B362F"}
                  color="white"
                 >
                  Save Changes 
                </Button>
            </HStack>
        </Box>

       
    </Box>
  )
}

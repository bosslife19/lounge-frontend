import { Box, Heading,  HStack, Image, Text, Button, Stack } from "@chakra-ui/react";
import { Emojione_fire } from "../../../../assets/emojione_fire";
import divider from "../../../../assets/Divider.svg"
import { CiClock2 } from "react-icons/ci";
import logo from "../../../../assets/userImage.jpg";
import tick from "../../../../assets/check.png";
import lightdivider from "../../../../assets/lightDivider.png"

export function Card() {
  return (
    <Box
      w={'100%'}
      bg="#6C343314"
      // h={'100%'}
      pb={4}
      borderRadius="2xl"
       borderColor="gray.200"
    >
      {/* Card Title */}
      <Heading 
      fontSize={{base:'18px',md:"21px" }}
      mb={2} 
      px={5}
      pt={5}
      pb={2}   
      fontWeight={'extrabold'}
      fontFamily="LatoBold"
      display={'flex'} 
      gap={1} 
      justifyContent={'space-between'}
      alignItems={'center'} 
      flexDirection={'row'}
      >
        You have Matched <Emojione_fire/>
      </Heading>
      <Image
          src={divider}
          alt="Update"
          w={'100%'}
           borderRadius="md"
          // objectFit="cover"
        />
        <Stack
        px={6}
        pt={5}
        pb={2}
        >
          <Text fontSize={{base:12,md:13}} fontWeight={'bold'} fontFamily="InterMedium">
            Friday, 6 July
          </Text>
          <Text fontFamily="InterRegular" fontSize={{base:12,md:13}}  display={'flex'} color={'#475367'} gap={2} alignItems={'center'}>
          <CiClock2 />  11.30 - 12.00 (30 min)
          </Text>
        </Stack>
      <HStack  
      px={6}
      pt={5}
      pb={2}  
      spacing={4} 
      mb={4} 
      align="flex-start">
        <Stack position={'relative'}>
        <Image
          src={logo}
          alt="Update"
          boxSize="40px"
          borderRadius="md"
          objectFit="cover"
         
        />
         <Image
          src={tick}
          alt="tick"
          w={4}
           position={'absolute'}
           bottom={'-2'}
           right={'0'}
          borderRadius="md"
          objectFit="cover"
        />
        </Stack>
          
         <Stack>
          <Text fontSize={{base:11,md:15}} fontFamily="InterMedium">
            Friday, 6 July
          </Text>
        <Text mt={'-2'} fontSize={{base:11,md:12}} color="gray.700">
         General Practioner 
        </Text>
         </Stack>
      </HStack>

      <Image
          src={lightdivider}
          alt="Update"
          w={'100%'}
           borderRadius="md"
          // objectFit="cover"
        />

      {/* Footer button */}
     <Box 
       display={'flex'}
       justifyContent={'center'}
       px={10}
       w={'100%'}
       pt={4}
      >
       <Button fontSize={{base:8,md:13}}   colorScheme="blue" size="lg" rounded="lg" shadow="xs">
        Confirm Appointment
      </Button>
     </Box>
    </Box>
  );
}

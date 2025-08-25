import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Input,
  Button,
  Field,
  Fieldset,
  Stack,
   Text,
  Spinner,
  PinInput,
} from "@chakra-ui/react";
 
import LoungeLogo from "../../assets/Frame.png";
function Otp() {
   const [isLoading, setIsLoading] = useState(true);
 const [otp, setOtp] = useState("");
   const navigate = useNavigate()
 

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDashboard = () =>{
     navigate("/login")

  }

  if (isLoading) {
    return (
      <Flex
        align="center"
        justify="center"
        h="100vh"
        w="full"
        color="#0A2EE2"
      >
        <Spinner size="xl" thickness="4px" speed="0.65s" />
      </Flex>
    );
  }

  return (
    <Flex minH={{base:"100vh",lg:'100%'}} w="full" fontFamily="Poppins" overflow="hidden">
      {/* LEFT SIDE */}
      <Flex
        display={{ base: "none", lg: "flex" }}
        flexDir="column"
        justify="space-between"
        w={'45%'}
        px={2}
        py={2}
      >
        <Image src={LoungeLogo} alt="Lounge Logo" />
      </Flex>
     <Flex
        flex="1"
         bg="white"
        px={{ base: 6, md: 12 }}
        justify="center"
         mx={'auto'}
        align="center"
        flexDirection={'column'}
        >
        <Fieldset.Root  w={'100%'} size="lg" maxW={{base:'100%',lg:"lg"}} >
           <Stack mx={'auto'} >
             <Fieldset.Legend fontFamily={'inter'}  
                color={'rgba(27, 24, 24, 1)'} 
                fontWeight={'600'} 
                fontSize={{base:24,md:36}}>Verify your Account</Fieldset.Legend>
               <Flex fontSize="sm" color="gray.600" textAlign="center">
                 <Text
                  lineHeight={'40px'}
                   display={'flex'}
                  fontFamily={'inter'} 
                  fontSize={{base:12,md:14}}
                  color={'#645D5D'} >
                  Enter code sent to (simon**********@gmail.com)
             </Text>
          </Flex>
          </Stack>
      
        <PinInput.Root otp  fontFamily={'inter'} 
        onComplete={(value) => setOtp(value)} // when all digits are entered
         onValueChange={(value) => console.log("Current value:", value)}  // live changes
         mx={{base:'1',md:'auto'}}>
      <PinInput.HiddenInput  />
      <PinInput.Control >
        <PinInput.Input w={16} index={0} />
        <PinInput.Input w={16} index={1} />
        <PinInput.Input w={16} index={2} />
        <PinInput.Input w={16} index={3} />
      </PinInput.Control>
      </PinInput.Root>
      <Text 
        lineHeight={'40px'}
         fontFamily={'inter'} 
         mx={'auto'}
        fontSize={{base:12,md:14}}
        color={'#645D5D'} >
        Didn’t receive code?
        <Box
         as={RouterLink}
          to={'#'}
         fontWeight={'600'} 
          fontSize={{base:12,md:14}}
            fontFamily={'inter'}  
            color="#2B362F"
            ml={1} 
             _hover={{ textDecoration: "underline" }}
             >
               Resend Code
           </Box>
         </Text>
         <Button  fontFamily={'inter'}  maxW={'70%'} mx={'auto'} onClick={handleDashboard} alignSelf="flex-start" w={'100%'} py={7} rounded={5}>
        Enter
      </Button>
      </Fieldset.Root>
      </Flex>
      
     </Flex>
  );
}

export default Otp;

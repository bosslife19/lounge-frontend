import React, { useContext, useEffect, useState } from "react";
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
} from "@chakra-ui/react";

import LoungeLogo from "../../assets/Frame.png";
import Google from "../../assets/google.png";
import divder from "../../assets/Dividers.svg";
import { BiHide, BiShow } from "react-icons/bi";
import { GoogleLogin } from "@react-oauth/google";
import { m } from "framer-motion";
import { toast } from "react-toastify";
import { useRequest } from "../../hooks/useRequest";
import { AuthContext } from "../../context/AuthContext";
import axiosClient from "../../axiosClient";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const nameRef = React.useRef();
  const { loading, success, error, makeRequest } = useRequest();
  const emailRef = React.useRef();
  const { setUserDetails } = useContext(AuthContext);
  const passwordRef = React.useRef();
<<<<<<< HEAD
  const navigate = useNavigate()
  const passwordRepeatRef = React.useRef('');
=======
  const navigate = useNavigate();
>>>>>>> 5a9c440e2f60e0b1db4f4ebf1e29f002e9fd7a2c

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

<<<<<<< HEAD
  const handleSignup = async () =>{

    if( !emailRef.current.value || !passwordRef.current.value){
     
       toast.error('All fields are required')
      
      return;
    }
    if(passwordRef.current.value !== passwordRepeatRef.current.value){
      return toast.error("Your Passwords don't match. Please check and try again");
    }
try {
      const res = await makeRequest('/register', {
      
      email: emailRef.current.value,
      password: passwordRef.current.value
    })
=======
  const handleSignup = async () => {
    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value
    ) {
      toast.error("All fields are required");

      return;
    }
    try {
      const res = await makeRequest("/register", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
>>>>>>> 5a9c440e2f60e0b1db4f4ebf1e29f002e9fd7a2c

      if (res.response) {
        toast.success(res.response.message);
        setUserDetails(res.response.user);
        setTimeout(() => {
          return navigate("/otp");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
<<<<<<< HEAD

} catch (error) {
  console.log(error);
  toast.error('Server Error')
}


   

    
  }
   const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;



    // Send to your Laravel backend
    try {
      
      const res = await axiosClient.post('/google', {token});
      if(res.error) return toast.error(res.error);
        if(res.data.status){
      toast.success('Sign Up Successful');
      localStorage.setItem('ACCESS_TOKEN', res.data.token)
      setUserDetails(res.data.user);
      setTimeout(()=>{
return navigate('/dashboard');
      }, 2000);
      
    }

    } catch (error) {
      console.log(error);
      alert('Error');
    }
    

   
=======
>>>>>>> 5a9c440e2f60e0b1db4f4ebf1e29f002e9fd7a2c
  };
  if (isLoading) {
    return (
      <Flex align="center" justify="center" h="100vh" w="full" color="#0A2EE2">
        <Spinner size="xl" thickness="4px" speed="0.65s" />
      </Flex>
    );
  }

  return (
    <Flex
      minH={{ base: "100vh", lg: "100%" }}
      w="full"
      fontFamily="Poppins"
      overflow="hidden"
    >
      {/* LEFT SIDE */}
      <Flex
        display={{ base: "none", lg: "flex" }}
        flexDir="column"
        justify="space-between"
        w={"45%"}
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
        align="center"
      >
<<<<<<< HEAD
        <Fieldset.Root  w={'100%'} size="lg" maxW={{base:'100%',lg:"lg"}}>
        <Stack >
        <Fieldset.Legend fontFamily={'inter'}  
        color={'rgba(27, 24, 24, 1)'} 
        fontWeight={'600'} 
        fontSize={{base:24,md:36}}>Hi there!</Fieldset.Legend>
         <Flex fontSize="sm" color="gray.600" textAlign="center">
            <Text 
            lineHeight={'40px'}
            fontFamily={'inter'} 
             fontSize={{base:12,md:14}}
            color={'#645D5D'} >
              Already have an account?{" "}
              <Box
                as={RouterLink}
                to="/login"
                fontWeight={'600'} 
                fontSize={{base:12,md:14}}
                fontFamily={'inter'}  
                color="#2B362F"
                
                _hover={{ textDecoration: "underline" }}
              >
               Login
              </Box>
            </Text>
            
         </Flex>
      </Stack>
      <Fieldset.Content>
        {/* <Field.Root   fontFamily={'inter'}  >
        <Field.Label   
         color={'rgba(27, 24, 24, 1)'} 
         fontWeight={'500'} 
       
         fontSize={{base:12,md:14}}
        >Name
        </Field.Label>
          <Input name="name" type="text" 
          ref={nameRef}
          
          py={{base:3,md:7}} />
        </Field.Root> */}
=======
        <Fieldset.Root w={"100%"} size="lg" maxW={{ base: "100%", lg: "lg" }}>
          <Stack>
            <Fieldset.Legend
              fontFamily={"inter"}
              color={"rgba(27, 24, 24, 1)"}
              fontWeight={"600"}
              fontSize={{ base: 24, md: 36 }}
            >
              Hi there!
            </Fieldset.Legend>
            <Flex fontSize="sm" color="gray.600" textAlign="center">
              <Text
                lineHeight={"40px"}
                fontFamily={"inter"}
                fontSize={{ base: 12, md: 14 }}
                color={"#645D5D"}
              >
                Already have an account?{" "}
                <Box
                  as={RouterLink}
                  to="/login"
                  fontWeight={"600"}
                  fontSize={{ base: 12, md: 14 }}
                  fontFamily={"inter"}
                  color="#2B362F"
                  _hover={{ textDecoration: "underline" }}
                >
                  Login
                </Box>
              </Text>
            </Flex>
          </Stack>
          <Fieldset.Content>
            <Field.Root fontFamily={"inter"}>
              <Field.Label
                color={"rgba(27, 24, 24, 1)"}
                fontWeight={"500"}
                fontSize={{ base: 12, md: 14 }}
              >
                Name
              </Field.Label>
              <Input
                name="name"
                type="text"
                ref={nameRef}
                py={{ base: 3, md: 7 }}
              />
            </Field.Root>
>>>>>>> 5a9c440e2f60e0b1db4f4ebf1e29f002e9fd7a2c

            <Field.Root fontFamily={"inter"}>
              <Field.Label
                color={"rgba(27, 24, 24, 1)"}
                fontWeight={"500"}
                fontSize={{ base: 12, md: 14 }}
              >
                Email address
              </Field.Label>
              <Input
                name="email"
                type="email"
                ref={emailRef}
                py={{ base: 3, md: 7 }}
              />
            </Field.Root>

            <Field.Root fontFamily={"inter"}>
              <Field.Label
                color={"rgba(27, 24, 24, 1)"}
                fontWeight={"500"}
                fontSize={{ base: 12, md: 14 }}
              >
                Password
              </Field.Label>
              <Input
                name="password"
                position={"relative"}
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                py={{ base: 3, md: 7 }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute  bottom-0  right-4 -translate-y-1/2 cursor-pointer text-gray-500 flex items-center gap-1 text-sm"
              >
                {showPassword ? (
                  <>
                    <BiShow /> Show
                  </>
                ) : (
                  <>
                    <BiHide /> Hide
                  </>
                )}
              </span>
            </Field.Root>
          </Fieldset.Content>

          <Button
            disabled={loading}
            fontFamily={"inter"}
            onClick={handleSignup}
            alignSelf="flex-start"
            w={"100%"}
            py={7}
            rounded={5}
          >
<<<<<<< HEAD
          {showPassword ? (
         <>
            <BiShow /> Show
         </>
           ) : (
            <>
          <BiHide /> Hide
         </>
         )}
       </span>
        </Field.Root>

        <Field.Root   fontFamily={'inter'}  >
          <Field.Label 
          color={'rgba(27, 24, 24, 1)'} 
         fontWeight={'500'} 
         fontSize={{base:12,md:14}}>
          Input Password Again</Field.Label>
          <Input name="password" 
          position={'relative'}
          ref={passwordRepeatRef}

           type={showPasswordRepeat ? "text" : "password"}
           py={{base:3,md:7}}  />
            <span
             onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
            className="absolute  bottom-0  right-4 -translate-y-1/2 cursor-pointer text-gray-500 flex items-center gap-1 text-sm"
          >
          {showPasswordRepeat ? (
         <>
            <BiShow /> Show
         </>
           ) : (
            <>
          <BiHide /> Hide
         </>
         )}
       </span>
        </Field.Root>
        
      </Fieldset.Content>
=======
            {loading ? <Spinner /> : "Sign up"}
          </Button>
          <Text
            lineHeight={"40px"}
            fontFamily={"inter"}
            mx={"auto"}
            fontSize={{ base: 12, md: 14 }}
            color={"#645D5D"}
          >
            Forgot Password?
            <Box
              as={RouterLink}
              to={"#"}
              fontWeight={"600"}
              fontSize={{ base: 12, md: 14 }}
              fontFamily={"inter"}
              color="#2B362F"
              ml={1}
              _hover={{ textDecoration: "underline" }}
            >
              Recover
            </Box>
          </Text>
>>>>>>> 5a9c440e2f60e0b1db4f4ebf1e29f002e9fd7a2c

          <Image src={divder} />
<<<<<<< HEAD
        {/* <Button bg={'transparent'} type="submit" alignSelf="flex-start" w={'100%'} py={7} rounded={5}>
         <Image src={Google} />
         </Button> */}
           <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
       </Fieldset.Root>
=======
          <Button
            bg={"transparent"}
            type="submit"
            alignSelf="flex-start"
            w={"100%"}
            py={7}
            rounded={5}
          >
            <Image src={Google} />
          </Button>
        </Fieldset.Root>
>>>>>>> 5a9c440e2f60e0b1db4f4ebf1e29f002e9fd7a2c
      </Flex>
    </Flex>
  );
}

export default SignUp;

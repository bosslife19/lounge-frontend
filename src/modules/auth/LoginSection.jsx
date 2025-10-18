import React, { useContext, useEffect, useRef, useState } from "react";
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
  Heading,
  HStack,
} from "@chakra-ui/react";

import LoungeLogo from "../../assets/Image.png";
import Google from "../../assets/google.png";
import { GoogleLogin } from "@react-oauth/google";
import divder from "../../assets/Dividers.svg";
import { BiHide, BiShow } from "react-icons/bi";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import axiosClient from "../../axiosClient";
// import Notfyimage from "../../assets/btn.png";
// import Notfyimage from "../../assets/userImage.jpg";
import Notfyimage from "../../assets/lougelogos.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const emailRef = useRef("");
  const { makeRequest, loading } = useRequest();
  const { setUserDetails } = useContext(AuthContext);
  const passwordRef = useRef("");
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    // Send to your Laravel backend
    try {
      const res = await axiosClient.post("/google", { token });
      if (res.error) return toast.error(res.error);
      if (res.data.status) {
        toast.success("Login Successful");
        localStorage.setItem("ACCESS_TOKEN", res.data.token);
        setUserDetails(res.data.user);
        setTimeout(() => {
          return navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  };

  const handleLogin = async () => {
    if (!emailRef.current.value || !passwordRef.current.value) {
      return toast.error("All fields are required");
    }
    const res = await makeRequest("/login", {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    localStorage.setItem("ACCESS_TOKEN", res.response.token);
    setUserDetails(res.response.user);
    toast.success("Login Successful");

    setTimeout(() => {
      if (res.response.user.role === "admin") {
        return navigate("/admin/dashboard");
      }
      navigate("/dashboard");
    }, 2000);
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
      h={{ base: "100vh", lg: "100%" }}
      w="full"
      fontFamily="Poppins"
      overflow="hidden"
      py={{ base: 5, lg: 0 }}
    >
      {/* LEFT SIDE */}
      <Flex
        display={{ base: "none", lg: "flex" }}
        flexDir="column"
        justify="space-between"
        w={"45%"}
        px={5}
        py={5}
      >
        <Box
          h={{ base: "100vh", xl: "50vw" }}
          bg="#000"
          p={6}
          borderRadius={"30px"}
          textAlign={"center"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          display={"flex"}
        >
          <Stack>
            <HStack alignItems={"center"}>
              <Image
                src={Notfyimage}
                alt="Lounge Logo"
                w={{ base: "10px", md: "40px" }}
                className="object-cover  rounded-full"
              />
              <Text
                color="#fff"
                fontSize={{ base: "15px", md: "24px" }}
                fontWeight="bold"
                textAlign={"left"}
                fontFamily={"LatoBold"}
              >
                THE LOUNGE
              </Text>
            </HStack>
            <Flex
              maxWidth={{ base: "70%" }}
              align="flex-start"
              flexWrap="wrap"
              mr={"auto"}
              mt={"15%"}
              gap={{ base: 2, md: 4 }}
              fontFamily={"LatoBold"}
            >
              <Text
                color="#fff"
                fontSize={{ base: "15px", md: "36px" }}
                fontWeight="bold"
                textAlign={"left"}
                lineHeight={"45px"}
                // mt={"-2"}
              >
                Elevate your journey as a Founder with{" "}
              </Text>
              <Text
                color="#6C3433"
                fontWeight="extrabold"
                fontSize={{ base: "15px", md: "36px" }}
                textAlign={"left"}
                borderRadius="md"
                mt={"-5"}
              >
                THE LOUNGE
              </Text>
            </Flex>

            <Text
              mt={4}
              textAlign={"left"}
              fontSize={{
                base: "12px",
                md: "18px",
              }}
              color={"#E4DBDB"}
              fontFamily={"LatoRegular"}
            >
              Access exclusive resources, expert insights, and a network of
              peers who believe in building together. Welcome to The Lounge —
              your space to learn, grow, and thrive with AiDiA.{" "}
            </Text>
          </Stack>

          <Box p={5} rounded={"20px"} bg={"#3E3838"}>
            <Text
              textAlign={"left"}
              fontSize={{
                base: "12px",
                md: "15px",
              }}
              color={"#F0E6E6"}
              fontFamily={"LatoRegular"}
            >
              Through The Lounge, I’ve met founders and mentors who truly
              understand my challenges. Every session, every conversation brings
              new perspectives — it’s like having an entire community behind
              your growth.
            </Text>
            <HStack textAlign={"left"} mt={2.8}>
              <Image
                src={LoungeLogo}
                alt="User Photo"
                w={"30px"}
                h={"30px"}
                borderRadius={"full"}
                className="object-cover"
              />
              <Stack mt={1}>
                <Text
                  color={"#fff"}
                  fontFamily={"LatoBold"}
                  fontWeight={"bold"}
                  fontSize={{ base: "10px", md: "12px" }}
                >
                  Jane Cooper
                </Text>
                <Text
                  color={"#A29999"}
                  fontFamily={"LatoRegular"}
                  mt={"-8px"}
                  fontSize={{ base: "10px", md: "11px" }}
                >
                  Product Designer at Acme Inc
                </Text>
              </Stack>
            </HStack>
          </Box>
        </Box>
        {/* <Image src={LoungeLogo} alt="Lounge Logo" /> */}
      </Flex>
      {/* Right Side */}
      <Flex
        flex="1"
        bg="white"
        px={{ base: 6, md: 12 }}
        justify="center"
        align="center"
      >
        <Fieldset.Root w={"100%"} size="lg" maxW={{ base: "100%", lg: "lg" }}>
          <Stack>
            <Fieldset.Legend
              fontFamily={"inter"}
              color={"rgba(27, 24, 24, 1)"}
              fontWeight={"600"}
              fontSize={{ base: 24, md: 36 }}
            >
              Welcome back!
            </Fieldset.Legend>
            <Flex fontSize="sm" color="gray.600" textAlign="center">
              <Text
                lineHeight={"40px"}
                fontFamily={"inter"}
                fontSize={{ base: 12, md: 14 }}
                color={"#645D5D"}
              >
                Don’t have an account?{" "}
                <Box
                  as={RouterLink}
                  to="/Signup"
                  fontWeight={"600"}
                  fontSize={{ base: 12, md: 14 }}
                  fontFamily={"inter"}
                  color="#2B362F"
                  _hover={{ textDecoration: "underline" }}
                >
                  Sign Up
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
            fontFamily={"inter"}
            onClick={handleLogin}
            alignSelf="flex-start"
            w={"100%"}
            py={7}
            rounded={5}
          >
            {loading ? <Spinner /> : "Login"}
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
              to={"/forgot-password"}
              ml={1}
              fontWeight={"600"}
              fontSize={{ base: 12, md: 14 }}
              fontFamily={"inter"}
              color="#2B362F"
              _hover={{ textDecoration: "underline" }}
            >
              Recover
            </Box>
          </Text>

          <Image src={divder} />
          {/* <Button
            bg={"transparent"}
            type="submit"
            alignSelf="flex-start"
            w={"100%"}
            py={7}
            rounded={5}
          >
            <Image src={Google} />
          </Button> */}
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Login Failed")}
          />
        </Fieldset.Root>
      </Flex>
    </Flex>
  );
}

export default Login;

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
  PinInput,
  HStack,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import Notfyimage from "../../assets/lougelogos.png";

import LoungeLogo from "../../assets/Image.png";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";
import { useRef } from "react";
function Otp() {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { userDetails } = useContext(AuthContext);

  const { makeRequest, loading } = useRequest();
  const otpRef = useRef("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleResendCode = async () => {
    const res = await makeRequest("/resend-email-otp", {
      email: userDetails?.email,
    });

    toast.success(res.response.message);
  };
  function maskEmail(email) {
    let [username, domain] = email.split("@");

    if (username.length > 5) {
      // Keep first 5 characters, replace the rest with *
      username = username.substring(0, 5) + "*".repeat(username.length - 5);
    } else {
      // If username is shorter, just keep first character
      username = username[0] + "*".repeat(username.length - 1);
    }

    return `${username}@${domain}`;
  }
  const handleVerifyOtp = async () => {
    if (otpRef.current.length < 4) {
      return toast.error("Please enter a valid 4-digit code");
    }
    const res = await makeRequest("/verify-email", {
      code: Number(otpRef.current),
    });

    if (res.error) return;

    toast.success(res.response.message);
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
      <Flex
        flex="1"
        bg="white"
        px={{ base: 6, md: 12 }}
        justify="center"
        mx={"auto"}
        align="center"
        flexDirection={"column"}
      >
        <Fieldset.Root w={"100%"} size="lg" maxW={{ base: "100%", lg: "lg" }}>
          <Stack mx={"auto"}>
            <Fieldset.Legend
              fontFamily={"inter"}
              color={"rgba(27, 24, 24, 1)"}
              fontWeight={"600"}
              fontSize={{ base: 24, md: 36 }}
            >
              Verify your Account
            </Fieldset.Legend>
            <Flex fontSize="sm" color="gray.600" textAlign="center">
              <Text
                lineHeight={"40px"}
                display={"flex"}
                fontFamily={"inter"}
                fontSize={{ base: 12, md: 14 }}
                color={"#645D5D"}
              >
                Enter code sent to{" "}
                {userDetails ? maskEmail(userDetails.email) : "your email"}
              </Text>
            </Flex>
          </Stack>

          <PinInput.Root
            otp
            fontFamily={"inter"}
            onValueChange={(value) => {
              otpRef.current = value.valueAsString;
            }} // live changes
            mx={{ base: "1", md: "auto" }}
          >
            <PinInput.HiddenInput />
            <PinInput.Control>
              <PinInput.Input w={16} index={0} />
              <PinInput.Input w={16} index={1} />
              <PinInput.Input w={16} index={2} />
              <PinInput.Input w={16} index={3} />
            </PinInput.Control>
          </PinInput.Root>
          <Text
            lineHeight={"40px"}
            fontFamily={"inter"}
            mx={"auto"}
            fontSize={{ base: 12, md: 14 }}
            color={"#645D5D"}
          >
            Didn’t receive code?
            <Box
              as={RouterLink}
              to={"#"}
              onClick={handleResendCode}
              fontWeight={"600"}
              fontSize={{ base: 12, md: 14 }}
              fontFamily={"inter"}
              color="#2B362F"
              ml={1}
              _hover={{ textDecoration: "underline" }}
            >
              Resend Code
            </Box>
          </Text>
          <Button
            fontFamily={"inter"}
            maxW={"70%"}
            mx={"auto"}
            onClick={handleVerifyOtp}
            alignSelf="flex-start"
            w={"100%"}
            py={7}
            rounded={5}
          >
            {loading ? (
              <Spinner size="md" thickness="4px" speed="0.65s" color="white" />
            ) : (
              "Verify Account"
            )}
          </Button>
        </Fieldset.Root>
      </Flex>
    </Flex>
  );
}

export default Otp;

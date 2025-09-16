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
} from "@chakra-ui/react";

import LoungeLogo from "../../assets/Frame.png";
import Google from "../../assets/google.png";
import divder from "../../assets/Dividers.svg";
import { BiHide, BiShow } from "react-icons/bi";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

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
        <Fieldset.Root w={"100%"} size="lg" maxW={{ base: "100%", lg: "lg" }}>
          <Stack>
            <Fieldset.Legend
              fontFamily={"inter"}
              color={"rgba(27, 24, 24, 1)"}
              fontWeight={"600"}
              fontSize={{ base: 24, md: 36 }}
            >
              Welcome Back!
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
      </Flex>
    </Flex>
  );
}

export default Login;

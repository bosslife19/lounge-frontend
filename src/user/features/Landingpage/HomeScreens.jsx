import { Box, Button } from "@chakra-ui/react";
import landingpage from "../../../assets/bgimagecov.jpeg";
import { useNavigate } from "react-router-dom";

export const HomeScreens = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <Box
      minH="100vh" // ensures it can expand if content grows
      w="100%" // full width
      bgImage={`url(${landingpage})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      position="relative"
      overflowY="auto" // makes content scrollable
    >
      {/* Example scrollable content */}
      <Box
        p={{ base: 4, md: 8 }}
        // maxW="container.lg"
        // mx="auto"
        mt={{ base: 60, md: 80 }}
        textAlign="center"
      >
        <Button
          onClick={handleGetStarted}
          bg="#fff"
          color="#000"
          position={"absolute"}
          bottom={5}
          left={5}
          fontFamily={"nunitoSemiBold"}
          borderRadius="50px"
          px={{ base: 10, md: 10 }}
          py={{ base: 3, md: 4 }}
          fontSize={{ base: "md", md: "lg" }}
          // _hover={{ bg: "#222" }}
        >
          Discover Platform
        </Button>
      </Box>

      {/* Optional extra content to test scroll */}
      <Box h={{ base: "100%", md: "120%" }} />
    </Box>
  );
};

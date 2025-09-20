import { Box, Button, Image } from "@chakra-ui/react";
import landingpage from "../../../assets/bgimagecov.jpeg";
import { Link, useNavigate } from "react-router-dom";

export const HomeScreens = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <Link to={"/login"}>
      <Box
        w="100%" // full width
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        position="relative"
        overflowY="auto" // makes content scrollable
      >
        <Image src={landingpage} w={"100%"} />

        {/* Optional extra content to test scroll */}
      </Box>
    </Link>
  );
};

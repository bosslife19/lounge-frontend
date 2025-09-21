import { Box } from "@chakra-ui/react";
import React from "react";
import { Card } from "./RightSide/Card";
import MentorsBoxPage from "./RightSide/mentorsCard";

export const RightSection = () => {
  return (
    <Box flex={1} bg={"#fff"} mb={{ base: 2, md: 10 }} p={5}>
      <Card />
      <MentorsBoxPage />
    </Box>
  );
};

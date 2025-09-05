import { Box } from "@chakra-ui/react";
import React from "react";
import { Card } from "./RightSide/Card";
import MentorsBoxPage from "./RightSide/mentorsCard";

export const RightSection = () => {
  return (
    <Box flex={1} bg={"#fff"} p={5}>
      <Card />
      <MentorsBoxPage />
    </Box>
  );
};

import { Box } from "@chakra-ui/react";
import React from "react";
import { Card } from "./RightSide/Card";
import MentorsBoxPage from "./RightSide/mentorsCard";
import Avatar from "../../components/header/Avatar";

export const RightSection = () => {
  return (
    <Box
      shadow={{ base: "none", xl: "md" }}
      // shadowColor={"bg.muted"}
      flex={1}
      boxShadowColor={"bg.#080F340F"}
      bg={"#fff"}
      // mb={{ base: 2, md: 10 }}
    >
      <Box
        display={{ base: "none", xl: "block" }}
        ml={"auto"}
        justifyContent={"flex-end"}
        className="flex items-center gap-5"
        // bg={"#fff"}
        pt={1}
        px={"6%"}
        pb={2}
      >
        <Box className="border-l-2 pl-4">
          {/* <button onClick={() => toggleDropdown("avatar")}> */}
          <Avatar />
          {/* </button> */}
        </Box>
      </Box>
      <Box pl={5} pr={{ base: 0, xl: 5 }} py={{ base: 0, xl: 5 }}>
        <Card />
        <MentorsBoxPage />
      </Box>
    </Box>
  );
};

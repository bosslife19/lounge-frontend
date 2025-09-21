import { Box, Flex, Heading } from "@chakra-ui/react";
import { Accordions } from "../../../components/accordion/Accordion";
import { Complaints } from "./Complaints";

export const SettingHelp = () => {
  return (
    <Box px={{ base: 4, md: 10 }} h={"100vh"}>
      <Heading fontFamily="InterBold" fontSize={{ base: "12px", md: 14 }}>
        FAQS
      </Heading>
      <Flex
        flexDirection={{ base: "column", lg: "row" }}
        gap={5}
        alignItems={"center"}
      >
        <Accordions />
        <Complaints />
      </Flex>
    </Box>
  );
};

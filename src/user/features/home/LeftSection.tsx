import { Box } from "@chakra-ui/react";
import { Banner } from "./leftSections/Banner";
import NewsUpdate from "./leftSections/NewsUpdate";
import CommunityPost from "./leftSections/CommunityPost";
import { BottomBanner } from "./leftSections/BottomBanner";

const LeftSection = () => {
  return (
    <Box
      w={{ base: "100%", xl: "70%" }}
      // h={{ base: "100%" }}
      flexDirection={"column"}
      // gap={4}
      pl={6}
      pr={{ base: 6, xl: 2 }}
      display={"flex"}
      py={{ base: 3, xl: "6%" }}
    >
      <Banner />
      <NewsUpdate />
      <CommunityPost />
      <BottomBanner />
    </Box>
  );
};

export default LeftSection;

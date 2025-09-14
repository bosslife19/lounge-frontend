import { Box } from "@chakra-ui/react";
import { Banner } from "./leftSections/Banner";
import NewsUpdate from "./leftSections/NewsUpdate";
import CommunityPost from "./leftSections/CommunityPost";
import { BottomBanner } from "./leftSections/BottomBanner";

const LeftSection = () => {
  return (
    <Box
      w={{ base: "100%", xl: "70%" }}
      flexDirection={"column"}
      gap={5}
      display={"flex"}
    >
      <Banner />
      {/* <NewsUpdate /> */}
      <CommunityPost />
      <BottomBanner />
    </Box>
  );
};

export default LeftSection;

import { Box, HStack } from "@chakra-ui/react";
import { LeftSectionProfile } from "./Leftsection";
import { RightSectionProfile } from "./RightSection";
// import { CoffeeRouletteIntro } from "./CoffeeRouletteIntro";
import { useState, useEffect } from "react";
import { CoffeeRouletteIntro } from "../coffeModal/CoffeModal";

export const SettingsProfile = () => {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if modal has already been shown
    const hasSeenIntro = localStorage.getItem("coffeeRouletteIntroSeen");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  const handleCloseIntro = () => {
    setShowIntro(false);
    localStorage.setItem("coffeeRouletteIntroSeen", "true");
  };

  return (
    <Box height={"100%"}>
      <HStack
        flexDirection={{ base: "column", xl: "row" }}
        justifyContent={"space-between"}
        gap={5}
        px={5}
        py={2}
      >
        <LeftSectionProfile />
        <RightSectionProfile />
      </HStack>

      {/* Coffee Roulette Popup */}
      <CoffeeRouletteIntro isOpen={showIntro} onClose={handleCloseIntro} />
    </Box>
  );
};

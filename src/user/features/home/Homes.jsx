"use client";

import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import LeftSection from "./LeftSection";
import { RightSection } from "./RightSection";
import { FirstModal } from "./modal/firstmodal";
import { CreateProfile } from "./modal/CreateProfile";
import { FinishProfile } from "./modal/FinishProfile"; // <-- new modal
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Homes = () => {
  const [isOpen, setIsOpen] = useState(false); // First modal
  const [isCreateOpen, setIsCreateOpen] = useState(false); // Second modal
  const [isFinishOpen, setIsFinishOpen] = useState(false); // Third modal
  const { userDetails } = useContext(AuthContext);
  // Show first popup automatically when page loads
  useEffect(() => {
    if (userDetails?.profile_status === "incomplete") {
      setIsOpen(true);
    }
  }, []);

  // Step 1 -> Step 2
  const handleStartCreating = () => {
    setIsOpen(false);
    setIsCreateOpen(true);
  };

  // Step 2 -> Step 3
  const handleFinishCreating = () => {
    setIsCreateOpen(false);
    setIsFinishOpen(true);
  };

  return (
    <>
      {/* Page layout */}
      <Flex
        // bg={"#F5F6FA"}
        h={"100%"}
        gap={6}
        flexDir={{ base: "column", xl: "row" }}
        justifyContent={"space-between"}
      >
        <LeftSection />
        <RightSection />
      </Flex>

      {/* First Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]">
          <FirstModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onStartCreating={handleStartCreating} // next step
          />
        </div>
      )}

      {/* Create Profile Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]">
          <CreateProfile
            isOpen={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
            onFinish={handleFinishCreating} // next step
          />
        </div>
      )}

      {/* Finish Profile Modal */}
      {isFinishOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]">
          <FinishProfile
            isOpen={isFinishOpen}
            onClose={() => setIsFinishOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default Homes;

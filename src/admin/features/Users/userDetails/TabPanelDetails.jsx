import { Button, Flex, HStack, Tabs, Text } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
// import { PersonalInfo } from "./PersonalInfo";
// import { BonusPoints } from "./BonusPoints";
import { FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { PersonalInfo } from "./PersonalInfor";
import BonusPoints from "./BonusPoints";
import { MentorListing } from "./MentorListingDetails";
import { PostAdminDetails } from "./PostDetails";
// import { CreateNewUser } from "./modal/CreateUser";

export const UserDetailsTabpanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Tabs.Root bg="#FDFDFD" defaultValue="PersonalInfo">
      <Flex
        alignItems={"center"}
        pt={{ base: 1, md: 0 }}
        justifyContent={"space-between"}
      >
        {/* Tabs */}
        <Tabs.List whiteSpace={"nowrap"}>
          <Tabs.Trigger
            _selected={{ color: "#2B362F" }}
            fontSize={{ base: 10, md: 13 }}
            color={"#999999"}
            value="PersonalInfo"
          >
            Personal Info
          </Tabs.Trigger>

          <Tabs.Trigger
            _selected={{ color: "#2B362F" }}
            color={"#999999"}
            fontSize={{ base: 10, md: 13 }}
            value="BonusPoints"
          >
            Bonus points
          </Tabs.Trigger>

          <Tabs.Trigger
            _selected={{ color: "#2B362F" }}
            color={"#999999"}
            fontSize={{ base: 10, md: 13 }}
            value="MentorListing"
          >
            Mentor Listing
          </Tabs.Trigger>

          <Tabs.Trigger
            _selected={{ color: "#2B362F" }}
            color={"#999999"}
            fontSize={{ base: 10, md: 13 }}
            value="Post"
          >
            Post
          </Tabs.Trigger>
        </Tabs.List>
      </Flex>

      {/* Tab Contents */}
      <Tabs.Content value="PersonalInfo">
        <PersonalInfo />
      </Tabs.Content>
      <Tabs.Content value="BonusPoints">
        <BonusPoints />
      </Tabs.Content>
      <Tabs.Content value="MentorListing">
        <MentorListing />
      </Tabs.Content>
      <Tabs.Content value="Post">
        <PostAdminDetails />
      </Tabs.Content>
    </Tabs.Root>
  );
};

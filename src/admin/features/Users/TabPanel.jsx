import { Button, Flex, HStack, Tabs, Text } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import { Members } from "./Members";
import { Organization } from "./Organization";
import { FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { CreateNewUser } from "./modal/CreateUser";

export const DashboardTabpanel = () => {
  return (
    <Tabs.Root bg="#FDFDFD" defaultValue="Members">
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
            value="Members"
          >
            Members
          </Tabs.Trigger>

          <Tabs.Trigger
            _selected={{ color: "#2B362F" }}
            color={"#999999"}
            fontSize={{ base: 10, md: 13 }}
            value="Organization"
          >
            Organization
          </Tabs.Trigger>
        </Tabs.List>
      </Flex>

      {/* Tab Contents */}
      <Tabs.Content value="Members">
        <Members />
      </Tabs.Content>
      <Tabs.Content value="Organization">
        <Organization />
      </Tabs.Content>
    </Tabs.Root>
  );
};

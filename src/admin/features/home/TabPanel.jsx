import { useState } from "react";
import { Box, Button, Flex, HStack, Tabs, Text } from "@chakra-ui/react";
import { LuCalendarDays } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
// import { MentorApplication } from "./MentorApplication";
import { NewOrganization } from "./NewOrganization";
import { RewardReq } from "./RewardRequire";
import { MentorApplication } from "./MentorApplication";

export const DashboardTabpanel = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Tabs.Root bg="#F5F6FA" defaultValue="MentorApplication">
      <Flex
        flexWrap={"wrap"}
        overflowx={"auto"}
        pt={5}
        justifyContent={"space-between"}
      >
        {/* Tabs */}
        <Tabs.List
          flexWrap={"wrap"}
          whiteSpace={{ base: "nowrap", md: "nowrap" }}
        >
          <Tabs.Trigger
            _selected={{ color: "#2B362F" }}
            color={"#999999"}
            fontSize={{ base: "11px", md: "14px" }}
            value="MentorApplication"
          >
            Mentor Application
          </Tabs.Trigger>
          <Tabs.Trigger
            _selected={{ color: "#2B362F" }}
            color={"#999999"}
            fontSize={{ base: "11px", md: "14px" }}
            value="NewOrganization"
          >
            New Organization
            {/* <Box 
            bg={'#F56630'} 
            px={3} 
            color={'#fff'} 
            rounded={'full'}>
              2
            </Box> */}
          </Tabs.Trigger>
          <Tabs.Trigger
            _selected={{ color: "#2B362F" }}
            color={"#999999"}
            fontSize={{ base: "11px", md: "14px" }}
            value="RewardRequest"
          >
            Reward Request
            {/* <Box 
            bg={'#F56630'} 
            px={3} 
            color={'#fff'} 
            rounded={'full'}>
              2
            </Box> */}
          </Tabs.Trigger>
        </Tabs.List>

        {/* Calendar Date Selector */}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          customInput={
            <Button
              size={{ base: "10", md: "sm" }}
              border={`1px solid #333`}
              rounded={20}
              p={1}
              mt={{ base: 2, md: 0 }}
              color={"#333"}
              bg="#fff"
              _hover={{ bg: "#f0f0f0" }}
            >
              <HStack spacing={2}>
                <LuCalendarDays size={16} />
                <Text
                  fontSize={{ base: "10px", md: "13px" }}
                  fontWeight="400"
                  fontFamily="OutfitRegular"
                >
                  {selectedDate
                    ? selectedDate.toLocaleDateString()
                    : "Select Date"}
                </Text>
              </HStack>
            </Button>
          }
        />
      </Flex>

      {/* Tab Contents */}
      <Tabs.Content value="MentorApplication">
        <MentorApplication />
      </Tabs.Content>
      <Tabs.Content value="NewOrganization">
        <NewOrganization />
      </Tabs.Content>
      <Tabs.Content value="RewardRequest">
        <RewardReq />
      </Tabs.Content>
    </Tabs.Root>
  );
};

import { Box, Heading, Link, Tabs } from "@chakra-ui/react";
import Avatar from "../../components/header/Avatar";
import { HiOutlineLogout } from "react-icons/hi";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SettingsProfile } from "./profile/profile";
import { SettingsPosts } from "./posts/Posts";
import { SettingHelp } from "./help/SettingHelp";
import { SettingsListing } from "./listing/Listing";

const SettingsTab = () => {
  const navigate = useNavigate();

  const dropdownOptions = [
    {
      text: "Settings",
      icon: FaCog,
      handler: () => navigate("/settings"),
    },
    {
      text: "Logout",
      icon: HiOutlineLogout,
      color: "text-red-500",
      handler: () => navigate("/logout"),
    },
  ];

  return (
    <Box p={3}>
      {/* Avatar Section */}
      <Box
        ml="auto"
        w="100%"
        pr={4}
        display={{ base: "none", xl: "flex" }}
        justifyContent="flex-end"
        className="border-l-2 pl-4"
        pb={4}
      >
        <Avatar options={dropdownOptions} />
      </Box>

      {/* Page Header */}
      <Heading pl={5} pb={4} display="flex" alignItems="center" gap={2}>
        Settings
      </Heading>

      {/* Tabs Section */}
      <Tabs.Root defaultValue="profile">
        <Tabs.List
          display="flex"
          gap={6}
          mx={{ base: 2, md: 4 }}
          borderBottom="1px solid #EDEDF2"
          pb={2}
        >
          {[
            { label: "Profile", value: "profile" },
            { label: "Posts", value: "posts" },
            { label: "Mentorship", value: "mentoship" },
            { label: "Help", value: "help" },
          ].map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              asChild
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight="500"
              _selected={{
                color: "#2B362F",
                borderBottom: "2px solid #2B362F",
              }}
              _hover={{ color: "#2B362F" }}
              p={0}
              w="fit-content" // ✅ makes it the same width as the text
            >
              <Link unstyled href={`#${tab.value}`}>
                {tab.label}
              </Link>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Tab Content */}
        <Tabs.Content value="profile">
          <SettingsProfile />
        </Tabs.Content>
        <Tabs.Content value="posts">
          <SettingsPosts />
        </Tabs.Content>
        <Tabs.Content value="mentoship">
          <SettingsListing />
        </Tabs.Content>
        <Tabs.Content value="help">
          <SettingHelp />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default SettingsTab;

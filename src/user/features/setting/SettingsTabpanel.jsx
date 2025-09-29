import {
  Box,
  Heading,
  HStack,
  IconButton,
  Link,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { SettingsProfile } from "./profile/profile";
import { SettingsPosts } from "./posts/Posts";
import { SettingHelp } from "./help/SettingHelp";
import { SettingsListing } from "./listing/Listing";
import Avatar from "../../components/header/Avatar";
import { HiOutlineLogout } from "react-icons/hi";
import { FaCog, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SettingsTab = () => {
  const dropdownOptions = [
    // {
    //   text: "Change Image",
    //   icon: FaImage,
    //   handler: () => fileInputRef.current?.click(),
    // },
    {
      text: "Settings",
      icon: FaCog,
      handler: () => navigate("/settings"),
    },
    {
      text: "Logout",
      icon: HiOutlineLogout,
      color: "text-red-500",
      handler: () => {
        // localStorage.clear();
        navigate("/logout");
      },
    },
  ];
  const navigate = useNavigate();

  return (
    <Box p={3}>
      <Box
        ml={"auto"}
        w={"100%"}
        pr={4}
        // pt={2}
        justifyContent={"flex-end"}
        display={{ base: "none", xl: "flex" }}
        className="border-l-2 pl-4"
        pb={4}
      >
        {/* <button onClick={() => toggleDropdown("avatar")}> */}
        <Avatar options={dropdownOptions} />
        {/* </button> */}
      </Box>
      <Heading pl={5} display={"flex"} pb={4} gap={2} alignItems={"center"}>
        {/* <IconButton
          aria-label="Previous"
          rounded="full"
          bg="white"
          border={"1px solid #9E9E9E"}
          _hover={{ bg: "whiteAlpha.500" }}
          size="sm"
        >
          <IoIosArrowBack color="#9E9E9E" />
        </IconButton> */}
        Settings
      </Heading>

      <Tabs.Root defaultValue="profile">
        <Tabs.List mx={{ base: 2, md: 4 }}>
          <Tabs.Trigger fontSize={{ base: 10, md: 14 }} value="profile" asChild>
            <Link unstyled href="#profile">
              Profile
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger fontSize={{ base: 10, md: 14 }} value="posts" asChild>
            <Link unstyled href="#posts">
              Posts
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger
            fontSize={{ base: 10, md: 14 }}
            value="listings"
            asChild
          >
            <Link unstyled href="#listings">
              Listings
            </Link>
          </Tabs.Trigger>
          <Tabs.Trigger fontSize={{ base: 10, md: 14 }} value="help" asChild>
            <Link unstyled href="#help">
              Help
            </Link>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="profile">
          {/* profile */}
          <SettingsProfile />
        </Tabs.Content>
        <Tabs.Content value="posts">
          {/* posts */}
          <SettingsPosts />
        </Tabs.Content>
        <Tabs.Content value="listings">
          {/* listing */}
          <SettingsListing />
        </Tabs.Content>
        <Tabs.Content value="help">
          {/* help */}
          <SettingHelp />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default SettingsTab;

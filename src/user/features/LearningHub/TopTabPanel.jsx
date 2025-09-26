import {
  Tabs,
  Box,
  Heading,
  IconButton,
  InputGroup,
  Input,
  HStack,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { LuCircleAlert, LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import { TabPanel } from "./TabPanel";
import { MdAttachFile, MdStars } from "react-icons/md";
import { Program } from "./Program";
import { Links } from "./Links";
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/header/Avatar";
import { Dropdown } from "../../components/select/Dropdown";
import ProgramSelector from "./Dropdown";
import { FaCog, FaImage } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import Avatars from "../../components/header/Avatar";

const TopTabs = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);
  const frameworks = createListCollection({
    items: [
      { label: "Experience", value: "Experience" },
      { label: "finances", value: "finances" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });
  const dropdownOptions = [
    {
      text: "Change Image",
      icon: FaImage,
      handler: () => fileInputRef.current?.click(),
    },
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

  useEffect(() => {
    const getArticles = async () => {
      const res = await axiosClient.get("/get-articles");

      setArticles(res.data.articles);
    };
    getArticles();
  }, []);

  useEffect(() => {
    if (search) {
      const lowerSearch = search.toLowerCase();
      const results = articles.filter((item) =>
        [item.title, item.content]
          .filter(Boolean) // removes null/undefined
          .some((field) => field.toLowerCase().includes(lowerSearch))
      );
      setFilteredResults(results);
    } else {
      setFilteredResults(articles); // if no search, show all
    }
  }, [search, articles]);
  return (
    <Box>
      <HStack>
        <Heading
          pl={5}
          fontSize={{ base: "13px", md: "24px" }}
          display={"flex"}
          pb={4}
          gap={2}
          alignItems={"center"}
        >
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
          Learning Hub
        </Heading>
        <Box
          display={{ base: "none", xl: "flex" }}
          className="border-l-2 pl-4"
          pb={6}
          ml={"auto"}
          justifyContent={"center"}
          // bg={"#000"}
          pr={"2%"}
          pt={1}
        >
          {/* <button onClick={() => toggleDropdown("avatar")}> */}
          <Avatars options={dropdownOptions} />
          {/* </button> */}
        </Box>
      </HStack>

      <Tabs.Root
        defaultValue="articles"
        variant="#000"
        px={{ base: 4, md: 0 }}
        // bg={"#F5F6FA"}
        rounded={50}
      >
        <HStack
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"center"}
          pl={{ base: 2, md: 5 }}
        >
          <InputGroup
            w={{ base: "100%" }}
            flex={1}
            // px={{ base: 2, md: 0 }}
            // mt={-5}
            // mb={5}
            startElement={<CiSearch size={15} />}
          >
            <Input
              py={1}
              h={{ base: "30px", md: "56px" }}
              fontSize={10}
              borderRadius={{ base: 5, md: 10 }}
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          {/* <Dropdown frameworks={frameworks} icon /> */}

          <Tabs.List
            // bg={"#F5F6FA"}
            border={"none"}
            gap={2}
            mx={{ base: "auto", md: 5 }}
            rounded={50}
            p={2} // reduce padding around the whole list
            ml={{ base: 0, md: 0 }}
            justifyContent={{ base: "center", md: "flex-end" }}
            w={{ base: "100%", md: "auto" }}
          >
            <Tabs.Trigger
              value="articles"
              color={"#9E9E9E"}
              bg={"#EBEBEB"}
              w={"auto"}
              h={{ base: "30px", md: "43px" }} // reduce height
              px={{ base: 2, md: 4 }} // smaller horizontal padding
              fontSize={{ base: "10px", md: "14px" }} // slightly larger but compact
              rounded={"8px"}
              display="flex"
              alignItems="center"
              gap={2}
              _selected={{ bg: "#2B362F", color: "#fff" }}
            >
              <LuCircleAlert />
              Information
            </Tabs.Trigger>

            <Tabs.Trigger
              value="projects"
              color={"#9E9E9E"}
              bg={"#EBEBEB"}
              w={"auto"}
              h={{ base: "30px", md: "43px" }}
              px={{ base: 2, md: 4 }}
              fontSize={{ base: "10px", md: "14px" }}
              rounded={"8px"}
              display="flex"
              alignItems="center"
              gap={2}
              _selected={{ bg: "#2B362F", color: "#fff" }}
            >
              <MdStars />
              Program
            </Tabs.Trigger>

            <Tabs.Trigger
              value="tasks"
              color={"#9E9E9E"}
              bg={"#EBEBEB"}
              w={"auto"}
              h={{ base: "30px", md: "43px" }}
              px={{ base: 2, md: 4 }}
              fontSize={{ base: "10px", md: "14px" }}
              rounded={"8px"}
              display="flex"
              alignItems="center"
              gap={2}
              _selected={{ bg: "#2B362F", color: "#fff" }}
            >
              <MdAttachFile />
              Links
            </Tabs.Trigger>

            <Tabs.Indicator rounded="l2" />
          </Tabs.List>
        </HStack>

        <Tabs.Content value="articles">
          <Box>
            <TabPanel articles={filteredResults} setArticles={setArticles} />
          </Box>
        </Tabs.Content>
        <Tabs.Content value="projects">
          <Box>
            <ProgramSelector />
          </Box>
        </Tabs.Content>
        <Tabs.Content value="tasks">
          <Links articles={articles} setArticles={setFilteredResults} />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

export default TopTabs;

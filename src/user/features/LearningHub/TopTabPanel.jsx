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
// import { Dropdown } from "../../components/select/Dropdown";

const TopTabs = () => {
  const [articles, setArticles] = useState([]);
<<<<<<< HEAD
  const [search, setSearch] = useState('');

  const [filteredResults, setFilteredResults] = useState([])

=======
  const navigate = useNavigate();
>>>>>>> 5a9c440e2f60e0b1db4f4ebf1e29f002e9fd7a2c
  useEffect(() => {
    const getArticles = async () => {
      const res = await axiosClient.get("/get-articles");

      setArticles(res.data.articles);
    };
    getArticles();
  }, []);

<<<<<<< HEAD
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
    <Box bg={"#F5F6FA"}>
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
        Learning Hub
      </Heading>
=======
  const frameworks = createListCollection({
    items: [
      { label: "Experience", value: "Experience" },
      { label: "finances", value: "finances" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });
  return (
    <Box>
      <HStack pr={7} justifyContent={"space-between"} pt={5}>
        <Heading pl={5} display={"flex"} pb={4} gap={2} alignItems={"center"}>
          <IconButton
            aria-label="Previous"
            rounded="full"
            bg="white"
            onClick={() => navigate("/")}
            border={"1px solid #9E9E9E"}
            _hover={{ bg: "whiteAlpha.500" }}
            size={{ base: "10", md: "sm" }}
          >
            <IoIosArrowBack color="#9E9E9E" />
          </IconButton>
          <Text fontSize={{ base: "12px", md: "24px" }}>Learning Hub</Text>
        </Heading>

        <Box
          display={{ base: "none", xl: "block" }}
          className="border-l-2 pl-4"
          pb={5}
        >
          {/* <button onClick={() => toggleDropdown("avatar")}> */}
          <Avatar />
          {/* </button> */}
        </Box>
      </HStack>
>>>>>>> 5a9c440e2f60e0b1db4f4ebf1e29f002e9fd7a2c
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
              onChange={e=>setSearch(e.target.value)}
            />
          </InputGroup>
          <Dropdown frameworks={frameworks} icon />

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
            <Program />
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

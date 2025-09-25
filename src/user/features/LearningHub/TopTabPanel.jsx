import {
  Tabs,
  Box,
  Heading,
  IconButton,
  InputGroup,
  Input,
  HStack,
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

const TopTabs = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');

  const [filteredResults, setFilteredResults] = useState([])

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
      <Tabs.Root
        defaultValue="articles"
        variant="#000"
        bg={"#F5F6FA"}
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
            px={{ base: 5, md: 0 }}
            // mt={-5}
            // mb={5}
            startElement={<CiSearch size={15} />}
          >
            <Input
              py={15}
              h={{ base: "40px", md: "56px" }}
              fontSize={10}
              borderRadius={10}
              placeholder="Search..."
              onChange={e=>setSearch(e.target.value)}
            />
          </InputGroup>
          <Tabs.List
            bg={"#F5F6FA"}
            border={"none"}
            gap={2}
            mx={5}
            rounded={50}
            p="13"
            justifyContent={{ base: "center", md: "flex-end" }}
            w={{ base: "100%", md: "auto" }}
          >
            <Tabs.Trigger
              value="articles"
              color={"#9E9E9E"}
              bg={"#EBEBEB"}
              p={{ base: 2, md: 6 }}
              fontSize={{ base: "10px", md: "12px" }}
              rounded={"12px"}
              _selected={{ bg: "#2B362F", color: "#fff" }}
            >
              <LuCircleAlert />
              Information
            </Tabs.Trigger>
            <Tabs.Trigger
              value="projects"
              color={"#9E9E9E"}
              bg={"#EBEBEB"}
              p={{ base: 2, md: 6 }}
              fontSize={{ base: "10px", md: "12px" }}
              rounded={"12px"}
              _selected={{ bg: "#2B362F", color: "#fff" }}
            >
              <MdStars />
              Program
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tasks"
              color={"#9E9E9E"}
              bg={"#EBEBEB"}
              p={{ base: 2, md: 6 }}
              fontSize={{ base: "10px", md: "12px" }}
              rounded={"12px"}
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

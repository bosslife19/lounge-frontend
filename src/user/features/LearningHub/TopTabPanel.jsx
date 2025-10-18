import {
  Tabs,
  Box,
  Heading,
  IconButton,
  InputGroup,
  Input,
  HStack,
  Portal,
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
  const [open, setOpen] = useState(false);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const getPrograms = async () => {
      const res = await axiosClient.get("/programs");

      setPrograms(res.data.programs);
    };
    getPrograms();
  }, []);
  const frameworks = createListCollection({
    items: [
      { label: "Experience", value: "Experience" },
      { label: "finances", value: "finances" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });
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
      <Box
        ml={"auto"}
        w={"100%"}
        h={"100%"}
        pr={4}
        pt={2}
        justifyContent={"flex-end"}
        display={{ base: "none", xl: "flex" }}
        className="border-l-2 pl-4"
        pb={5}
        // bg={"#000"}
        position="relative"
        zIndex={10}
        cursor="pointer"
        onClick={() => console.log("clicked")}
      >
        <Avatars options={dropdownOptions} />
      </Box>
      <Heading
        fontSize={{ base: "13px", md: "24px" }}
        pb={{ base: 0, md: 2 }}
        px={4}
        style={{
          position: "relative",
        }}
        top={{ base: "-40px", md: "-50px" }}
        ml={{ base: 25, lg: 0 }}
      >
        Learning Hub
      </Heading>

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
            <div style={{ position: "relative", display: "inline-block" }}>
              <button
                onClick={() => setOpen(!open)}
                style={{
                  backgroundColor: "#EBEBEB",
                  color: "#9E9E9E",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                  height: "43px",
                  transition: "all 0.2s ease-in-out",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ddd")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#EBEBEB")
                }
              >
                <MdStars />
                Program
              </button>
              {open && (
                <Portal>
                  <div
                    style={{
                      position: "absolute",
                      top: "21.5%", // adjust based on where the button sits
                      // left: "50%",
                      right: "2%",
                      transform: "translateX(-50%)",
                      backgroundColor: "#fff",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      minWidth: "100px",
                      zIndex: 2000,
                    }}
                  >
                    {programs?.map((item) => (
                      <div
                        key={item}
                        style={{
                          padding: "10px 14px",
                          fontSize: "14px",
                          color: "#333",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate(`/programs/${item?.id}`);
                          setOpen(false);
                        }}
                      >
                        {item?.title}
                      </div>
                    ))}
                  </div>
                </Portal>
              )}
            </div>
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

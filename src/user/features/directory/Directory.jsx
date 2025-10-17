import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Image,
  List,
  Avatar,
  Card,
  Text,
  Stack,
  HStack,
  Button,
  Flex,
  Grid,
  Heading,
  InputGroup,
  Input,
  createListCollection,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Avatars from "../../components/header/Avatar";

import googlebig from "../../../assets/googlebig.png";
import googlesmall from "../../../assets/googlesmall.png";
import linkedin from "../../../assets/skill-icons_linkedin.png";
import facebk from "../../../assets/logos_facebook.png";
import images from "../../../assets/course.png";
import logo from "../../../assets/userImage.jpg";
import { LuUser } from "react-icons/lu";
import { SelectOption } from "../../components/select/Select";
import { Dropdown } from "../../components/select/Dropdown";
import { BiSearch } from "react-icons/bi";
import axiosClient from "../../../axiosClient";
import userImage from "../../../assets/userImage.jpg";
import { HiOutlineLogout } from "react-icons/hi";
import { FaCog, FaImage } from "react-icons/fa";

export const frameworks = createListCollection({
  items: [
    { label: "finance", value: "finance" },
    { label: "finances", value: "finances" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});

const Directory = () => {
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
const{id}= useParams()
  const [directoryData, setDirectoryData] = useState([]);
  const [selected, setSelected] = useState(directoryData[0] || null); // default profile
  const [search, setSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (search) {
      const lowerSearch = search.toLowerCase();
      const results = directoryData.filter((item) =>
        [item.first_name, item.last_name, item.name, item.organization?.name]
          .filter(Boolean) // removes null/undefined
          .some((field) => field.toLowerCase().includes(lowerSearch))
      );
      setFilteredResults(results);
    } else {
      setFilteredResults(directoryData); // if no search, show all
    }
  }, [search, directoryData]);
  useEffect(() => {
   
    if (locationSearch) {
      const lowerSearch = locationSearch.toLowerCase();
      const results = directoryData.filter((item) =>
        [item.city, item.organization?.location]
          .filter(Boolean) // removes null/undefined
          .some((field) => field.toLowerCase().includes(lowerSearch))
      );
      setFilteredResults(results);
    } else {
      setFilteredResults(directoryData); // if no search, show all
    }
  }, [locationSearch, directoryData]);

  useEffect(() => {
    const getAllProfessionals = async () => {
      const res = await axiosClient.get("/users");

      setDirectoryData(res.data.users);
      if(id){
     const currentUser =   res.data.users.find(item=>item.id ==id);
        setSelected(currentUser);
      }else{
setSelected(res.data.users[0] || null);
      }
      
    };
    getAllProfessionals();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box>
      <Box
        ml={"auto"}
        w={"100%"}
        pr={4}
        pt={2}
        justifyContent={"flex-end"}
        display={{ base: "none", xl: "flex" }}
        className="border-l-2 pl-4"
        pb={4}
      >
        {/* <button onClick={() => toggleDropdown("avatar")}> */}
        <Avatars options={dropdownOptions} />
        {/* </button> */}
      </Box>
       <Heading
                fontSize={{ base: "13px", md: "24px" }}
                pb={{ base: 0, md: 2 }}
                px={4}
                style={{
                  position:"relative",
                  top:"-60px"
                }}
              >
                Directory
              </Heading>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        {/* LEFT SIDE LIST */}
        <Box
          w={{ base: "100%", md: "65%" }}
          py={{ base: 3, xl: "1%" }}
          px={4}
          // pr={{ base: 2, md: 4 }}
        >
          <Stack
            // mb={3}
            px={2}
            w={{ base: "100%", md: 600 }}
            flexDirection={"row"}
            alignItems={"center"}
            gap={{ base: 4 }}
            pb={4}
          >
            <InputGroup startElement={<BiSearch size={10} />}>
              <Input
                py={{ base: "10px", md: 25 }}
                fontSize={{ base: 7, md: 10 }}
                h={{ base: "27px", md: "50px" }}
                borderRadius={{ base: 5, md: 10 }}
                placeholder="Name & Organization"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            <InputGroup startElement={<FaLocationDot size={10} />}>
              <Input
                py={{ base: "10px", md: 25 }}
                fontSize={{ base: 7, md: 10 }}
                h={{ base: "27px", md: "50px" }}
                borderRadius={{ base: 5, md: 10 }}
                // borderRadius={10}
                placeholder="Location"
                onChange={(e) => setLocationSearch(e.target.value)}
              />
            </InputGroup>
          </Stack>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
            {filteredResults?.map((card, idx) => (
              <Grid
                key={card.id}
                px={4}
                py={4}
                // w={340}
                m={1}
                cursor={"pointer"}
                shadowColor={"#080F34"}
                shadow={"sm"}
                rounded={16}
                className="bg-white relative"
                onClick={() => setSelected(card)}
                border={
                  selected?.id === card.id
                    ? "1px solid #2B362F"
                    : "1px solid transparent"
                }
              >
                <HStack>
                  <Stack position={"relative"}>
                    <Image
                      src={card?.profile_picture || userImage}
                      alt="Update"
                      boxSize={{ base: "40px", md: "50px" }}
                      rounded={50}
                    />
                  </Stack>
                  <Stack>
                    <Text
                      color={"#202020"}
                      fontSize={{ base: "14px", md: "18px" }}
                      fontFamily="InterMedium"
                    >
                      {card.first_name} {card.last_name}
                    </Text>
                    <Text
                      color={"#626262"}
                      fontFamily="InterRegular"
                      fontSize={{ base: "12px", md: "16px" }}
                      mt={"-2"}
                    >
                      {card?.profession}
                    </Text>
                  </Stack>
                </HStack>

                {/* Location & Experience */}
                <HStack mt={3}>
                  <Stack position={"relative"}>
                    <Image
                      rounded={12}
                      src={card.organization?.logo || googlebig}
                      alt="Company"
                      boxSize={{ base: "40px", md: "50px" }}
                    />
                  </Stack>
                  <Stack mt={-2} gap={2}>
                    <Text
                      color={"#7C7C7C"}
                      fontSize={{ base: 10, md: 16 }}
                      fontFamily="InterRegular"
                    >
                      {card.organization?.name}
                    </Text>
                    <HStack mt={-2} alignItems={"center"}>
                      <FaLocationDot
                        style={{ fontSize: "12px" }}
                        color={"#7C7C7C"}
                      />
                      <Text
                        color={"#7C7C7C"}
                        fontSize={{ base: 10, md: 12 }}
                        fontFamily="InterRegular"
                      >
                        {card.organization?.location || ""}
                      </Text>
                    </HStack>

                    {/* <List.Root
                      display={"flex"}
                      flexDirection={"row"}
                      gap={6}
                      pl={3}
                      color={"#7C7C7C"}
                    >
                      <List.Item
                        key={idx}
                        fontSize={11}
                        fontFamily="InterRegular"
                      >
                        {card.years_of_experience} years of Experience
                      </List.Item>
                    </List.Root> */}
                  </Stack>
                </HStack>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* RIGHT SIDE DETAILS */}
        <Box
          w={{ base: "100%", md: "34%" }}
          // h={"120vh"}
          overflowY={"auto"}
          borderBottomLeftRadius={{ base: 5, md: 10 }}
          borderBottomRightRadius={{ base: 5, md: 10 }}
          scrollbarWidth={"none"}
          // shadow={{ base: "none", xl: "lg" }}
          // shadowColor={"#080F340F"}
          // flex={1}
          boxShadowColor={"whiteAlpha.800"}
          boxShadow={"md"}
          bg={"#fff"}
          className="flex items-center gap-5"
          // bg={"#fff"}
          // pt={1}
          p={"1.3%"}
          // border={"2px solid #080F340F"}
          pb={14}
          display={{ base: "block" }}
          ml={"auto"}
        >
          <Box
            display={{ base: "none" }}
            className="border-l-2 pl-4"
            pb={5}
            justifyContent={"center"}
            // bg={"#000"}
            pr={1}
          >
            {/* <button onClick={() => toggleDropdown("avatar")}> */}
            <Avatars options={dropdownOptions} />
            {/* </button> */}
          </Box>

          <Card.Root
            bg={"#fff"}
            shadowColor={"#080F340F"}
            boxShadow={"lg"}
            rounded={20}
            border={"1px solid #fff"}
          >
            <Card.Body gap="2">
              <Avatar.Root
                mx={"auto"}
                boxSize={{ base: "40px", md: "100px" }}
                rounded={50}
              >
                <Avatar.Image src={selected?.profile_picture || userImage} />
                <Avatar.Fallback name={selected?.name} />
              </Avatar.Root>
              <Card.Title
                fontSize={{ base: "15px", md: "20px" }}
                textAlign={"center"}
                fontFamily="InterBold"
              >
                {selected?.first_name} {selected?.last_name}
              </Card.Title>
              <Card.Description textAlign={"center"}>
                <HStack justifyContent={"center"} mt={-1} alignItems={"center"}>
                  {/* todo: put organization logo */}
                  <Image
                    boxSize={{ base: "20px", md: "24px" }}
                    rounded={30}
                    src={selected?.organization?.logo || googlebig}
                    alt="company"
                  />
                  <Text
                    color={"#3B3B3B"}
                    fontSize={{ base: 10, md: 15 }}
                    fontFamily="InterMedium"
                  >
                    {selected?.organization?.name}
                    {/* to do : put organization name here */}
                    {/* Company */}
                  </Text>
                </HStack>
                <HStack
                  pt={1}
                  justifyContent={"center"}
                  mt={2}
                  alignItems={"center"}
                >
                  <FaLocationDot
                    style={{ fontSize: "12px" }}
                    color={"#7C7C7C"}
                  />
                  <Text
                    color={"#7C7C7C"}
                    fontSize={{ base: 8, md: 12 }}
                    fontFamily="InterRegular"
                  >
                    {selected?.organization?.location}
                  </Text>
                </HStack>
              </Card.Description>
            </Card.Body>
            <Card.Footer>

              <Button
                w={"full"}
                mb={-2}
                fontFamily="InterBold"
                fontSize={{ base: 14, md: 16 }}
                fontWeight={"bold"}
                rounded={24}
                bg={"#2B362F"}
                // p={6}
                h={{ base: "35px", md: "56px" }}
                as={"a"}
                href={`mailto:${selected?.email}`}
                target="_blank"
              >
                Contact Now
              </Button>
            </Card.Footer>
          </Card.Root>

          {/* BIO */}
          <Card.Root
            boxShadow={"md"}
            size="sm"
            rounded={{ base: 10, md: 20 }}
            mt={4}
          >
            <Card.Header mt={{ base: -2, md: -2 }}>
              <Heading
                // textAlign={"left"}
                size="md"
                fontFamily="InterRegular"
                fontSize={{ base: 10, md: 12 }}
              >
                About Me
              </Heading>
            </Card.Header>
            <Card.Body
              //  px={{ base: "9%", md: "9%" }}
              mt={-4}
              color="#7C7C7C"
            >
              <Text fontFamily="InterRegular" fontSize={{ base: 10, md: 12 }}>
                {selected?.bio} Years of Experience
              </Text>
              {/* <Text fontFamily="InterRegular" fontSize={14} color={"#202020"}>
                {selected?.bio}
              </Text> */}
            </Card.Body>
          </Card.Root>

          {/* EXPERIENCE */}
          <Card.Root
            boxShadow={"md"}
            // px={5}
            fontFamily="InterRegular"
            fontSize={{ base: 10, md: 12 }}
            size="sm"
            rounded={{ base: 10, md: 20 }}
            mt={4}
          >
            <Card.Header mt={{ base: -2, md: -2 }}>
              <Heading size="md" fontSize={{ base: 10, md: 12 }}>
                Experience & Role
              </Heading>
            </Card.Header>
            <Card.Body
              mt={{ base: -4, md: -3 }}
              // px={{ base: "9%", md: "9%" }}
              color="#7C7C7C"
            >
              <Text fontFamily="InterRegular" fontSize={{ base: 10, md: 12 }}>
                {selected?.years_of_experience} Years of Experience
              </Text>
            </Card.Body>
          </Card.Root>

          {/* SOCIALS */}
          <Card.Root
            boxShadow={"md"}
            size="sm"
            rounded={{ base: 10, md: 20 }}
            mt={4}
          >
            <Card.Header mt={{ base: -2, md: -2 }}>
              <Heading size="md" fontSize={{ base: 10, md: 12 }}>
                Connect on Socials
              </Heading>
            </Card.Header>
            <Card.Body
              flexDirection={"row"}
              mt={{ base: -2, md: -3 }}
              gap={4}
              color="#7C7C7C"
            >
              <a href={selected?.linkedin_url}>
                <Image src={linkedin} boxSize={{ base: 3, md: 5 }} />
              </a>
              <a href={selected?.facebook_url}>
                <Image src={facebk} boxSize={{ base: 3, md: 5 }} />
              </a>

              {/* to do: put social images and link */}
            </Card.Body>
          </Card.Root>
        </Box>
      </Flex>
    </Box>
  );
};

export default Directory;

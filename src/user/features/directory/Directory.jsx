import { useNavigate } from "react-router-dom";
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

export const frameworks = createListCollection({
  items: [
    { label: "finance", value: "finance" },
    { label: "finances", value: "finances" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});
const Directory = () => {
  const navigate = useNavigate();

  const [directoryData, setDirectoryData] = useState([]);
  const [selected, setSelected] = useState(directoryData[0] || null); // default profile

  console.log("selected", selected);

  useEffect(() => {
    const getAllProfessionals = async () => {
      const res = await axiosClient.get("/users");
      setDirectoryData(res.data.users);

      setSelected(res.data.users[0] || null);
    };
    getAllProfessionals();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box bg={"#F5F6FA"} h={"150vh"} pb={"50%"} px={3}>
      <Stack
        mb={3}
        px={2}
        w={{ base: 100, md: 600 }}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <InputGroup startElement={<BiSearch size={10} />}>
          <Input
            py={25}
            fontSize={10}
            borderRadius={10}
            placeholder="Name & Organization"
          />
        </InputGroup>
        <InputGroup startElement={<FaLocationDot size={10} />}>
          <Input
            py={25}
            fontSize={10}
            borderRadius={10}
            placeholder="Location"
          />
        </InputGroup>
      </Stack>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        {/* LEFT SIDE LIST */}
        <Box w={{ base: "100%", md: "65%" }} pr={4}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
            {directoryData?.map((card, idx) => (
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
                      boxSize="50px"
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
                      src={googlebig}
                      alt="Company"
                      boxSize="50px"
                    />
                  </Stack>
                  <Stack mt={-2} gap={2}>
                    <Text
                      color={"#7C7C7C"}
                      fontSize={{ base: 10, md: 16 }}
                      fontFamily="InterRegular"
                    >
                      Organization
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
                        {card.city}
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
          bg={"#FAFAFA"}
          h={"100%"}
          w={{ base: "100%", md: "35%" }}
          px={4}
          pt={3}
          // className="pb={4}"
        >
          <Card.Root
            bg={"#fff"}
            shadowColor={"#080F340F"}
            shadow={"sm"}
            rounded={20}
            border={"1px solid #fff"}
          >
            <Card.Body gap="2">
              <Avatar.Root
                mx={"auto"}
                boxSize={{ base: "60px", md: "100px" }}
                rounded={50}
              >
                <Avatar.Image src={selected?.profile_picture || userImage} />
                <Avatar.Fallback name={selected?.name} />
              </Avatar.Root>
              <Card.Title textAlign={"center"} fontFamily="InterBold">
                {selected?.first_name} {selected?.last_name}
              </Card.Title>
              <Card.Description textAlign={"center"}>
                <HStack justifyContent={"center"} mt={-1} alignItems={"center"}>
                  {/* todo: put organization logo */}
                  <Image
                    boxSize={"24px"}
                    rounded={30}
                    src={googlebig}
                    alt="company"
                  />
                  <Text
                    color={"#3B3B3B"}
                    fontSize={{ base: 12, md: 15 }}
                    fontFamily="InterMedium"
                  >
                    {selected?.company}
                    {/* to do : put organization name here */}
                    Company
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
                    fontSize={{ base: 10, md: 12 }}
                    fontFamily="InterRegular"
                  >
                    {selected?.city}
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
              >
                Contact Now
              </Button>
            </Card.Footer>
          </Card.Root>

          {/* BIO */}
          <Card.Root size="sm" rounded={20} mt={4}>
            <Card.Header>
              <Heading
                // textAlign={"left"}
                size="md"
                fontFamily="InterRegular"
                fontSize={12}
              >
                Bio
              </Heading>
            </Card.Header>
            <Card.Body px={{ base: "7%", md: "9%" }} mt={-3} color="#7C7C7C">
              <List.Root fontFamily="InterRegular" fontSize={12}>
                <List.Item>{selected?.bio} Years of Experience</List.Item>
              </List.Root>
              {/* <Text fontFamily="InterRegular" fontSize={14} color={"#202020"}>
                {selected?.bio}
              </Text> */}
            </Card.Body>
          </Card.Root>

          {/* EXPERIENCE */}
          <Card.Root
            // px={5}
            fontFamily="InterRegular"
            fontSize={12}
            size="sm"
            rounded={20}
            mt={4}
          >
            <Card.Header>
              <Heading size="md">Experience & Role</Heading>
            </Card.Header>
            <Card.Body mt={-2} px={{ base: "7%", md: "9%" }} color="#7C7C7C">
              <List.Root>
                <List.Item>
                  {selected?.years_of_experience} Years of Experience
                </List.Item>
              </List.Root>
            </Card.Body>
          </Card.Root>

          {/* SOCIALS */}
          <Card.Root size="sm" rounded={20} mt={4}>
            <Card.Header>
              <Heading size="md">Connect on Socials</Heading>
            </Card.Header>
            <Card.Body flexDirection={"row"} gap={4} color="#7C7C7C">
              {/* {selected.socials.map((src, idx) => (
              <Image key={idx} src={src} boxSize={5} />
            ))} */}
              {/* to do: put social images and link */}
              <Text fontFamily="InterRegular" fontSize={12} color={"#202020"}>
                Socials
              </Text>
            </Card.Body>
          </Card.Root>
        </Box>
      </Flex>
    </Box>
  );
};

export default Directory;

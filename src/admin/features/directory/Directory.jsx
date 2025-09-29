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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

import googlebig from "../../../assets/googlebig.png";
import googlesmall from "../../../assets/googlesmall.png";
import linkedin from "../../../assets/skill-icons_linkedin.png";
import facebk from "../../../assets/logos_facebook.png";
import images from "../../../assets/course.png";
import logo from "../../../assets/Frame 1618868179.png";
import { SelectOption } from "../../components/select/Select";
import { OrganizationModal } from "./modal/organizationmodal";
import { truncateText } from "../home/RightSide/mentorsCard";
import { CiCirclePlus } from "react-icons/ci";
import { BiSearch } from "react-icons/bi";

const DirectoryData = [
  {
    id: 1,
    name: "Glorydays International..",
    role: "Technology",
    company: "Google Inc.",
    companyLogo: googlesmall,
    location: "Shanghai, China | seattle",
    avatar: googlebig,
    subimage: logo,
    experience: ["10+ Years Experience"],
    bio: [
      "Bachelor's degree in Design, related field, or equivalent practical experience.",
      "7 years of experience as a UX or Interaction Designer.",
      "Experience in representing and advocating for UX and users.",
    ],
    expRole: ["7 Years experience", "Expert Role"],
    socials: [linkedin, facebk],
  },
  {
    id: 2,
    name: "Glorydays International..",
    role: "Technology",
    company: "Meta Inc.",
    companyLogo: facebk,
    location: "California, USA",
    avatar: googlebig,
    subimage: logo,
    experience: ["5+ Years Experience"],
    bio: [
      "Bachelor's degree in Product Design or related field.",
      "5 years of experience designing at scale.",
      "Strong portfolio showcasing UX and UI design.",
    ],
    expRole: ["5 Years experience", "Mid-level Role"],
    socials: [linkedin],
  },
  {
    id: 3,
    name: "Glorydays International..",
    role: "Technology",
    company: "Meta Inc.",
    companyLogo: facebk,
    location: "California, USA",
    avatar: googlebig,
    subimage: logo,
    experience: ["5+ Years Experience"],
    bio: [
      "Bachelor's degree in Product Design or related field.",
      "5 years of experience designing at scale.",
      "Strong portfolio showcasing UX and UI design.",
    ],
    expRole: ["5 Years experience", "Mid-level Role"],
    socials: [linkedin],
  },
  {
    id: 4,
    name: "Glorydays International..",
    role: "Technology",
    company: "Meta Inc.",
    companyLogo: facebk,
    location: "California, USA",
    avatar: googlebig,
    subimage: logo,
    experience: ["5+ Years Experience"],
    bio: [
      "Bachelor's degree in Product Design or related field.",
      "5 years of experience designing at scale.",
      "Strong portfolio showcasing UX and UI design.",
    ],
    expRole: ["5 Years experience", "Mid-level Role"],
    socials: [linkedin],
  },
  {
    id: 5,
    name: "Glorydays International..",
    role: "Technology",
    company: "Meta Inc.",
    companyLogo: facebk,
    location: "California, USA",
    avatar: googlebig,
    subimage: logo,
    experience: ["5+ Years Experience"],
    bio: [
      "Bachelor's degree in Product Design or related field.",
      "5 years of experience designing at scale.",
      "Strong portfolio showcasing UX and UI design.",
    ],
    expRole: ["5 Years experience", "Mid-level Role"],
    socials: [linkedin],
  },
  {
    id: 6,
    name: "Glorydays International..",
    role: "Technology",
    company: "Meta Inc.",
    companyLogo: facebk,
    location: "California, USA",
    avatar: googlebig,
    subimage: logo,
    experience: ["5+ Years Experience"],
    bio: [
      "Bachelor's degree in Product Design or related field.",
      "5 years of experience designing at scale.",
      "Strong portfolio showcasing UX and UI design.",
    ],
    expRole: ["5 Years experience", "Mid-level Role"],
    socials: [linkedin],
  },
];

const cardDatas = [
  {
    id: 1,
    image: logo,
    title: "Project One",
    subtitle: "software developer",
  },
  {
    id: 2,
    image: logo,
    title: "Project One",
    subtitle: "software developer",
  },
];
const OrganizationDirectory = () => {
  const [isOpen, setIsOpen] = useState(false); // First modal
  const [selected, setSelected] = useState(DirectoryData[0]); // default profile

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // setSelectedCard(null);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box bg={"#FDFDFD"} h={"120%"} mb={"10%"}>
      <Box
        bg={"#FDFDFD"}
        // h={"100%"}
        px={3}
        py={4}
      >
        <Stack
          mb={3}
          px={2}
          w={{ base: "100%", md: 650 }}
          flexDirection={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
          <InputGroup startElement={<BiSearch size={10} />}>
            <Input
              py={25}
              bg={"#fff"}
              fontSize={10}
              borderRadius={10}
              placeholder="Name, Industry & Skill"
            />
          </InputGroup>
          <InputGroup startElement={<FaLocationDot size={10} />}>
            <Input
              py={25}
              bg={"#fff"}
              fontSize={10}
              borderRadius={10}
              placeholder="Location"
            />
          </InputGroup>
          <Flex
            w={"100%"}
            gap={3}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <SelectOption
              title={"Experience"}
              placeholder={"Experience"}
              showCase
            />
            <SelectOption title={"People"} placeholder={"People"} showUser />
          </Flex>
        </Stack>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          {/* LEFT SIDE LIST */}
          <Box w={{ base: "100%", md: "65%" }} px={4}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={3}
            >
              {DirectoryData.map((card) => (
                <Grid
                  key={card.id}
                  px={4}
                  py={4}
                  m={1}
                  cursor={"pointer"}
                  shadowColor={"#080F34"}
                  shadow={"sm"}
                  rounded={10}
                  className="bg-white relative"
                  onClick={() => setSelected(card)}
                  border={
                    selected.id === card.id
                      ? "1px solid #2B362F"
                      : "1px solid transparent"
                  }
                >
                  <HStack>
                    <Stack position={"relative"}>
                      <Image
                        src={card.avatar}
                        alt="Update"
                        boxSize="50px"
                        rounded={20}
                      />
                    </Stack>
                    <Stack>
                      <Text
                        color={"#202020"}
                        fontSize={{ base: 10, md: 14 }}
                        fontFamily="InterMedium"
                      >
                        {card.name}
                      </Text>
                      <Text
                        color={"#626262"}
                        fontFamily="InterRegular"
                        fontSize={{ base: 10, md: 13 }}
                        mt={"-2"}
                      >
                        {card.role}
                      </Text>
                    </Stack>
                  </HStack>

                  {/* Location & Experience */}
                  <HStack mt={3}>
                    <Stack position={"relative"}>
                      <Image src={card.subimage} alt="Company" w={50} />
                    </Stack>
                    <Stack>
                      <HStack mb={-2} alignItems={"center"}>
                        <FaLocationDot
                          style={{ fontSize: "12px" }}
                          color={"#7C7C7C"}
                        />
                        <Text
                          color={"#7C7C7C"}
                          fontSize={{ base: 10, md: 12 }}
                          fontFamily="InterRegular"
                        >
                          {card.location}
                        </Text>
                      </HStack>
                      <List.Root
                        display={"flex"}
                        flexDirection={"row"}
                        gap={6}
                        pl={3}
                        color={"#7C7C7C"}
                      >
                        {card.experience.map((exp, idx) => (
                          <List.Item
                            key={idx}
                            fontSize={11}
                            fontFamily="InterRegular"
                          >
                            {exp}
                          </List.Item>
                        ))}
                      </List.Root>
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
            p={3}
            className="pb={4}"
          >
            <Card.Root
              bg={"#fff"}
              shadowColor={"#080F340F"}
              shadow={"sm"}
              rounded={20}
              border={"1px solid #fff"}
            >
              <Card.Body gap="2">
                <Avatar.Root mx={"auto"} boxSize={20} rounded={50}>
                  <Avatar.Image src={selected.avatar} />
                  <Avatar.Fallback name={selected.name} />
                </Avatar.Root>
                <Card.Title mt="2" textAlign={"center"} fontFamily="InterBold">
                  {selected.name}
                </Card.Title>
                <Card.Description textAlign={"center"}>
                  <HStack
                    justifyContent={"center"}
                    mb={-1}
                    alignItems={"center"}
                  >
                    <Image
                      boxSize={5}
                      src={selected.companyLogo}
                      alt="company"
                    />
                    <Text
                      color={"#7C7C7C"}
                      fontSize={{ base: 10, md: 12 }}
                      fontFamily="InterRegular"
                    >
                      {selected.company}
                    </Text>
                  </HStack>
                  <HStack
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
                      {selected.location}
                    </Text>
                  </HStack>
                </Card.Description>
              </Card.Body>
              <Card.Footer>
                <Button
                  onClick={handleOpen}
                  w={"full"}
                  fontFamily="InterRegular"
                  fontSize={12}
                  rounded={20}
                  p={6}
                >
                  Contact Now
                </Button>
              </Card.Footer>
            </Card.Root>

            {/* BIO */}
            <Card.Root size="sm" px={5} rounded={20} mt={4}>
              <Card.Header>
                <Heading size="md" fontFamily="InterRegular" fontSize={12}>
                  About Company
                </Heading>
              </Card.Header>
              <Card.Body mt={-3} color="fg.muted">
                <List.Root fontFamily="InterRegular" fontSize={12}>
                  {selected.bio.map((item, idx) => (
                    <List.Item key={idx}>{item}</List.Item>
                  ))}
                </List.Root>
              </Card.Body>
            </Card.Root>

            {/* company members */}
            <Box w={"100%"} p={6}>
              {/* Header */}
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="sm" fontWeight="medium" color="#202020">
                  Company Members
                </Text>
                <Button
                  bg="transparent"
                  color="#9E9E9E"
                  _hover={{ bg: "transparent" }}
                  rounded="lg"
                >
                  <CiCirclePlus />
                </Button>
              </Flex>
              <Stack
                spacing={6}
                shadow={"xs"}
                blur={"sm"}
                shadowColor={"#0000001A"}
                p={5}
                rounded={20}
              >
                {cardDatas.map((card) => (
                  <Box
                    key={card.id}
                    transition="all 0.2s ease-in-out"
                    borderBottom={"1px solid #D8D8D8"}
                    _last={{ borderBottom: "none" }}
                    pb={3}
                  >
                    <HStack spacing={4} align="center">
                      <Image
                        src={card.image}
                        alt={card.title}
                        boxSize="20px"
                        rounded="full"
                      />
                      <Stack spacing={0} flex="1">
                        <Text
                          fontSize={12}
                          fontWeight="semibold"
                          color="#111827"
                        >
                          {truncateText(card.title)}
                        </Text>
                        <Text mt={-2} fontSize={9} color="#6B7280">
                          {truncateText(card.subtitle)}
                        </Text>
                      </Stack>
                      <Button
                        size="sm"
                        h={"7"}
                        bg={"#2B362F"}
                        borderColor="#E5E7EB"
                        rounded="30px"
                        fontSize={7}
                      >
                        View Profile
                      </Button>
                    </HStack>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Flex>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000]">
            <OrganizationModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              selected={selected}
            />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default OrganizationDirectory;

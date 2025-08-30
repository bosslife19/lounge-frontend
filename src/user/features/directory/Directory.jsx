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
 import images from "../../../assets/course.png"
import logo from "../../../assets/userImage.jpg"
import { LuUser } from "react-icons/lu";
import { SelectOption } from "../../components/select/Select";
import { Dropdown } from "../../components/select/Dropdown";
import { BiSearch } from "react-icons/bi";
// ✅ Directory Data (dynamic)
const DirectoryData = [
  {
    id: 1,
    name: "Mazi Thomas",
    role: "UX Designer, Google Pay",
    company: "Google Inc.",
    companyLogo: googlesmall,
    location: "Shanghai, China",
    avatar: images,
    subimage: googlebig,
    experience: ["Expert", "10+ Years Experience"],
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
    name: "Sarah Johnson",
    role: "Product Designer, Facebook",
    company: "Meta Inc.",
    companyLogo: facebk,
    location: "California, USA",
    avatar: logo,
    subimage: googlebig,
    experience: ["Intermediate", "5+ Years Experience"],
    bio: [
      "Bachelor's degree in Product Design or related field.",
      "5 years of experience designing at scale.",
      "Strong portfolio showcasing UX and UI design.",
    ],
    expRole: ["5 Years experience", "Mid-level Role"],
    socials: [linkedin],
  },
];
export const frameworks = createListCollection({
  items: [
    { label: "finance", value: "finance" },
    { label: "finances", value: "finances" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})
const Directory = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(DirectoryData[0]); // default profile

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box
      bg={'#F5F6FA'}
      h={"150vh"}
      pb={'50%'}
      px={3}
      py={4}>
        <Stack mb={3} px={2} w={{base:100,md:600}} flexDirection={'row'} alignItems={'center'} >
                    <InputGroup  startElement={<BiSearch size={10} />}>
                     <Input py={25} 
                      fontSize={10} 
                      borderRadius={10} 
                      placeholder="Name, Industry & Skill" />
                    </InputGroup>
                    <InputGroup  
                     startElement={<FaLocationDot 
                     size={10} />}>
                      <Input py={25} fontSize={10} borderRadius={10} placeholder="Location" />
                </InputGroup>
               <Flex w={'100%'}  gap={3}  display={'flex'} alignItems={'center'} justifyContent={'center'}>
                 <Dropdown frameworks={frameworks} icon/>
                <Dropdown frameworks={frameworks} icons/>
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
                  border={selected.id === card.id ? "1px solid #2B362F" : "1px solid transparent"} 
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
                  <Image src={card.subimage} alt="Company" boxSize="35px" />
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
            <Card.Title
              mt="2"
              textAlign={"center"}
              fontFamily="InterBold"
            >
              {selected.name}
            </Card.Title>
            <Card.Description textAlign={"center"}>
              <HStack justifyContent={"center"} mb={-1} alignItems={"center"}>
                <Image boxSize={5} src={selected.companyLogo} alt="company" />
                <Text
                  color={"#7C7C7C"}
                  fontSize={{ base: 10, md: 12 }}
                  fontFamily="InterRegular"
                >
                  {selected.company}
                </Text>
              </HStack>
              <HStack justifyContent={"center"} mt={2} alignItems={"center"}>
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
              Bio
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

        {/* EXPERIENCE */}
        <Card.Root
          px={5}
          fontFamily="InterRegular"
          fontSize={12}
          size="sm"
          rounded={20}
          mt={4}
        >
          <Card.Header>
            <Heading size="md">Experience & Role</Heading>
          </Card.Header>
          <Card.Body mt={-2} color="fg.muted">
            <List.Root>
              {selected.expRole.map((item, idx) => (
                <List.Item key={idx}>{item}</List.Item>
              ))}
            </List.Root>
          </Card.Body>
        </Card.Root>

        {/* SOCIALS */}
        <Card.Root size="sm" px={2} rounded={20} mt={4}>
          <Card.Header>
            <Heading size="md">Connect on Socials</Heading>
          </Card.Header>
          <Card.Body flexDirection={"row"} gap={4} color="fg.muted">
            {selected.socials.map((src, idx) => (
              <Image key={idx} src={src} boxSize={5} />
            ))}
          </Card.Body>
        </Card.Root>
      </Box>
    </Flex>
      </Box>
  );
};

export default Directory;

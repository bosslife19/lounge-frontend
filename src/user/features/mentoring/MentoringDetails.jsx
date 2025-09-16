import {
  Dialog,
  Portal,
  CloseButton,
  Stack,
  HStack,
  Image,
  Text,
  Box,
  Card,
  Avatar,
  Button,
  Heading,
  List,
  Spinner,
} from "@chakra-ui/react";
import viewProfile from "../../../assets/viewProfile.png";
import { FaLocationDot } from "react-icons/fa6";
import { userAvatar } from "../setting/posts/Posts";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";

export const MentoringDetails = ({ isOpen, onClose, profile }) => {
  if (!profile) return null;
  const { makeRequest, loading } = useRequest();

  const handleRequestSession = async (id) => {
    const res = await makeRequest("/request-session", { mentorId: id });
    if (res.error) return;
    toast.success("Session Requested successfully");
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            rounded={30}
            bg="#FAFAFA"
            p={4}
            maxW={{ base: "sm", md: "lg" }}
          >
            <Dialog.CloseTrigger
              rounded={30}
              border={"1px solid #9E9E9E"}
              asChild
            >
              <CloseButton size="xs" color={"#9E9E9E"} />
            </Dialog.CloseTrigger>

            <Box bg={"#FAFAFA"} h={"100%"} w={"100%"} p={5}>
              {/* Main Profile Card */}
              <Card.Root
                bg={"#fff"}
                shadow={"lg"}
                shadowColor={"#0000001A/90"}
                rounded={20}
                border={"1px solid #fff"}
              >
                <Card.Body gap="2">
                  <Avatar.Root mx={"auto"} boxSize={20} rounded={50}>
                    <Avatar.Image
                      src={profile.user.profile_picture || userAvatar}
                    />
                    <Avatar.Fallback name={profile.title} />
                  </Avatar.Root>
                  <Text
                    textAlign={"center"}
                    color={"#070416"}
                    fontSize={{ base: 12, md: 16 }}
                    fontFamily="InterRegular"
                  >
                    {profile.user.name}
                  </Text>
                  <Text
                    textAlign={"center"}
                    color={"#64626D"}
                    fontSize={{ base: 12, md: 16 }}
                    fontFamily="LatoRegular"
                  >
                    {profile.user.profession}
                  </Text>
                  <Card.Title
                    mt="2"
                    color={"#070416"}
                    fontSize={{ base: 12, md: 16 }}
                    textAlign={"center"}
                    fontFamily="InterBold"
                  >
                    {profile.title}
                  </Card.Title>
                </Card.Body>
                <Card.Footer flexDirection={"column"}>
                  <Button
                    w={"full"}
                    fontFamily="InterRegular"
                    fontSize={12}
                    rounded={20}
                    p={6}
                    onClick={() => handleRequestSession(profile.user.id)}
                  >
                    {loading ? <Spinner /> : "Request Session"}
                  </Button>
                  {/* <Button bg={'transparent'}>
                    <Image src={viewProfile} w={120} />
                  </Button> */}
                </Card.Footer>
              </Card.Root>

              {/* BIO */}
              <Card.Root
                shadow={"lg"}
                shadowColor={"#0000001A/90"}
                size="sm"
                px={5}
                rounded={20}
                mt={4}
              >
                <Card.Header pb={5} ml={-4}>
                  <Heading
                    fontSize={{ base: "12px", md: "16px" }}
                    color={"#3B3B3B"}
                    fontFamily={"InterSemiBold"}
                    fontWeight={"medium"}
                  >
                    Bio
                  </Heading>
                  <Text>{profile.price}</Text>
                </Card.Header>
                {/* <Card.Body mt={-3} color="fg.muted">
                   <Stack>
                         <List.Root
                          display={"flex"}
                          flexDirection={"row"}
                           gap={6}
                           pl={3}
                           color={"#7C7C7C"}
                           >
                          {profile.desc}
                        </List.Root>
                    </Stack>
                </Card.Body> */}
              </Card.Root>

              {/* EXPERIENCE */}
              <Card.Root
                px={5}
                fontFamily="InterRegular"
                fontSize={12}
                size="sm"
                shadow={"lg"}
                shadowColor={"#0000001A/90"}
                rounded={20}
                mt={4}
              >
                <Card.Header ml={-4}>
                  <Heading
                    fontSize={{ base: "12px", md: "16px" }}
                    color={"#3B3B3B"}
                    fontFamily={"InterSemiBold"}
                    fontWeight={"medium"}
                    size="md"
                  >
                    Description
                  </Heading>
                </Card.Header>
                <Card.Body mt={-2} color="fg.muted">
                  {/* <List.Root>
                       <List.Item >{profile.desc}</List.Item>
                       <List.Item >{profile.desc2}</List.Item>
                       <List.Item >{profile.desc3}</List.Item>
                
                  </List.Root> */}
                  <Text ml={-4}>{profile.description}</Text>
                </Card.Body>
              </Card.Root>

              {/* SOCIALS */}
              <Card.Root
                shadow={"sm"}
                size="sm"
                px={2}
                rounded={20}
                mt={4}
                fontFamily="InterRegular"
                py={4}
              >
                <Card.Header
                  fontSize={{ base: "12px", md: "16px" }}
                  color={"#3B3B3B"}
                  fontFamily={"InterSemiBold"}
                  fontWeight={"medium"}
                  ml={-2}
                >
                  Category
                  {/* <a
                    href={profile.calendly}
                    style={{ textDecoration: "underline", fontWeight: "700" }}
                  > */}
                  {/* </a> */}
                </Card.Header>
                <Card.Body
                  flexDirection={{ base: "row", md: "column" }}
                  color="#6C3433"
                  gap={4}
                >
                  <List.Root
                    color="#6C3433"
                    flexDirection={{ base: "column", md: "row" }}
                    gap={10}
                    px={5}
                  >
                    <List.Item color="#6C3433">Finance</List.Item>
                    <List.Item color="#6C3433">Accounting</List.Item>
                    <List.Item color="#6C3433">Business</List.Item>
                  </List.Root>
                  <List.Root
                    flexDirection={{ base: "column", md: "row" }}
                    gap={10}
                    px={5}
                  >
                    <List.Item color="#6C3433">Finance</List.Item>
                    <List.Item color="#6C3433">Accounting</List.Item>
                    <List.Item color="#6C3433">Business</List.Item>
                  </List.Root>
                </Card.Body>
                {/* <Text style={{
                  marginTop:5,
                  marginBottom:5,
                  marginLeft:5,
                }}>{profile.calendly}</Text> */}
              </Card.Root>
            </Box>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

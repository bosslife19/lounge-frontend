import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import images from "../../../../assets/course.png";
import { LuPencil } from "react-icons/lu";
import tick from "../../../../assets/Verified tick.png";
import { FaBriefcase } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { truncateText } from "../../home/RightSide/mentorsCard";
import logo from "../../../../assets/userImage.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import { EditProfile } from "./modals/EditProfile";
import { FirstModal } from "../../home/modal/firstmodal";
import { AuthContext } from "../../../../context/AuthContext";
import userImage from "../../../../assets/userImage.jpg";
import axiosClient from "../../../../axiosClient";
import { redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useRequest } from "../../../../hooks/useRequest";
import EditOrganization from "./modals/EditOrganization";

export const LeftSectionProfile = () => {
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState();
  const { makeRequest } = useRequest();
  const [refresh, setRefresh] = useState(false)
  const [user, setUser] = useState(null);
  const [orgOpen, setOrgOpen] = useState(false)
  useEffect(() => {
    const getMentors = async () => {
      const res = await axiosClient.get("/my-mentors");

      setMentors(res.data.mentors);
    };
    getMentors();
  }, []);
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // open file picker
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // TODO: send `file` to your backend API for upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "lounge-platform"); // Replace with your Cloudinary preset

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/wokodavid/image/upload",
          formData
        );

        const imageUrl = res.data.secure_url;
        setProfileImage(imageUrl);

        const resp = await makeRequest("/profile/upload", {
          profilePic: imageUrl,
        });

        if (resp.error) {
          return;
        }
        setUserDetails(resp.response.user);

        toast.success(resp.response.message);
        // If you have a callback to inform parent component
      } catch (error) {
        console.error("Image upload failed", error);
        toast.error("Image Upload Failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosClient.get("/me/" + userDetails.id);
      setUser(res.data.user);
      setUserDetails(res.data.user);
    };
    getUser();
  }, [refresh]);

  const handleCardClick = () => {
    setIsOpen(true);
  };
  const handleOrgClose = ()=>{
    setOrgOpen(false)
  }
  const handleClose = () => {
    setIsOpen(false);
  };
  // Dummy Data
  const cardData = [
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

  return (
    <Box mb={"auto"} w={"100%"}>
      {/* profile name */}
      <Box
        shadow={"xs"}
        bg={"#fff"}
        rounded={10}
        p={3}
        w={{ base: "100%", xl: 475 }}
        border={"1px solid #EDEDF2"}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <HStack>
            <Stack position={"relative"}>
              <Image
                src={preview || userDetails?.profile_picture || userImage}
                alt="Update"
                boxSize={{ base: "40px", md: "72px" }}
                rounded={50}
              />
             
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Stack>
            <Stack>
              <Text
                color={"#191919"}
                fontSize={{ base: 10, md: 14 }}
                fontFamily="InterBold"
              >
                {userDetails?.first_name} {userDetails?.last_name}
              </Text>
              <Text
                mt={-3}
                color={"#475467"}
                fontWeight={"normal"}
                fontSize={{ base: 10, md: 14 }}
                fontFamily="InterRegular"
                display={"flex"}
                alignItems={"center"}
                gap={2}
                py={1}
              >
                <FaBriefcase /> {userDetails?.profession || "Not Specified"}
              </Text>
              <Text
                mt={-3}
                color={"#7C7C7C"}
                fontWeight={"normal"}
                fontSize={{ base: 10, md: 14 }}
                fontFamily="InterRegular"
                display={"flex"}
                alignItems={"center"}
                gap={2}
              >
                <FaLocationDot />
                {userDetails?.city}
              </Text>
            </Stack>
          </HStack>
          <Button
            bg={"transparent"}
            color={"#475367"}
            size={{ base: "xs" }}
            onClick={() => handleCardClick()}
          >
            <LuPencil />
          </Button>
        </Flex>
      </Box>

      {/* ABout Company */}
      <Box
        mt={5}
        shadow={"xs"}
        bg={"#FCFCFC"}
        rounded={10}
        p={3}
        w={{ base: "100%", xl: 475 }}
        border={"1px solid #EDEDF2"}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <HStack>
            <Stack position={"relative"}>
             
                <Image
                  src={
                    userDetails.organization?.logo || user?.organization?.logo
                  }
                  alt="Update"
                  boxSize={{ base: "40px", md: "72px" }}
                  objectFit={"cover"}
                  rounded={50}
                />

              {/* <Image
                src={tick}
                alt="tick"
                w={4}
                position={"absolute"}
                bottom={"0"}
                right={"-1"}
                borderRadius="md"
                objectFit="cover"
              /> */}
            </Stack>
            <Stack>
              <Text
                color={"#191919"}
                fontSize={{ base: 10, md: 14 }}
                fontFamily="InterBold"
              >
                {userDetails.organization?.name || user?.organization?.name}
              </Text>
              <Text
                mt={-3}
                color={"#475467"}
                fontWeight={"normal"}
                fontSize={{ base: 10, md: 14 }}
                fontFamily="InterRegular"
                display={"flex"}
                alignItems={"center"}
                gap={2}
                py={1}
              ></Text>
              <Text
                mt={-3}
                color={"#7C7C7C"}
                fontWeight={"normal"}
                fontSize={{ base: 10, md: 14 }}
                fontFamily="InterRegular"
                display={"flex"}
                alignItems={"center"}
                gap={2}
              >
                <FaLocationDot />
                {userDetails.organization?.location ||
                  user?.organization?.location}
              </Text>
            </Stack>
          </HStack>
                   <Button
            bg={"transparent"}
            color={"#475367"}
            size={{ base: "xs" }}
            // onClick={() => handleCardClick()}
            onClick={()=>setOrgOpen(true)}
          >
            <LuPencil />
          </Button>
          

        </Flex>
        <Box shadow={"xl"} mt={4} rounded={20} pb={4} bg={"#fff"} px={7}>
          <Heading
            display={"flex"}
            pt={5}
            pb={2}
            color={"#3B3B3B"}
            fontSize={{ base: "14px", md: "16px" }}
            justifyContent={"space-between"}
          >
            About Company
            {/* {userDetails?.first_name} {userDetails?.last_name} */}
            {/* <LuPencil size={17} /> */}
          </Heading>
          {/* <Text>{userDetails?.bio}</Text> */}
          {/* <List.Root ml={"1vw"} gap={2}>
            <List.Item fontSize={14} color={"#7C7C7C"}>
              Bachelor's degree in Design, related field, or equivalent
              practical experience.
            </List.Item>
            <List.Item fontSize={14} color={"#7C7C7C"}>
              7 years of experience as a UX or Interaction Designer.
            </List.Item>
            <List.Item fontSize={14} color={"#7C7C7C"}>
              Experience in representing and advocating for UX the and users.
            </List.Item>
          </List.Root> */}
          <Text>
            {userDetails.organization?.description ||
              user?.organization?.description}
          </Text>
        </Box>

        {/*company members*/}
        <Box shadow={"xl"} mt={4} rounded={20} pb={4} bg={"#fff"} px={7}>
          <Heading pt={5} pb={2} textAlign={"center"}>
            {/* Company Members */}
            Mentors
            {/* <Button
              // position={"absolute"}
              // right={0}
              bg={"transparent"}
              color={"#475367"}
              size={{ base: "xs" }}
              // onClick={() => handleCardClick()}
            >
              <LuPencil />
            </Button> */}
          </Heading>
          <Stack spacing={6}>
            {mentors.length > 0 ? (
              mentors.map((card) => (
                <Box
                  key={card.id}
                  transition="all 0.2s ease-in-out"
                  borderBottom={"1px solid #D8D8D8"}
                  pb={3}
                >
                  <HStack spacing={4} align="center">
                    <Image
                      src={card.profile_picture || logo}
                      alt={card.name}
                      boxSize="24px"
                      rounded="full"
                    />
                    <Stack spacing={0} flex="1">
                      <Text fontSize={12} fontWeight="semibold" color="#111827">
                        {/* {truncateText(card.)} */}
                        {card.name}
                      </Text>
                      <Text mt={-2} fontSize={9} color="#6B7280">
                        {/* {truncateText(card.subtitle)} */}
                        {card.profession}
                      </Text>
                    </Stack>
                    <Button
                      size="xs"
                      bg={"#2B362F"}
                      borderColor="#E5E7EB"
                      rounded="14px"
                      overflow={"hidden"}
                      fontSize={12}
                    >
                      View Profile
                    </Button>
                  </HStack>
                </Box>
              ))
            ) : (
              <Text>No Mentors Yet</Text>
            )}
          </Stack>
        </Box>
      </Box>
      <EditProfile isOpen={isOpen} onClose={handleClose} setRefresh={setRefresh} />
      <EditOrganization isOpen={orgOpen} onClose={handleOrgClose} setRefresh={setRefresh}/>
    </Box>
  );
};

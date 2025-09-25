import {
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

export const LeftSectionProfile = () => {
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)
  const [profileImage, setProfileImage] = useState()
  const {makeRequest} = useRequest();
  useEffect(() => {
<<<<<<< HEAD
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
=======
    const getMentors = async () => {
      const res = await axiosClient.get("/my-mentors");
>>>>>>> 5a9c440e2f60e0b1db4f4ebf1e29f002e9fd7a2c

      setMentors(res.data.mentors);
    };
    getMentors();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosClient.get("/me/" + userDetails.id);

      setUserDetails(res.data.user);
    };
    getUser();
  }, []);

  const handleCardClick = () => {
    setIsOpen(true);
  };
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
              <Image
                src={tick}
                alt="tick"
                w={4}
                position={"absolute"}
                bottom={"0"}
                right={"-1"}
                borderRadius="md"
                objectFit="cover"
                cursor='pointer'
                 onClick={handleImageClick}
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
                fontSize={{ base: "10px", md: 14 }}
                fontFamily="InterBold"
              >
                {userDetails?.first_name} {userDetails?.last_name}
              </Text>
              <Text
                mt={-3}
                color={"#475467"}
                fontWeight={"normal"}
                fontSize={{ base: "10px", md: 14 }}
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
                fontSize={{ base: "10px", md: 14 }}
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
            size={{ base: "10" }}
            onClick={() => handleCardClick()}
          >
            <LuPencil />
          </Button>
        </Flex>
      </Box>

      {/* ABout Company */}
      <Box
        mt={5}
        // shadow={"xs"}
        bg={"#FCFCFC"}
        rounded={10}
        p={3}
        w={{ base: "100%", xl: 475 }}
        // border={"1px solid #EDEDF2"}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <HStack>
            <Stack position={"relative"}>
              <Image
                src={userDetails.organization?.logo}
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
                {userDetails.organization?.name}
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
                {userDetails.organization?.location}
              </Text>
            </Stack>
          </HStack>
          {/* <LuPencil /> */}
        </Flex>
        <Box
          shadow={"xl"}
          mt={4}
          rounded={20}
          pb={4}
          bg={"#fff"}
          px={{ base: 3, md: 7 }}
        >
          <Heading
            display={"flex"}
            pt={{ base: 3, md: 5 }}
            pb={{ base: 1, md: 2 }}
            color={"#3B3B3B"}
            fontSize={{ base: "12px", md: "16px" }}
            justifyContent={"space-between"}
            alignItems={{ base: "center", md: "flex-start" }}
          >
            About Company
            {/* {userDetails?.first_name} {userDetails?.last_name} */}
<<<<<<< HEAD
            {/* <LuPencil size={17} /> */}
=======
            <LuPencil size={15} />
>>>>>>> 5a9c440e2f60e0b1db4f4ebf1e29f002e9fd7a2c
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
          <Text fontSize={{ base: "10px", md: "14px" }}>
            {userDetails.organization?.description}
          </Text>
        </Box>

        {/*company members*/}
        <Box
          shadow={"xl"}
          mt={{ base: 2, md: 4 }}
          rounded={20}
          pb={4}
          bg={"#fff"}
          px={{ base: 3, md: 7 }}
        >
          <Heading
            fontSize={{ base: "12px", md: "16px" }}
            pt={{ base: 2, md: 5 }}
            pb={2}
            textAlign={"center"}
          >
            {/* Company Members */}
            Mentors
          </Heading>
          <Stack spacing={6}>
            {mentors.length > 0 ? (
              mentors.map((card) => (
                <Box
                  key={card.id}
                  transition="all 0.2s ease-in-out"
                  borderBottom={
                    index === mentors.length - 1 ? "none" : "1px solid #D8D8D8"
                  }
                  pb={3}
                >
                  <HStack
                    spacing={4}
                    align={{ base: "flex-start", md: "center" }}
                  >
                    <Image
                      src={card.profile_picture || logo}
                      alt={card.name}
                      boxSize={{ base: "18px", md: "24px" }}
                      rounded="full"
                    />
                    <Stack spacing={0} flex="1">
                      <Text
                        fontSize={{ base: "10px", md: 12 }}
                        fontWeight="semibold"
                        color="#111827"
                      >
                        {/* {truncateText(card.)} */}
                        {card.name}
                      </Text>
                      <Text
                        fontSize={{ base: "7px", md: 9 }}
                        mt={-2}
                        color="#6B7280"
                      >
                        {/* {truncateText(card.subtitle)} */}
                        {card.profession}
                      </Text>
                    </Stack>
                    <Button
                      size={{ base: "10px", md: "xs" }}
                      bg={"#2B362F"}
                      p={{ base: 1.5, md: 1 }}
                      borderColor="#E5E7EB"
                      rounded={{ base: "8px", md: "14px" }}
                      overflow={"hidden"}
                      fontSize={{ base: "8px", md: 12 }}
                    >
                      View Profile
                    </Button>
                  </HStack>
                </Box>
              ))
            ) : (
              <Text
                textAlign={"center"}
                fontSize={{ base: "10px", md: "12px" }}
              >
                No Mentors Yet
              </Text>
            )}
          </Stack>
        </Box>
      </Box>
      <EditProfile isOpen={isOpen} onClose={handleClose} />
    </Box>
  );
};

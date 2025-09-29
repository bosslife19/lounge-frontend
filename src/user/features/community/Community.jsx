import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import { IoIosAdd } from "react-icons/io";
import { CreateCommunityModal } from "./modal/RightsideModal";
import Avatar from "../../components/header/Avatar";
import { HiOutlineLogout } from "react-icons/hi";
import { FaCog, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Community = () => {
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

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosClient.get("/get-all-posts");

      setPosts(res.data.posts);
    };
    getPosts();
  }, []);

  const [isOpen, setIsOpen] = useState(false); // First modal

  return (
    <Box w={"100%"}>
      <Box
        ml={"auto"}
        w={"100%"}
        pr={4}
        pt={2}
        justifyContent={"flex-end"}
        display={{ base: "none", xl: "flex" }}
        className="border-l-2 pl-4"
        pb={3}
      >
        {/* <button onClick={() => toggleDropdown("avatar")}> */}
        <Avatar options={dropdownOptions} />
        {/* </button> */}
      </Box>
      <HStack justifyContent={"space-between"}>
        <Heading
          fontSize={{ base: "13px", md: "24px" }}
          pb={{ base: 0, md: 2 }}
          px={4}
        >
          Community
        </Heading>
        <Button
          display={{ base: "flex", md: "none" }} // only visible on mobile
          bg={"#2b362f"}
          p={1}
          onClick={() => setIsOpen(true)} // 👈 this opens the modal
          size={"10"}
          mr={5}
        >
          <IoIosAdd size={10} />
          <Text fontFamily={"nunitoSemiBold"} fontSize={"8px"}>
            Create Post
          </Text>
        </Button>
      </HStack>
      <HStack
        justifyContent={"space-between"}
        flexDirection={{ base: "column", md: "row" }}
        gap={5}
        alignItems={"center"}
        px={4}
      >
        <LeftSide posts={posts} setPosts={setPosts} />
        <Box
          display={{ base: "none", md: "block" }}
          w={{ base: "100%", md: "60%", lg: "50%" }}
          mb={"auto"}
          pb={10}
        >
          <RightSide posts={posts} setPosts={setPosts} />
        </Box>
      </HStack>
      {isOpen && (
        <CreateCommunityModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          posts={posts}
          setPosts={setPosts}
        />
      )}
    </Box>
  );
};

export default Community;

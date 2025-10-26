import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import { AdminLeftSide } from "./LeftSide";
import { AdminRightSide } from "./RightSide";
import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import { AdminCreateCommunityModal } from "./modal/AdminCommunity";
import { IoIosAdd } from "react-icons/io";

export const AdminCommunity = () => {
  const [adminPosts, setAdminPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosClient("/get-all-posts");

      setAdminPosts(res.data.posts);
    };
    getPosts();
  }, []);
  return (
    <>
      <HStack justifyContent={"space-between"}>
        {/* <Heading
          fontSize={{ base: "13px", md: "24px" }}
          pb={{ base: 0, md: 2 }}
          px={4}
        >
          Admin Community
        </Heading> */}
        <Button
          display={{ base: "flex", md: "none" }} // only visible on mobile
          bg={"#2b362f"}
          p={1}
          onClick={() => setIsOpen(true)} // 👈 this opens the modal
          size={"10"}
          mr={5}
          mb={4}
          ml={{ base: 6, md: 0 }}
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
        <AdminLeftSide posts={adminPosts} setPosts={setAdminPosts} />

        <Box
          display={{ base: "none", md: "block" }}
          w={{ base: "100%", md: "60%", lg: "50%" }}
          mb={"auto"}
          pb={{ base: 3, md: 10 }}
        >
          <AdminRightSide posts={adminPosts} setPosts={setAdminPosts} />
        </Box>
      </HStack>

      {isOpen && (
        <AdminCreateCommunityModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          posts={adminPosts}
          setPosts={setAdminPosts}
        />
      )}
    </>
  );
};

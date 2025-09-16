import { Box, Heading, HStack } from "@chakra-ui/react";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";

const Community = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const res = await axiosClient.get("/get-all-posts");

      setPosts(res.data.posts);
    };
    getPosts();
  }, []);
  return (
    <Box>
      <Heading pb={2} px={4}>
        Community
      </Heading>
      <HStack
        justifyContent={"space-between"}
        flexDirection={{ base: "column", md: "row" }}
        gap={5}
        alignItems={"center"}
        px={4}
      >
        <LeftSide posts={posts} setPosts={setPosts} />
        <RightSide posts={posts} setPosts={setPosts} />
      </HStack>
    </Box>
  );
};

export default Community;

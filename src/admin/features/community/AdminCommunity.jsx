import { Box, Heading, HStack } from "@chakra-ui/react"
import { AdminLeftSide } from "./LeftSide"
import { AdminRightSide } from "./RightSide"
import { useEffect, useState } from "react"
import axiosClient from "../../../axiosClient"


export const AdminCommunity = () => {
  const [adminPosts, setAdminPosts] = useState([]);
  useEffect(()=>{
    const getPosts = async ()=>{
      const res = await axiosClient('/get-all-posts');
     
      setAdminPosts(res.data.posts);
    }
    getPosts();
  },[])
  return (
    <Box>
    
   <HStack 
   justifyContent={'space-between'} 
   flexDirection={{base:'column',md:'row'}} 
   gap={5} 
   alignItems={'center'} 
   px={4}>
    <AdminLeftSide posts={adminPosts} setPosts={setAdminPosts}/>
    <AdminRightSide posts={adminPosts} setPosts={setAdminPosts}/>
   </HStack>
   </Box>
  )
}

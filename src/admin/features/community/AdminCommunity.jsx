import { Box, Heading, HStack } from "@chakra-ui/react"
import { AdminLeftSide } from "./LeftSide"
import { AdminRightSide } from "./RightSide"

export const AdminCommunity = () => {
  return (
    <Box>
    
   <HStack 
   justifyContent={'space-between'} 
   flexDirection={{base:'column',md:'row'}} 
   gap={5} 
   alignItems={'center'} 
   px={4}>
    <AdminLeftSide/>
    <AdminRightSide />
   </HStack>
   </Box>
  )
}

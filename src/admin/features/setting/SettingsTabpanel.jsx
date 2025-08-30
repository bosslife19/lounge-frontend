import { Box, Heading, IconButton, Link, Tabs } from "@chakra-ui/react"
import { IoIosArrowBack } from "react-icons/io"
import { SettingsProfile } from "./profile/profile"
import { SettingsPosts } from "./posts/Posts"
 
export const AdminSettingsTab = () => {
  return (
    <Box bg={'#F5F6FA'}>
     <Heading pl={5} display={'flex'} pb={4} gap={2} alignItems={'center'}>
      <IconButton
        aria-label="Previous"
        rounded="full"
        bg="white"
        border={'1px solid #9E9E9E'}
        _hover={{ bg: "whiteAlpha.500" }}
        size="sm"
        >
           <IoIosArrowBack color="#9E9E9E" />
        </IconButton>
               Settings
        </Heading>
    
    <Tabs.Root defaultValue="profile"  >
      <Tabs.List mx={4}>
        <Tabs.Trigger fontSize={{base:10,md:14}} value="profile" asChild>
          <Link unstyled href="#profile">
            Profile
          </Link>
        </Tabs.Trigger>
        <Tabs.Trigger fontSize={{base:10,md:14}} value="posts" asChild>
          <Link unstyled href="#posts">
            posts
          </Link>
        </Tabs.Trigger>
         
      </Tabs.List>
      <Tabs.Content value="profile">
        {/* profile */}
        <SettingsProfile/>
        </Tabs.Content>
      <Tabs.Content value="posts">
        {/* posts */}
       <SettingsPosts/>
        </Tabs.Content>
          
    </Tabs.Root>
    </Box>
  )
}

import { Tabs, Box, Heading, IconButton } from "@chakra-ui/react"
import { LuCircleAlert, LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"
import { TabPanel } from "./TabPanel"
import { MdAttachFile, MdStars } from "react-icons/md"
import { Program } from "./Program"
import { Links } from "./Links"
import { IoIosArrowBack } from "react-icons/io"
import { useEffect, useState } from "react"
import axiosClient from '../../../axiosClient'

export const TopTabs = () => {
   const [articles, setArticles] = useState([]);
  
    useEffect(()=>{
      const getArticles = async ()=>{
        const res = await axiosClient.get('/get-articles');
       
        setArticles(res.data.articles);
      }
  getArticles()
    },[]);
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
       Learning Hub
     </Heading>
    <Tabs.Root 
      defaultValue="articles"
      variant="#000"
      bg={'#F5F6FA'}
       rounded={20}
    >
      <Tabs.List 
        bg={'#F5F6FA'}
        border={'none'}
        gap={2}
        mx={5}
        rounded={20}
        p="13"
      >
        <Tabs.Trigger 
          value="articles" 
          color={'#9E9E9E'}
          bg={'#EBEBEB'}
           p={{base:2,md:6}}
           fontSize={{base:10,md:14}}
          rounded={5}
          _selected={{ bg: "#2B362F", color: "#fff" }}
        >
          <LuCircleAlert />
          Information
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="projects"
          color={'#9E9E9E'}
          bg={'#EBEBEB'}
           p={{base:2,md:6}}
           fontSize={{base:10,md:14}}
          rounded={5}
          _selected={{ bg: "#2B362F", color: "#fff" }}
        >
         <MdStars /> 
          Program
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="tasks"
          color={'#9E9E9E'}
          bg={'#EBEBEB'}
          p={{base:2,md:6}}
          fontSize={{base:10,md:14}}
          rounded={5}
          _selected={{ bg: "#2B362F", color: "#fff" }}
        >
          <MdAttachFile  />
          Links
        </Tabs.Trigger>
        <Tabs.Indicator rounded="l2" />
      </Tabs.List>

      <Tabs.Content value="articles">
        <Box>
          <TabPanel articles={articles} setArticles={setArticles} />
        </Box>
      </Tabs.Content>
      <Tabs.Content value="projects">
        <Box>
          <Program/>
        </Box>
      </Tabs.Content>
      <Tabs.Content value="tasks">
         <Links articles={articles} setArticles={setArticles}/>
      </Tabs.Content>
    </Tabs.Root>
     </Box>
  )
}

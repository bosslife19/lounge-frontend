import React, { useEffect, useState } from "react";
import { Box, Button, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";
import logo from "../../../../assets/userImage.jpg"
import notify from '../../../../assets/laughin.png'
import notify2 from '../../../../assets/video.png'
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../../../axiosClient";
import { formatTime } from "../../../../lib/formatTime";
const cardData = [
  { id: 1, image: logo,notificationImage:notify, title: "Card One", subtitle: "2 hours",para:"Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju....." },
  { id: 2, image: logo,notificationImage:notify2, title: "Card Two", subtitle: "2 hours",para:"Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju....." },
  { id: 3, image: logo,notificationImage:notify, title: "Card Three", subtitle: "2 hours",para:"Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju....." },
  { id: 4, image: logo,notificationImage:notify, title: "Card Four", subtitle: "2 hours",para:"Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju....." },
  { id: 5, image: logo,notificationImage:notify, title: "Card Five", subtitle: "2 hours",para:"Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju....." },
  { id: 6, image: logo,notificationImage:notify, title: "Card Six", subtitle: "2 hours",para:"Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju....." },
  { id: 7, image: logo,notificationImage:notify, title: "Card Seven", subtitle: "2 hours",para:"Kindly resolve the discrepancies, this is the blank empty state to start with nothing to share ju....." },
];

const CommunityPost = () => {
  const [favorites, setFavorites] = useState ([]);
  const [pointsHistory, setPoinstsHistory] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    const getPosts = async()=>{
      const res = await axiosClient.get('/get-all-posts');
      
      setPosts(res.data.posts);
    }
    getPosts()
  }, [])


const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
};

// Truncate for title/subtitle
const truncateTexts = (text, maxLength) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
};
 

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Just take the first 3 cards
  const displayedCards = cardData.slice(0, 3);

  const navigate = useNavigate()
  
  const handleNavigate = ()=>{
    navigate("/post-history")
  }
  return (
    <Box flex="3" className="mx-auto p-6">
      <Flex justifyContent={'space-between'}>
        <Button bg={'transparent'} color={'#202224'}    >
       Latest Posts
      </Button>
      <Button onClick={()=>navigate('/community')} bg={'transparent'} color={'#3366CC'} textDecoration={'underline'}>
      See all
      </Button>
      </Flex>
      
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        
        {posts.length>0? posts.map((card) => (
          <Box
          px={3}
            key={card.id}
            border={'1px solid #F0F2F5'}
            className="bg-[#F9FAFB] rounded-2xl  relative overflow-hidden"
          >
             <HStack 
                    pt={5}
                    
                       pb={2}  
                        spacing={4} 
                           align="center">
                              <Stack position={'relative'}>
                                <Image
                                  src={card.user.profile_picture||logo}
                                    alt="Update"
                                    boxSize="30px"
                                     rounded={20}
                                   />
                                  </Stack>
                                   <HStack alignItems={'center'}>
                                    <Text 
                                    color={'#202020'}
                                    fontSize={{base:8,md:12}}
                                      fontFamily="InterMedium">
                                      {truncateTexts(card.user.name)}
                                    </Text>
                                  <Text 
                                    color={'#98A2B3'}
                                    fontSize={{base:8,md:12}}
                                      >
                               {formatTime(card.created_at)}
                        </Text>
                     </HStack>
              </HStack>
              <Text fontFamily="InterRegular" 
              fontSize={{base:12,md:13}}
              color={'#475367'} 
              className="font-semibold"> {truncateText(card.body, 90)}</Text>

            {/* <HStack rounded={10} mb={2} py={1} pl={2} pr={3} w={{base:10,md:110}} bg={'#fff'} border={'1px solid #F0F2F5'}>
               <Image
                 src={card.notificationImage}
                 alt="Update"
                 boxSize="22px"
                rounded={0}
                />
               <Text
                color={'#344054'}
                fontSize={{base:8,md:11}}
               >
                Video.MP3
               </Text>
            </HStack> */}
            {/* <Button fontFamily="LatoBold" rounded={5} fontSize={12} py={0}  mb={2} border={'1px solid #D0D5DD'} bg={'#fff'} color={'#344054'}>
              See Message
            </Button> */}
          </Box>
        )):<Text>No Posts yet</Text>}
        
      </Box>
    </Box>
  );
};

export default CommunityPost;

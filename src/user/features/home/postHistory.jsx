 import {  useNavigate } from "react-router-dom";
import { Box, Image, Text, Stack, HStack, Button, Flex } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { cardData } from "../../../hooks/useData";
import logo from '../../../assets/userImage.jpg'
  import btns from "../../../assets/btn.svg"
import { useContext, useEffect, useState } from "react";
import { Card } from "./RightSide/Card";
import MentorsBoxPage from "./RightSide/mentorsCard";
import axiosClient from "../../../axiosClient";
import {formatTime} from '../../../lib/formatTime';

import { AuthContext } from "../../../context/AuthContext";
 
const PostHistory = () => {
   const navigate = useNavigate();
   const [histories, setHistories] = useState([]);
   const {userDetails} = useContext(AuthContext)
 
   useEffect(()=>{
    const getHistories = async ()=>{
      const res = await axiosClient.get(`/points-histories/${userDetails.id}`);
      
      setHistories(res.data.histories);
    }
    getHistories();
   }, [])
 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
 

  
  return (
   <Flex bg={'#FAFAFA'} h={'100vh'} flexDirection={{base:'column',md:'row'}} 
   alignItems={'flex-start'} 
   justifyContent={'space-between'}>
     <Box  w={{base:'100%',md:'80%'}} pl={4}>
      {/* Back Button */}
      <Button
        variant="outline"
        mb={4}
        onClick={() => navigate(-1)}
      >
       <IoIosArrowBack />
       Points History
      </Button>
      {/* Profile Info */}
      <Box >
        {histories.length>0? histories.map((card, idx) => (
           <Box
             key={`${card.id}-${idx}`}
                flexShrink={0}
                  px={4}
                  py={2}
                  m={3}
                  cursor={'pointer'}
                  shadowColor={'#3E67A52E'}
                  shadow={'sm'}
                  rounded={10}
                  className="bg-white    relative"
                 >
                  <HStack 
                    pt={4}
                     pb={2}  
                        spacing={4} 
                        align="center"
                        justifyContent={'space-between'}
                        >
                          <HStack>
                            <Stack position={'relative'}>
                          <Image
                            src={userDetails?.profile_picture||logo}
                            alt="Update"
                            boxSize="50px"
                             rounded={20}
                          />
                          </Stack>
                           <Stack>
                            <Text 
                            color={'#202020'}
                            fontSize={{base:8,md:10}}
                              fontFamily="InterRegular">
                              {card.title}
                            </Text>
                          <Text 
                            color={'#808291'}
                            fontFamily="InterRegular"
                            fontSize={{base:10,md:14}} 
                            mt={'-2'}  >
                           {card.description}
                          </Text>
                         </Stack>
                          </HStack>
                          <Text 
                            color={'#202020'}
                            fontSize={{base:10,md:14}} 
                            mt={'-2'}  >
                           {formatTime(card.created_at)}
                          </Text>
                           <Text 
                           fontFamily="InterBold"
                            color={'#179F3B'}
                            fontSize={{base:14,md:18}} 
                            mt={'-2'}  >
                           {card.addition}
                          </Text>
                  </HStack>
                </Box>
              )):<Text>No Points Histories yet</Text>}
    </Box>
    </Box>
    {/* small cards */}
    <Box bg={'#fff'} h={'100%'} w={{base:'100%',md:'30%'}} p={3} className="pb={4}">
         <Box >
          <Card />
         <MentorsBoxPage/>
        </Box>
    </Box>
   </Flex>
  );
};

export default PostHistory;

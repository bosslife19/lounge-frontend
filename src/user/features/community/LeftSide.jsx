import {
  Avatar,
  Box,
  Button,
  Card,
   Flex,
   Heading,
   HStack,
   Image,
   Input,
   InputGroup,
   Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
  import { cardData } from "../../../hooks/useData";
 import { BsThreeDots } from "react-icons/bs";
 import like from "../../../assets/streamline_like-1-solid.png"
 import heart from "../../../assets/solar_heart-angle-bold.png"
 import bulb from "../../../assets/fluent-color_lightbulb-filament-20.png"
import { GrMicrophone, GrSend } from "react-icons/gr";
import { CiImageOn } from "react-icons/ci";
import axiosClient from "../../../axiosClient";
import userImage from '../../../assets/userImage.jpg'
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";




export const LeftSide = () => {
  const [posts, setPosts] = useState([]); 
  const userDetails = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [comment, setComment] = useState('');
  const {makeRequest} = useRequest();
  useEffect(()=>{
    const getPosts = async()=>{
      const res = await axiosClient.get('/get-all-posts');
      console.log(res.data.posts);
      setPosts(res.data.posts);

    }
    getPosts();
  },[refresh])
  const commentRef = useRef();
  function timeAgo(timestamp) {
  const now = new Date();
  const past = new Date(timestamp);
  const diff = Math.floor((now - past) / 1000); // difference in seconds

  if (diff < 60) {
    return `${diff} sec${diff !== 1 ? 's' : ''} ago`;
  } else if (diff < 3600) {
    const mins = Math.floor(diff / 60);
    return `${mins} min${mins !== 1 ? 's' : ''} ago`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (diff < 2592000) {
    const days = Math.floor(diff / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (diff < 31536000) {
    const months = Math.floor(diff / 2592000);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diff / 31536000);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
}


const handleComment = async(id)=>{

 
  
  if(!comment){
    return;
  }

  const res = await makeRequest('/comment', {
    post_id: id,
    body:comment

  })
  if(res.error) return;

  setRefresh(prev=>!prev);
 setComment('');
  // toast.success("Comment added successfully");

}
const actions = [
  { id: 1, image: like },
  { id: 2, image: heart },
  { id: 3, image: bulb},
   ];
   
  return (
      <Stack w={'100%'} mb={'auto'} gap={7}>
        
      {posts?.map((card) => (
        <Card.Root
          key={card.id}
          bg={"#fff"}
          shadowColor={"#080F340F"}
          shadow={"sm"}
          rounded={20}
          border={"1px solid #fff"}
         > 
         <Card.Body gap="2">
            <Flex alignItems={'flex-start'} justifyContent={'space-between'}>
               <HStack>
                   <Stack position={"relative"}>
                           <Image
                            src={card.user.profile_picture ||userImage}
                            alt="Update"
                            boxSize="50px"
                             rounded={20}
                          />
                          </Stack>
                          <Stack >
                          <Text
                            color={"#191919"}
                            fontSize={{ base: 10, md: 14 }}
                            fontFamily="InterBold"
                         >
                           {card.user.first_name} {card.user.last_name}

                         </Text>

                         <Text
                         mt={-3}
                            color={"#202020"}
                            fontSize={{ base: 10, md: 14 }}
                            fontFamily="InterMedium"
                         >
                           {card.user.profession}
                         </Text>
                        <Text
                           color={"#626262"}
                           fontFamily="InterRegular"
                           fontSize={{ base: 10, md: 13 }}
                           mt={"-2"}
                       >
                          {timeAgo(card.created_at)}
                        </Text>
                      </Stack>
                </HStack>
                <Button color={'#212121'} bg={'transparent'}>
                    <BsThreeDots />
                </Button>
                </Flex>
                  
                  <Text textAlign={"center"}
                  color={'#070416'}
                  fontSize={{base:12,md:16}}
                    fontFamily="InterRegular">
                    {card.desc3}
                  </Text>
                  <Text  
                   color={'#0966C2'}
                   fontSize={{base:12,md:16}}
                    fontFamily="InterMedium"
                    >
                 {card.body}
                  </Text>
                  
                </Card.Body>
                 <Image 
                   src={card.post_image}
                      boxSize={'100%'}
                      h={220}
                      fit="cover"
                    />
                    <HStack alignItems={'center'} px={1} pt={5}>
                        {actions.map((items,index)=>(
                            <Button p={0} bg={'transparent'} key={index}>
                              <Image src={items.image} 
                               boxSize={5} />
                             </Button>
                        ))}
                        <Text 
                        color={'#707070'}
                        fontSize={{base:12,md:14}}>
                            {card.comments?.length ||0} Comments
                        </Text>
                    </HStack>
                <Card.Footer borderTop={'1px solid #E9E5DF'} mt={1} pt={6}>
            <InputGroup
             endElement={
            <Flex  
            align="right">
            <Button
             w={10}
             h={10}
              boxSize={0}
             bg="transparent"
            color="#000"
            position="absolute"
            right="3"
            top="50%"
            transform="translateY(-50%)"
            zIndex={1}

            onClick={()=>handleComment(card.id)}
           >
           <GrSend />
         </Button>
          {/* <Button
           w={10}
           h={10}
           boxSize={0}
           bg="transparent"
           color="#00000075"
           position="absolute"
           right="0"
           top="50%"
           transform="translateY(-50%)"
           zIndex={1}
         >
           <CiImageOn />
         </Button> */}
        </Flex>
        }
         startElement={
          <Avatar.Root ml={-2} mt={-2} size="xs">
           {/* <Avatar.Fallback name="Segun Adebayo" /> */}
           <Avatar.Image src={userDetails.profile_picture||userImage} />
          </Avatar.Root>
          }
         >
        <Box  w="100%" position="relative">
        <Textarea
         placeholder="write a comment"
         resize="none"
         autoresize 
         minH="60px"
         bg={'#F6F6F6'}
         textWrap={'stable'}
         onChange={(e)=>setComment(e.target.value)}
         value={comment}
         outline={'none'}
         py={3}
         pr="80px" // leaves space so buttons float over
         pl="40px"
         borderRadius="xl"
         fontSize="11px"
         lineHeight="1.4"
         _placeholder={{ color: "#0000005C" }}
        />
       </Box>
      </InputGroup>
      </Card.Footer>
      </Card.Root>
    ))}
    </Stack>
   )
}

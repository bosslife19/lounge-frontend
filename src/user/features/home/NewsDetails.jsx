 import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Image, Text, Stack, HStack, Button, Flex } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { cardData } from "../../../hooks/useData";
  import btns from "../../../assets/btn.svg"
import { useEffect, useState } from "react";
import { formatTime } from "../../../lib/formatTime";
import axiosClient from "../../../axiosClient";
 
const NewsDetails = () => {
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const profile = cardData.find((item) => item.id === Number(id));
   
   const [moreNews, setMoreNews] = useState([])
   
   const [update, setUpdate] = useState(null)
   useEffect(()=>{
    const getMoreNews = async()=>{
      const res = await axiosClient.get('/updates');
     
      const same = res.data.articles.filter(item=>item.id == id)
      setUpdate(same[0]);
      setMoreNews(res.data.articles)
    }
    getMoreNews()
   }, [])
  


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!profile) {
    return <Text>Profile not found</Text>;
  }

  
  return (
   <Flex bg={'#FAFAFA'} flexDirection={{base:'column',md:'row'}} alignItems={'flex-start'} justifyContent={'space-between'}>
     <Box  w={{base:'100%',md:'80%'}} mx="auto" p={6}>
      {/* Back Button */}
      <Button
        variant="outline"
        mb={4}
        onClick={() => navigate(-1)}
      >
       <IoIosArrowBack />
       News & Updates
      </Button>
      {/* Profile Info */}
      <Stack bg={'#fff'} p={4} borderRadius={10} spacing={4} mb={4}>
         <Image
        src={update?.image}
        alt={update?.title}
        w="100%"
        h={{ base: "200px", md: "300px" }}
        objectFit="cover"
        rounded="xl"
        mb={6}
      />
        <Stack spacing={0}>
          <Text fontWeight="bold"  
          fontFamily="LatoBold" 
          fontSize={{base:18,md:24}}
           color={'#202020'}>{update?.title}</Text>
          <Text fontFamily="LatoRegular" 
          fontSize={{base:14,md:16}}
           color={'#1C1C1CB2'}>
            {update?.content}
          </Text>
             </Stack>
                   <HStack 
                        // px={6}
                        pt={4}
                        pb={2}  
                        spacing={4} 
                        
                        align="flex-start">
                          <Stack position={'relative'}>
                          <Image
                            src={profile.subimage}
                            alt="Update"
                            boxSize="30px"
                             rounded={20}
                            // objectFit="cover"
                          />
                          </Stack>
                           <Stack>
                            <Text 
                            color={'#202020'}
                            fontSize={{base:8,md:10}}
                              fontFamily="InterMedium">
                              The Lounge Team
                            </Text>
                          <Text 
                            color={'#202020'}
                            fontSize={{base:8,md:10}} 
                            mt={'-2'}  >
                           {formatTime(update?.created_at)}
                       </Text>
                   </Stack>
            </HStack>
      </Stack>
    </Box>
    {/* small cards */}
    <Box w={{base:'100%',md:'30%'}}  className="pb={4}">
          <Text pl={4} pt={3} mb={-2} color={'#101928'} fontWeight={'medium'}>More News & Updates</Text>
          <Box >
              {moreNews.length>0 && moreNews.map((card, idx) => (
                <Box
                  key={`${card.id}-${idx}`}
                  flexShrink={0}
                  px={4}
                  pt={4}
                  m={3}
                  cursor={'pointer'}
                  
                  className="bg-white   rounded-2xl shadow-lg relative"
                  onClick={() =>setUpdate(card)}
                >
                  <Image
                    roundedTop={10}
                    src={card.image}
                    alt={card.title}
                    className="w-full h-40 object-cover"
                  />
                  <button
                     className="absolute cursor-pointer top-5 right-6"
                  >
                    <Image
                    roundedTop={10}
                    src={btns}
                    alt={card.title}
                    className="w-full h-40 object-cover"
                  />
                    
                  </button>
                  <Box pt={2}>
                    <Text  
                    // fontFamily="LatoRegular" 
                    fontSize={{base:12,md:14}} 
                    lineHeight={-2}
                    className="font-semibold">{card.title}</Text>
                   </Box>
                  <HStack 
                        // px={6}
                        pt={4}
                        pb={2}  
                        spacing={4} 
                        
                        align="flex-start">
                          <Stack position={'relative'}>
                          <Image
                            src={profile.subimage}
                            alt="Update"
                            boxSize="30px"
                             rounded={20}
                            // objectFit="cover"
                          />
                          </Stack>
                           <Stack>
                            <Text 
                            color={'#202020'}
                            fontSize={{base:8,md:10}}
                              fontFamily="InterMedium">
                              The Lounge Team
                            </Text>
                          <Text 
                            color={'#202020'}
                            fontSize={{base:8,md:10}} 
                            mt={'-2'}  >
                           {formatTime(card.created_at)}
                          </Text>
                         </Stack>
                  </HStack>
                </Box>
              ))}
          </Box>
    </Box>
   </Flex>
  );
};

export default NewsDetails;

 import { useParams, useNavigate } from "react-router-dom";
import { Box, Image, Text, Stack, HStack, Button, Flex } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { cardData } from "../../../hooks/useData";
  import btns from "../../../assets/btn.svg"
import { useEffect } from "react";
import { userAvatar } from "../../../user/features/setting/posts/Posts";
 
const OrganizationProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = cardData.find((item) => item.id === Number(id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

 
  
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
        src={userAvatar}
        alt={profile.title}
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
           color={'#202020'}>{profile.title}</Text>
          <Text fontFamily="LatoRegular" 
          fontSize={{base:14,md:16}}
           color={'#1C1C1CB2'}>
            {profile.subtitle}
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
                           {profile.date}
                       </Text>
                   </Stack>
            </HStack>
      </Stack>
    </Box>
    {/* small cards */}
    <Box w={{base:'100%',md:'30%'}}  className="pb={4}">
          <Text pl={4} pt={3} mb={-2} color={'#101928'} fontWeight={'medium'}>More News & Updates</Text>
          <Box >
              {cardData.map((card, idx) => (
                <Box
                  key={`${card.id}-${idx}`}
                  flexShrink={0}
                  px={4}
                  pt={4}
                  m={3}
                  cursor={'pointer'}
                  
                  className="bg-white   rounded-2xl shadow-lg relative"
                  onClick={() => navigate(`/profile/${card.id}`)}
                >
                  <Image
                    roundedTop={10}
                    src={card.eImage}
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
                            src={card.subimage}
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
                           {card.date}
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

export default OrganizationProfileDetails;

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
import { GrMicrophone } from "react-icons/gr";
import { CiImageOn } from "react-icons/ci";


export const AdminLeftSide = () => {
const actions = [
  { id: 1, image: like },
  { id: 2, image: heart },
  { id: 3, image: bulb},
   ];
  return (
      <Stack w={'100%'} mb={'auto'} gap={7}>
        
      {cardData.map((card, idx) => (
        <Card.Root
          key={idx}
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
                            src={card.eImage}
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
                           John
                         </Text>
                         <Text
                         mt={-3}
                            color={"#202020"}
                            fontSize={{ base: 10, md: 14 }}
                            fontFamily="InterMedium"
                         >
                           Banker
                         </Text>
                        <Text
                           color={"#626262"}
                           fontFamily="InterRegular"
                           fontSize={{ base: 10, md: 13 }}
                           mt={"-2"}
                       >
                          20h
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
                  #hastag #hastag #hashtag 
                  </Text>
                  
                </Card.Body>
                 <Image 
                   src={card.eImage}
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
                            88 Comments
                        </Text>
                    </HStack>
                <Card.Footer borderTop={'1px solid #E9E5DF'} mt={1} pt={6}>
            <InputGroup
             endElement={
            <Flex  
            align="center">
            <Button
             w={10}
             h={10}
              boxSize={0}
             bg="transparent"
            color="#00000075"
            position="absolute"
            right="7"
            top="50%"
            transform="translateY(-50%)"
            zIndex={1}
           >
           <GrMicrophone />
         </Button>
          <Button
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
         </Button>
        </Flex>
        }
         startElement={
          <Avatar.Root ml={-2} mt={-2} size="xs">
           <Avatar.Fallback name="Segun Adebayo" />
           <Avatar.Image src={card.eImage} />
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

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
   Menu,
   Portal,
   Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
  import { cardData } from "../../../../hooks/useData";
 import { BsThreeDots } from "react-icons/bs";
 import like from "../../../../assets/streamline_like-1-solid.png"
 import heart from "../../../../assets/solar_heart-angle-bold.png"
 import bulb from "../../../../assets/fluent-color_lightbulb-filament-20.png"
import { GrMicrophone } from "react-icons/gr";
import { CiImageOn } from "react-icons/ci";
import { CgRemove } from "react-icons/cg";
import { IoIosArrowUp, IoMdCloseCircleOutline } from "react-icons/io";


export const PostAdminDetails = () => {
const actions = [
  { id: 1, image: like },
  { id: 2, image: heart },
  { id: 3, image: bulb},
   ];
  return (
      <Stack maxW={{base:'100%',md:600}} mb={'auto'} gap={7}>
        
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
                 {/* toggle */}
                <Menu.Root>
      <Menu.Trigger asChild >
        <Button bg={'transparent'} color={'#212121'}  size="sm">
          <BsThreeDots />
        </Button>
      </Menu.Trigger>
      <Portal rounded={30}>
        <Menu.Positioner rounded={30} >
          <Menu.Content rounded={25}>
           <Menu.Item value="new-txt"> Action <IoIosArrowUp /></Menu.Item>
            <Menu.Item value="new-txt"> <IoMdCloseCircleOutline /> Remove Post</Menu.Item>
            
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
               
              
                </Flex>
                  
                  <Text textAlign={"center"}
                  color={'#070416'}
                  fontSize={{base:12,md:16}}
                    fontFamily="InterRegular">
                    {card.desc3}
                  </Text>
                  {/* <Text  
                   color={'#0966C2'}
                   fontSize={{base:12,md:16}}
                    fontFamily="InterMedium"
                    >
                  #hastag #hastag #hashtag 
                  </Text> */}
                  
                </Card.Body>
                 <Image 
                   src={card.eImage}
                      boxSize={'100%'}
                      h={220}
                      fit="cover"
                    />
                    <HStack borderBottom={'1px solid #E9E5DF'} mb={1} pb={6} alignItems={'center'} px={1} pt={5}>
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
               
      </Card.Root>
    ))}
    </Stack>
   )
}

import {
  Avatar,
  Box,
  Button,
  Card,
   Flex,
   HStack,
   Image,
   InputGroup,
   Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
  import { cardData } from "../../../hooks/useData";
  import like from "../../../assets/streamline_like-1-solid.png"
 import heart from "../../../assets/solar_heart-angle-bold.png"
 import bulb from "../../../assets/fluent-color_lightbulb-filament-20.png"
 import { CiImageOn } from "react-icons/ci";
import { PiTelegramLogoLight } from "react-icons/pi";


export const AdminRightSide = () => {
const actions = [
  { id: 1, image: like },
  { id: 2, image: heart },
  { id: 3, image: bulb},
   ];
  return (
      <Stack w={{base:'100%',md:'50%'}} mb={'auto'}>
      {cardData.map((card, idx) => (
        <Card.Root
          key={idx}
          bg={"#fff"}
          shadowColor={"#080F340F"}
          shadow={"sm"}
          rounded={20}
          border={"1px solid #fff"}
          px={4}
         > 
         <Card.Body gap="2" >
               <HStack ml={-5}>
                   <Stack position={"relative"}>
                           <Image
                            src={card.eImage}
                            alt="Update"
                            boxSize="40px"
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
                            fontWeight={'normal'}
                            fontSize={{ base: 10, md: 14 }}
                            fontFamily="InterRegular"
                         >
                           Banker
                         </Text>
                        
                      </Stack>
                </HStack>
                 
                </Card.Body>
                 <Textarea h={100} pb={300} fontSize={13} autoresize variant="subtle" placeholder="Write your post or question here" />
                     <Button 
                     my={4}
                     bg={'#EFF2FC'} 
                     color={'#292D32'} 
                     rounded={20} 
                     fontSize={11} 
                     mr={'auto'}>
                        <CiImageOn />
                        Add media
                     </Button>
                <Card.Footer borderTop={'1px solid #D4D7E5'}>
                <Button 
                     mt={5}
                     bg={'#000'} 
                     color={'#fff'} 
                     rounded={20} 
                     fontSize={{base:12,md:15}} 
                     px={10}
                     mr={-4}
                      fontFamily="InterRegular"
                     ml={'auto'}>
                       Post
                <PiTelegramLogoLight />               
            </Button>
        </Card.Footer>
      </Card.Root>
    ))}
    </Stack>
   )
}

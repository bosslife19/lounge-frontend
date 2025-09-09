import { Box, HStack, Image, Input, InputGroup, Stack, Text } from '@chakra-ui/react'
import { cardData } from '../../../hooks/useData'
import { CiSearch } from 'react-icons/ci';
import { userAvatar } from '../setting/posts/Posts';
 
export const Links = ({articles}) => {
    const truncateTexts = (text, maxLength) => {
  if (!text) return "";
  return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
};

  return (
    <Box   p={5}>
     <InputGroup
      w={300}        
      mt={-5}
      mb={5}
      startElement={<CiSearch size={15} />}
     >
     <Input
      py={15}
      fontSize={10}
      borderRadius={10}
      placeholder="Search..."
     />
     </InputGroup>
    {articles?.map((card, idx) => (
        <Box w={{base:'100%',md:700}} 
        rounded={10} 
        my={4} 
        p={5} 
        shadow={'sm'}
        shadowColor={'#3E67A52E'}
        bg="#fff" 
        border={'1px solid #3E67A52E'}>
          <HStack>
                  <Image
                   src={userAvatar} 
                   alt="Speaker" 
                   boxSize="40px" 
                   rounded="full" />
                  <Stack spacing={0}>
                    <Text color="#070B28" fontSize={{ base: 10, md: 12 }} 
                    fontFamily="InterRegular">
                      The Lounge Team
                    </Text>
                    <Text 
                     fontFamily="InterRegular"
                    color="#808291" mt={-1} 
                    textDecoration={'underline'}
                    fontSize={{ base: 9, md: 11 }}>
                    {card.link}
                    </Text>
                  </Stack>
             </HStack>
       </Box>  
     ))}
    </Box>
     
  )
}

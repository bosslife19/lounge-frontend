import { Box, HStack } from '@chakra-ui/react'
import { LeftSectionProfile } from './Leftsection';
import { RightSectionProfile } from './RightSection';

export const SettingsProfile = () => {
 

  return (
    <Box  height={'100vh'}>
    <HStack
    gap={5}
    flexDirection={{base:'column',xl:'row'}}   
    justifyContent={'space-between'} 
    px={5} py={2} >
      <LeftSectionProfile/>
       <RightSectionProfile/>
    </HStack>
     </Box>
  )
}

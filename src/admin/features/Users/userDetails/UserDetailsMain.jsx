import { Box, Grid } from "@chakra-ui/react"
import { UserDetailsTabpanel } from "./TabPanelDetails"
import { ReusableUserDetailsCard } from "../../../components/Card/UserDetailsCard"
import avatar from "../../../../assets/userImage.jpg"
 import badge from "../../../../assets/stash_badge-verified-solid.png"

export const UserDetailsMain = () => {
  return (
    <Box mb={6} p={5} h={'150%'}  bg="#F5F6FA">
        <Grid templateColumns={{base:"repeat(1, 1fr)",
            md:"repeat(2, 1fr)",
            lg:"repeat(3, 1fr)",
            xl:"repeat(3, 1fr)"}} gap="2">
            <ReusableUserDetailsCard
            image={avatar}
             UserName={'Timothy Fosumensah'}
             Deactivate
             id={'#543567'}
             badge={badge}
              ticks
              timestamps={'user since 05/09/23'}
              VerifiedMentore={'Verified Mentor'}
            />
            <ReusableUserDetailsCard
            title={'Total Points Balance'}
             description={'40,689'}
             bonusDate={'Last bonus date'}
           toggle={true}
             timestamp={'08-06-2023  05:30PM'}
             />
            <ReusableUserDetailsCard
             title={'Total Mentor Listings'}
             description={'40,689'}
             bonusDate={'Last bonus date'}
               toggle={true}
              timestamp={'08-06-2023  05:30PM'}
            />
            </Grid>

       <UserDetailsTabpanel/> 
    </Box>
  )
}

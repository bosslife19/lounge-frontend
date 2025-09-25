import { Box, Button, Grid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ReusableUserDetailsCard } from "../../../components/Card/UserDetailsCard";
import avatar from "../../../../assets/userImage.jpg";
import badge from "../../../../assets/MdBusinessCenter.png";
import { OrgDetailsTabpanel } from "./OrgTabPanelDetails";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

export const OrganDetailsAdminMain = () => {
  const navigate = useNavigate();

  return (
    <Box mb={6} p={{ base: 1, md: 5 }} h={"100%"} bg="#F5F6FA">
      <Button
        bg={"transparent"}
        color={"#9E9E9E"}
        rounded={50}
        p={0}
        mb={10}
        mt={-4}
        border={"1px solid #9E9E9E"}
        onClick={() => navigate(-1)} // 👈 go back
      >
        <MdOutlineKeyboardArrowLeft size={20} />
      </Button>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        gap="2"
      >
        <ReusableUserDetailsCard
          image={avatar}
          UserName={"Timothy Fosumensah"}
          Deactivate
          id={"#543567"}
          badge={badge}
          ticks
          timestamps={"user since 05/09/23"}
          VerifiedMentore={"Finance"}
        />

        <ReusableUserDetailsCard
          title={"Total Members"}
          description={"4,689"}
          bonusDate={"Last Member Joined"}
          toggle={true}
          timestamp={"08-06-2023  05:30PM"}
        />
      </Grid>

      <OrgDetailsTabpanel />
    </Box>
  );
};

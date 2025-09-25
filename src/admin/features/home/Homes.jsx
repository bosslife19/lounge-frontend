import { Box } from "@chakra-ui/react";
import { DashboardCard } from "./DashboardCard";
import { BottomTable } from "../../components/BottomTable";
import { DashboardTabpanel } from "./TabPanel";

export const AdminHome = () => {
  return (
    <Box h="100%" bg="#F5F6FA" px={6}>
      <DashboardCard />
      <DashboardTabpanel />
    </Box>
  );
};

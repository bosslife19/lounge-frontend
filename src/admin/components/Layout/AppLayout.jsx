import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBarItem from "./SideBar";
// import Header from '../Headers/dashboard/header';
import { Box } from "@chakra-ui/react";
import Header from "../Headers/dashboards/header";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box bg={"#FDFDFD"} className="bg-[#FDFDFD] ">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen  overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <SideBarItem
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        <div className=" flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="bg-[#FDFDFD]">
            <Box
              bg={"#FDFDFD"}
              h={"110%"}
              pb={10}
              className="p-4 md:p-6 2xl:p-10 bg-[#FDFDFD]"
            >
              <Outlet />
            </Box>
          </main>
        </div>
      </div>
    </Box>
  );
};

export default AdminLayout;

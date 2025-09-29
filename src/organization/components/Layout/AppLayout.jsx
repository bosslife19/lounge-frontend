import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBarItem from "./SideBar";
import Header from "../header/header";
import { Box } from "@chakra-ui/react";

const AppLayouts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen  overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <SideBarItem
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        {/* <!-- ===== Sidebar End ===== --> */}

        <div className=" flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
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
    </div>
  );
};

export default AppLayouts;

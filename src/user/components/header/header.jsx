import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import Avatar from "./Avatar";
import { Box } from "@chakra-ui/react";
import { FaCog, FaImage } from "react-icons/fa";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownOptions = [
    {
      text: "Change Image",
      icon: FaImage,
      handler: () => {
        if (fileInputRef.current) {
          fileInputRef.current.click(); // Trigger file picker
        }
      },
    },
    {
      text: "Settings",
      icon: FaCog,
      handler: () => {
        navigate("/settings"); // Navigate to settings page
      },
    },
    {
      text: "Logout",
      icon: HiOutlineLogout,
      color: "text-red-500",
      handler: () => {
        localStorage.clear();
        navigate("/login");
      },
    },
  ];

  const toggleDropdown = (dropdownType) => {
    setDropdownOpen(dropdownOpen === dropdownType ? null : dropdownType);
  };

  //  Check if current path is dashboard or directory
  const isWhiteHeader =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/directory");

  return (
    <Box
      // bg={"#F5F6FA"}
      justifyContent={"flex-end"}
      className="pt-[20px] top-5 flex flex-col z-[51] my-[12px]"
    >
      <div className="flex flex-grow items-center justify-between py-[12px] px-4 md:px-6 2xl:px-11">
        {/* Sidebar Toggle Button */}
        <Box pl={2} className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              // e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="block rounded-sm p-1.5 shadow-sm"
          >
            <svg
              className="h-[24px] md:h-12 w-[22px] md:w-10 fill-current p-2 border rounded-full text-blue"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </Box>

        {/* Header Actions */}
        <Box
          display={{ base: "block", xl: "none" }}
          ml={"auto"}
          justifyContent={"flex-end"}
          className="flex items-center gap-5"
          bg={"transparent"}
          pt={4}
          px={"6%"}
          pb={2}
        >
          <Box className="border-l-2 pl-4">
            <button onClick={() => toggleDropdown("avatar")}>
              <Avatar options={dropdownOptions} />
            </button>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default Header;

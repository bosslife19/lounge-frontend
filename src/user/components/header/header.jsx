import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import Avatar from "./Avatar";
import { Box, Button, Image, Input, InputGroup } from "@chakra-ui/react";
import Notfyimage from "../../../assets/btn.png";
import { BiSearch } from "react-icons/bi";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search input
  const [dropdownOpen, setDropdownOpen] = useState(null); // State to track which dropdown is open
  const navigate = useNavigate();

  const dropdownOptions = [
    {
      text: "Logout",
      icon: HiOutlineLogout,
      color: "text-red",
      handler: () => {
        localStorage.clear();
        navigate("/login");
      },
    },
  ];

  const toggleDropdown = (dropdownType) => {
    if (dropdownOpen === dropdownType) {
      setDropdownOpen(null); // Close the dropdown if it is already open
    } else {
      setDropdownOpen(dropdownType); // Open the selected dropdown and close the other
    }
  };

  return (
    <Box
      px={4}
      pt={4}
      pb={2}
      bg={"#F5F6FA"}
      justifyContent={"flex-end"}
      className="mt-[20px] top-5 flex flex-col z-[51]  my-[12px]"
    >
      <div className="flex flex-grow items-center justify-between py-[12px] px-4  md:px-6 2xl:px-11">
        {/* Sidebar Toggle Button */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="block rounded-sm  p-1.5 shadow-sm"
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
        </div>

        {/* Search Bar */}
        {/* <Box md:w={{ base: "350px", md: "600px" }} className="hidden sm:block ">
          <InputGroup fontFamily={"inter"} startElement={<BiSearch />}>
            <Input
              h={{ base: 20, md: 50 }}
              rounded={10}
              placeholder="Search your course here...."
            />
          </InputGroup>
        </Box> */}

        {/* Header Actions */}
        <Box
          w={"100%"}
          justifyContent={"flex-end"}
          className="flex items-center gap-5"
        >
          {/* <Button bg={"transparent"}>
            <Image
              w={{ base: 29, lg: 46 }}
              src={Notfyimage}
              alt="Lounge Logo"
              className="object-cover  rounded-full"
            />
          </Button> */}

          {/* Avatar Dropdown */}
          <div className="border-l-2 pl-4">
            <button onClick={() => toggleDropdown("avatar")}>
              <Avatar options={dropdownOptions} />
            </button>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default Header;

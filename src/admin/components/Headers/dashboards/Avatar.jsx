import React, { useState, useEffect, useRef } from "react";
import Avatars from "../../../../assets/userImage.jpg";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import Notfyimage from "../../../../assets/Notification.png";
// import { AuthContext } from "../../../context/AuthContext";

const Avatar = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);
  return (
    <div
      className="relative flex items-center md:gap-3 cursor-pointer"
      ref={dropdownRef}
    >
      <Box
        className="cursor-pointer md:gap-[20px] flex items-center"
        onClick={toggleDropdown}
      >
        <Button bg={"transparent"}>
          <Image
            w={{ base: 8, md: 10 }}
            h={{ base: 8, md: 10 }}
            src={Notfyimage}
            alt="Lounge Logo"
            className="object-cover w-[46px] h-[46px] rounded-full"
          />
        </Button>
        <Box
          py={{ base: 1, md: 2 }}
          px={{ base: 2, md: 6 }}
          rounded={{ base: 10, md: 50 }}
          border={{ base: "2px solid #F3F2F3", md: "6px solid #F3F2F3" }}
          className="flex-col flex px-2 items-center border"
        >
          {/* <span>{userDetails?.name||'Admin'}</span> */}
          <Text
            fontFamily={"InterRegular"}
            fontSize={{ base: "10px", md: "16px" }}
          >
            Admin
          </Text>
        </Box>
        <Image
          w={{ base: 6, lg: 10 }}
          h={{ base: 6, lg: 10 }}
          src={Avatars}
          alt="Avatar"
          className="object-cover  rounded-full"
        />
      </Box>
    </div>
  );
};

export default Avatar;

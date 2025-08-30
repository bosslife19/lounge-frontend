import React, { useState, useEffect, useRef, useContext } from "react";
  import Avatars from "../../../assets/userImage.jpg";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import Notfyimage from '../../../assets/Notification.png'
 import { AuthContext } from "../../../context/AuthContext";

const Avatar = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
const {userDetails} = useContext(AuthContext)
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
    <div className="relative flex items-center gap-3 cursor-pointer" ref={dropdownRef}>
      <div className="cursor-pointer gap-[20px] flex items-center" onClick={toggleDropdown}>
         <Button bg={'transparent'}>
           <Image w={{base:29,lg:46}} src={Notfyimage} alt="Lounge Logo" className="object-cover   rounded-full" />
         </Button>
         <Box py={2} px={6} rounded={50} border={'6px solid #F3F2F3'} className="flex-col flex px-2 items-center border">
          {/* <span>{userDetails?.name||'Admin'}</span> */}
          <Text fontFamily={'InterRegular'} fontSize={{base:'12px',md:'16px'}}>Mentors</Text>
        </Box>
        <Image w={{base:6,lg:10}} h={{base:6,lg:10}} src={userDetails.profile_picture || Avatars} alt="Avatar" className="object-cover  rounded-full" />
       
      </div>

       
    </div>
  );
};

export default Avatar;
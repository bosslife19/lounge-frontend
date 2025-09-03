import React, { useState, useEffect, useRef, useContext } from "react";
  import Avatars from "../../../assets/userImage.jpg";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import Notfyimage from '../../../assets/Notification.png'
 import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRequest } from "../../../hooks/useRequest";
const Avatar = ({ options }) => {
  const {userDetails, setUserDetails} = useContext(AuthContext)
  const {makeRequest} = useRequest();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);


    const handleImageClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click(); // open file picker
      }
    };
    const handleFileChange = async (event) => {
      const file = event.target.files?.[0];
      if (file) {
        // show preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
  
        // TODO: send `file` to your backend API for upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "lounge-platform"); // Replace with your Cloudinary preset
  
        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/wokodavid/image/upload",
            formData
          );
  
          const imageUrl = res.data.secure_url;
          
  
          const resp = await makeRequest("/profile/upload", {
            profilePic: imageUrl,
          });
  
          if (resp.error) {
            return;
          }
          setUserDetails(resp.response.user);
  
          toast.success(resp.response.message);
          // If you have a callback to inform parent component
        } catch (error) {
          console.error("Image upload failed", error);
          toast.error("Image Upload Failed. Please try again.");
        }
      }
    };

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
    <div className="relative flex items-center gap-3 cursor-pointer" ref={dropdownRef}>
      <div className="cursor-pointer gap-[20px] flex items-center" onClick={toggleDropdown}>
         <Button bg={'transparent'}>
           <Image w={{base:29,lg:46}} src={Notfyimage} alt="Lounge Logo" className="object-cover   rounded-full" />
         </Button>
         <Box py={2} px={6} rounded={50} border={'6px solid #F3F2F3'} className="flex-col flex px-2 items-center border">
          {/* <span>{userDetails?.name||'Admin'}</span> */}
          <Text fontFamily={'InterRegular'} fontSize={{base:'12px',md:'16px'}}>Mentors</Text>
        </Box>
        <Image onClick={handleImageClick} w={{base:6,lg:10}} h={{base:6,lg:10}} src={preview || userDetails?.profile_picture || Avatars} alt="Avatar" className="object-cover  rounded-full" />
        <input type="file" hidden onChange={handleFileChange} ref={fileInputRef} />
       
      </div>

       
    </div>
  );
};

export default Avatar;
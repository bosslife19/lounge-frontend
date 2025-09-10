import React, { useState, useEffect, useRef, useContext } from "react";
  import Avatars from "../../../assets/userImage.jpg";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion"; // for smooth animation
import Notfyimage from '../../../assets/Notification.png'
 import { AuthContext } from "../../../context/AuthContext";
 import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRequest } from "../../../hooks/useRequest";
import { supabase } from "../../../lib/SupabaseClient";
const Avatar = ({ options }) => {
  const {userDetails, setUserDetails} = useContext(AuthContext)
  const {makeRequest} = useRequest();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // 1. Fetch existing notifications
        const fetchNotifications = async () => {
          const { data, error } = await supabase
            .from("notifications")
            .select("*")
            
            .eq("user_id", userDetails?.id)
            .order("created_at", { ascending: false });
    
          if (!error) setNotifications(data);
        };
    
        fetchNotifications();
    
        // 2. Subscribe to real-time notifications
        const channel = supabase
          .channel("notifications-channel")
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "notifications",
              filter: `user_id=eq.${userDetails.id}`,
    
            },
            (payload) => {
              console.log("New notification:", payload.new);
              setNotifications((prev) => [payload.new, ...prev]);

            }
          )
          .subscribe();
    
        // 3. Cleanup subscription
        return () => {
          supabase.removeChannel(channel);
        };
      }, [userDetails.id]);
  
    const toggleBar = () => {
      
      setOpen(!open);
    }
  


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
    <>
        <div className="relative flex items-center gap-3 cursor-pointer" ref={dropdownRef}>
      <div className="cursor-pointer gap-[20px] flex items-center" onClick={toggleDropdown}>
         <Button bg={'transparent'} onClick={toggleBar}>
          
           <Image w={{base:29,lg:46}} src={Notfyimage} alt="Lounge Logo" className="object-cover   rounded-full" />
         </Button>
         <Box py={2} px={6} rounded={50} border={'6px solid #F3F2F3'} className="flex-col flex px-2 items-center border">
          {/* <span>{userDetails?.name||'Admin'}</span> */}
          <Text fontFamily={'InterRegular'} fontSize={{base:'12px',md:'16px'}}>{userDetails?.first_name}</Text>
        </Box>
        <Image onClick={handleImageClick} w={{base:6,lg:10}} h={{base:6,lg:10}} src={preview || userDetails?.profile_picture || Avatars} alt="Avatar" className="object-cover  rounded-full" />
        <input type="file" hidden onChange={handleFileChange} ref={fileInputRef} />
       
      </div>

       
    </div>
          <AnimatePresence>
        {open && (
  <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "tween", duration: 0.4 }}
    style={{
      position: "fixed",
      top: 0,
      right: 0,
      height: "100%",
      width: "320px", // ~w-80
      maxWidth: "380px", // ~md:w-96
      backgroundColor: "#fff",
      boxShadow: "0 0 20px rgba(0,0,0,0.15)",
      borderLeft: "1px solid #e5e7eb",
      zIndex: 50,
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Notifications</h2>
      <Button
        size="icon"
        variant="ghost"
        onClick={toggleBar}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          padding: "6px",
        }}
      >
        <X style={{ width: "20px", height: "20px" }} />
      </Button>
    </div>

    {/* Notifications List */}
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {notifications.length > 0 ? (
        notifications.map((n, idx) => (
          <div
            key={idx}
            style={{
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              backgroundColor: "#f9fafb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f3f4f6")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9fafb")
            }
          >
            <p style={{ fontWeight: 500, color: "#1f2937" }}>{n.title}</p>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>{n.message}</p>
            <div style={{ marginTop: "12px", display: "flex", gap: "12px" }}>
              <Button
                size="sm"
                onClick={() => onAccept(n)}
                style={{
                  backgroundColor: "#202020",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Accept
              </Button>
              <Button
                size="sm"
                onClick={() => onReject(n)}
                style={{
                  backgroundColor: "#dc2626",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Reject
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginTop: "40px",
          }}
        >
          No notifications yet 📭
        </p>
      )}
    </div>
  </motion.div>
)}

      </AnimatePresence>
    </>

  );
};

export default Avatar;
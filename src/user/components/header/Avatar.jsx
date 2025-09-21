import React, { useState, useEffect, useRef, useContext } from "react";
import Avatars from "../../../assets/userImage.jpg";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion"; // for smooth animation
import Notfyimage from "../../../assets/Notification.png";
import { AuthContext } from "../../../context/AuthContext";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRequest } from "../../../hooks/useRequest";
import { supabase } from "../../../lib/SupabaseClient";
import { BsBell } from "react-icons/bs";

const Avatar = ({ options }) => {
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { makeRequest } = useRequest();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [toaster, setToaster] = useState(null);

  //

  useEffect(() => {
    if (!userDetails?.id) return;

    // 1. Fetch existing notifications
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userDetails.id)
        .order("created_at", { ascending: false });

      if (!error) setNotifications(data);
    };

    fetchNotifications();

    const channel = supabase
      .channel(`notifications-${userDetails.id}`) // unique per user
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userDetails.id}`, // ✅ new format
        },
        (payload) => {
          // console.log("📩 New notifications:", payload.new);
          if (payload.new.type == "user_notification") {
            // Show toast
            setToaster(payload.new);

            setTimeout(() => setToaster(null), 5000);
          }
          setNotifications((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe((status, err) => {
        console.log("📡 Channel status:", status, err || "");
      });

    // 3. Cleanup
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userDetails?.id]);

  const toggleBar = () => {
    setOpen(!open);
  };

  const handleAccept = async (id, notId, is_meeting) => {
    const res = await makeRequest("/respond-to-match", {
      marchId: id,
      response: "accepted",
      notId,
      isMeeting: is_meeting,
    });
    if (res.error) return;
    // toast.success("Match accepted successfully");
    setNotifications((prev) => prev.filter((item) => item.id !== notId));
  };

  const handleRemove = async (id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
    const res = await makeRequest("/read-notification", { notId: id });
    if (res.error) return;
  };
  const handleReject = async (id, notId) => {
    const res = await makeRequest("/respond-to-match", {
      marchId: id,
      response: "rejected",
      notId,
    });
    if (res.error) return;
    toast.success("Match Rejected");
    setNotifications((prev) => prev.filter((item) => item.id !== notId));
  };
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
      <div
        className="relative flex items-center gap-3 cursor-pointer"
        ref={dropdownRef}
      >
        <div
          className="cursor-pointer gap-[20px] flex items-center"
          onClick={toggleDropdown}
        >
          <Button
            bg="transparent"
            color={"#070416"}
            onClick={toggleBar}
            border={"1.5px solid #F3F2F3"}
            position="relative"
            borderRadius={"50px"}
            rounded={50}
            size={"xs"}
            w={{ base: "30px", md: "56px" }}
            h={{ base: "30px", md: "50px" }}
          >
            <BsBell size={10} />

            {/* Notification badge */}
            {notifications.length > 0 && (
              <Text
                fontSize={{ base: "5px", md: "7px" }}
                w={{ base: "11px", md: "15px" }}
                h={{ base: "11px", md: "15px" }}
                position={"absolute"}
                top={2}
                right={3}
                className="
         
        bg-[#2B362F] text-white text-xs font-bold
        flex items-center justify-center
          rounded-full shadow-md
        animate-pulse
            "
              >
                {notifications.length}
              </Text>
            )}
          </Button>

          <Box
            py={{ base: 1, md: 2 }}
            px={{ base: 3, md: 6 }}
            rounded={{ base: 20, md: 50 }}
            border={{ base: "2px solid #F3F2F3", md: "6px solid #F3F2F3" }}
            className="flex-col flex px-2 items-center border"
          >
            {/* <span>{userDetails?.name||'Admin'}</span> */}
            <Text
              fontFamily={"InterRegular"}
              fontSize={{ base: "10px", md: "16px" }}
            >
              {userDetails?.first_name}
            </Text>
          </Box>
          <Image
            onClick={handleImageClick}
            w={{ base: 6, lg: 10 }}
            h={{ base: 6, lg: 10 }}
            src={preview || userDetails?.profile_picture || Avatars}
            alt="Avatar"
            className="object-cover  rounded-full"
          />
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            ref={fileInputRef}
          />
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
              <h2 style={{ fontSize: "18px", fontWeight: 600 }}>
                Notifications
              </h2>
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
                    key={n.id}
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
                    <p style={{ fontWeight: 500, color: "#1f2937" }}>
                      {n.title}
                    </p>
                    <p style={{ fontSize: "14px", color: "#6b7280" }}>
                      {n.message}
                    </p>
                    {n.type === "mentor_matching" ? (
                      <div
                        style={{
                          marginTop: "12px",
                          display: "flex",
                          gap: "12px",
                        }}
                      >
                        <Button
                          size="sm"
                          onClick={() =>
                            handleAccept(n.match_id, n.id, n.is_meeting)
                          }
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
                          onClick={() =>
                            handleReject(n.match_id, n.id, n.is_meeting)
                          }
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
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleRemove(n.id)}
                        style={{
                          backgroundColor: "#f3f4f6", // light gray background
                          color: "#10b981", // green accent for tick
                          padding: "6px 10px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          border: "1px solid #e5e7eb",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "14px",
                          marginTop: 10,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Mark as Read
                      </Button>
                    )}
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
      {/* Toast notification */}
      <AnimatePresence>
        {toaster && (
          <motion.div
            key={toaster.id}
            initial={{ y: -50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-6 right-6 z-[100000] w-80"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl border border-gray-200">
              {/* Accent bar */}
              <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-sky-400 to-cyan-500"></div>

              {/* Content */}
              <div className="flex items-start p-4">
                {/* Icon */}
                <div className="flex-shrink-0 mr-3 mt-1">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-sky-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M12 18h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {toaster.title || "Notification"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {toaster.message}
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setToaster(null)}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Avatar;

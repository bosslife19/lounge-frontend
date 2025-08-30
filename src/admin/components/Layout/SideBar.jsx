/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { IoMdClock, IoMdClose, IoMdSettings } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { BiLogOut, BiSolidCopyAlt } from "react-icons/bi";
import { FaGifts, FaUser, FaUsers } from "react-icons/fa";
import logo from "../../../assets/logos.png";
import { Balance } from "../../../assets/Balance";

const SideBarItem = ({ sidebarOpen, setSidebarOpen }) => {
  const history = useNavigate();
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const [activeMainIndex, setActiveMainIndex] = useState(
    parseInt(localStorage.getItem("activeMainIndex") || "0")
  );
  const [activeSubIndex, setActiveSubIndex] = useState(
    parseInt(localStorage.getItem("activeSubIndex") || "0")
  );

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const allItems = useMemo(
    () => [
      { text: "Dashboard", link: "/admin/dashboard", icon: IoMdClock },
      { text: "Users", link: "/admin/users", icon: FaUser },
      { text: "Contents", link: "/admin/contents", icon: LuCalendarDays },
      { text: "Mentor Lists", link: "/admin/mentor-list", icon: BiSolidCopyAlt },
      { text: "Community", link: "/admin/community", icon: FaUsers },
      { text: "Benefits", link: "/admin/benefits", icon: FaGifts  },
      { text: "Settings", link: "/admin/settings", icon: IoMdSettings },
      { text: "Logout", link: "/admin/Logout", icon: BiLogOut },
    ],
    []
  );

  const handleMainItemClick = (mainIndex) => {
    setActiveMainIndex(mainIndex);
    setActiveSubIndex(0);
    localStorage.setItem("activeMainIndex", mainIndex.toString());
    localStorage.removeItem("activeSubIndex");
  };

  const handleSubItemClick = (subIndex) => {
    setActiveSubIndex(subIndex);
    localStorage.setItem("activeSubIndex", subIndex.toString());
  };

  useEffect(() => {
    const storedMainIndex = localStorage.getItem("activeMainIndex");
    const storedSubIndex = localStorage.getItem("activeSubIndex");

    if (storedMainIndex) {
      setActiveMainIndex(parseInt(storedMainIndex));
    }
    if (storedSubIndex) {
      setActiveSubIndex(parseInt(storedSubIndex));
    }
  }, []);

  const renderSubNav = (mainIndex) => {
    if (activeMainIndex === mainIndex && allItems[mainIndex].subItems) {
      return (
        <Flex direction="column" pl={10}>
          {allItems[mainIndex].subItems?.map((subItem, subIndex) => (
            <Flex
              key={subIndex}
              py={2}
              align="center"
              justify="flex-start"
              cursor="pointer"
              rounded="md"
              onClick={() => {
                handleSubItemClick(subIndex);
                history(subItem.link);
                setSidebarOpen(false);
              }}

              color={
                activeSubIndex === subIndex ? "blue.600" : "gray.500"
              }
              fontWeight={activeSubIndex === subIndex ? "semibold" : "normal"}
            >
              <Box  as={subItem.icon} mr={2} />
              <Text fontSize="sm">{subItem.text}</Text>
            </Flex>
          ))}
        </Flex>
      );
    }
    return null;
  };

  return (
    <>
      {sidebarOpen && (
        <Box
          zIndex={999}
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          tabIndex={0}
        />
      )}

      <Flex
        ref={sidebar}
        direction="column"
        pos={{ base: "absolute", lg: "static" }}
        top="0"
        left="0"
        h="100vh"
        w="250px"
        shadow="md"
        borderRight="1px solid"
        borderColor={"gray.200"}
        bg={"#fff"}
        transform={{
          base: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          lg: "translateX(0)",
        }}
        transition="transform 0.3s ease"
        zIndex={{ base: 999, lg: 0 }}
        p={5}
        fontFamily="Inter"
      >
        {/* Logo + Close Button */}
        <Flex align="center" justify="space-between" px={2} py={5}>
          <Link to="dashboard">
            <Box as="img" src={logo} alt="logo" h="40px" />
          </Link>

          <IconButton
            ref={trigger}
            aria-label="Close Sidebar"
             onClick={() => setSidebarOpen(!sidebarOpen)}
            display={{ base: "flex", lg: "none" }}
            size="sm"
            rounded="full"
            border="1px solid"
            borderColor="gray.300"
          >
            <IoMdClose />
          </IconButton>
        </Flex>        

        {/* Sidebar Items */}
        <Flex className="no-scrollbar  flex flex-col overflow-y-auto scroll-container " direction="column" mt={4} flex="1" overflowY="auto">
        <Text
          fontWeight="semibold"
          textTransform="uppercase"
          mt={5}
          mb={3}
          fontSize={{ base: "13px", md: "16px" }}
        >
          Overview
        </Text>
         {allItems.map((item, mainIndex) => {
          const isCommunity = item.text === "Community";
           const isLogout = item.text === "Logout";
             const isSettings = item.text === "Settings";
               const Benefits = item.text === "Benefits";

           return (
           <Box
            key={mainIndex}
            mb={Benefits || isLogout ? "100px" : "0"}  
            >
            {isSettings && (
          <Text
            fontWeight="semibold"
            textTransform="uppercase"
            mt={8}
            mb={2}
            fontSize={{ base: "13px", md: "16px" }}
            color="gray.600"
          >
            Settings
          </Text>
          )}
           <Flex
            py={3}
            px={4}
            align="center"
            cursor="pointer"
            rounded="30px"
            bg={activeMainIndex === mainIndex ? "gray.800" : "transparent"}
            color={
            isLogout
            ? "#F13E3E"
            : activeMainIndex === mainIndex
            ? "white"
            : "gray.700"
             }
            fontWeight="semibold"
            onClick={() => {
            handleMainItemClick(mainIndex);
            history(item.link);
            setSidebarOpen(false);
            }}
            >
            <Box
            
              as={item.icon}
             color={
             isLogout
             ? "#F13E3E"
             : activeMainIndex === mainIndex
             ? "white"
             : "gray.700"
             }              
             mr={3}
            />
            <Text isTruncated>{item.text}</Text>
           </Flex>
           {renderSubNav(mainIndex)}
         </Box>
        );
        })}
         <Link to={'#'}>
        <Balance />
        </Link>
      </Flex>
        {/* Balance Component */}
        
      </Flex>
    </>
  );
};

export default SideBarItem;

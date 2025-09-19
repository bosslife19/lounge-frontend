// src/components/ProtectedRoute.jsx
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Flex, Spinner } from "@chakra-ui/react";
import axiosClient from '../../axiosClient'


const ProtectedAdminRoute = ({ children }) => {
  

   const Loader = ()=>{
  return (
     <Flex
            align="center"
            justify="center"
            h="100vh"
            w="full"
            color="#0A2EE2"
          >
            <Spinner size="xl" thickness="4px" speed="0.65s" />
          </Flex>
  )
 }
  const token = localStorage.getItem("ACCESS_TOKEN");
  const {userDetails, setUserDetails} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
       const res = await axiosClient.get('/user');
    
        setUserDetails(res.data); // store user in AuthContext
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("ACCESS_TOKEN");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Loader/>;

  if (userDetails?.role === 'user') return <Navigate to="/dashboard" replace />;
  if (userDetails?.role === 'organization') return <Navigate to="/organization/dashboard" replace />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  


  return children;
};

export default ProtectedAdminRoute;

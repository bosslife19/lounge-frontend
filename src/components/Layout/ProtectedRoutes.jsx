// src/components/ProtectedRoute.jsx
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import axiosClient from "../../axiosClient";

const ProtectedRoute = ({ children }) => {
  const Loader = () => {
    return (
      <Flex align="center" justify="center" h="100vh" w="full" color="#0A2EE2">
        <Spinner size="xl" thickness="4px" speed="0.65s" />
      </Flex>
    );
  };

  const token = localStorage.getItem("ACCESS_TOKEN");
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      // Redirect immediately if no token
      if (!token) {
        navigate("/homepage", { replace: true, state: { from: location } });
        setLoading(false);
        return;
      }

      try {
        const res = await axiosClient.get("/user");
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
  }, [token, navigate, location, setUserDetails]);

  if (loading) return <Loader />;

  if (!isAuthenticated) return <Navigate to="/homepage" replace />;

  // Redirect admin users to admin dashboard
  if (userDetails?.role === "admin")
    return <Navigate to="/admin/dashboard" replace />;

  return children;
};

export default ProtectedRoute;

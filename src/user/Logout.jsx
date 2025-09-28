import { Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  useEffect(() => {
    setLoading(true);
    const logout = () => {
      localStorage.removeItem("ACCESS_TOKEN");
      setLoading(false);
      setLoggedOut(true);
    };

    logout();
  }, []);

  const Loader = () => {
    return (
      <Flex align="center" justify="center" h="100vh" w="full" color="#0A2EE2">
        <Spinner size="xl" thickness="4px" speed="0.65s" />
      </Flex>
    );
  };
  if (loading) return <Loader />;

  if (loggedOut) return <Navigate to="/login" replace />;
  return <div></div>;
}

export default Logout;

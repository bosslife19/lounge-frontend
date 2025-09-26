import { useNavigate } from "react-router-dom";
import {
  Box,
  Select,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";

const ProgramSelector = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const getPrograms = async () => {
      const res = await axiosClient.get("/programs");

      setPrograms(res.data.programs);
    };
    getPrograms();
  }, []);
  return (
    <Box
      bgGradient="linear(to-r, purple.500, pink.600)"
      p={{ base: 3, md: 10 }}
    >
      <VStack spacing={8}>
        <Heading
          color={"#2B362F"}
          fontSize={{ base: "18px", md: "3xl" }}
          fontFamily={"InterMedium"}
          pb={{ base: 1, md: 3 }}
          textAlign="center"
          style={{ marginBottom: 10 }}
        >
          Explore Our Programs
        </Heading>

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          spacing={6}
          w="100%"
          maxW="6xl"
          gap="4"
        >
          {programs?.map((program) => (
            <Box
              key={program.id}
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              p={6}
              textAlign="center"
              cursor="pointer"
              _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
              onClick={() => navigate(`/programs/${program.id}`)}
            >
              <Text
                fontFamily={"InterMedium"}
                fontSize={{ base: "14px", md: "xl" }}
                fontWeight="bold"
                mb={3}
                color={"#2B362F"}
              >
                {program.title}
              </Text>
              <Button
                size="sm"
                fontFamily={"InterMedium"}
                fontSize={{ base: "14px", md: "18px" }}
                bg="#2B362F"
                onClick={() => navigate(`/programs/${program.id}`)}
              >
                View Details
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default ProgramSelector;

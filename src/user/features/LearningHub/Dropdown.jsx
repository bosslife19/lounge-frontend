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
  const [programs, setPrograms] = useState([])


useEffect(() => {
    const getPrograms = async () => {
      const res = await axiosClient.get("/programs");

      setPrograms(res.data.programs);
    };
    getPrograms();
  }, []);
return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, purple.500, pink.600)"
      p={10}
    >
      <VStack spacing={8}>
        <Heading colorScheme={'teal'} fontSize="3xl" textAlign="center" style={{marginBottom:10}}>
          Explore Our Programs
        </Heading>

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          spacing={6}
          w="100%"
          maxW="6xl"
          gap='4'
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
              <Text fontSize="xl" fontWeight="bold" mb={3}>
                {program.title}
              </Text>
              <Button
                size="sm"
                colorScheme="teal"
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

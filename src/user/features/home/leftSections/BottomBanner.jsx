import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import notify2 from "../../../../assets/coin.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const BottomBanner = () => {
  return (
    <Box bg={"#6C3433"} rounded={{ base: 10, md: 30 }} px={{ base: 2, md: 4 }}>
      <Flex
        py={3}
        gap={3}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* Controls */}
        <IconButton
          bg="#F4F4F4"
          border="1px solid #9E9E9E"
          rounded={20}
          aria-label="Prev"
          size={{ base: "10px", md: "md" }}

          // onClick={handlePrev}
        >
          <IoIosArrowBack color="#000" />
        </IconButton>

        <Stack py={5}>
          <Text
            fontSize={{ base: "12px", md: "16px" }}
            fontFamily="nunitoSemiBold"
            color={"#fff"}
          >
            Tommy Hilfiger
          </Text>
          <Text
            fontFamily="InterBold"
            color={"#fff"}
            fontSize={{ base: 14, md: 35 }}
            maxW={{ base: "100%", md: 500 }}
          >
            Enjoy a 20% discount on products from our partner
          </Text>
          <Button
            fontSize={{ base: 8, md: 18 }}
            my={2}
            rounded={{ base: 10, md: 30 }}
            bg={"#512726"}
            p={0}
            maxW={{ base: "100%", md: 90 }}
          >
            <Image
              src={notify2}
              alt="Update"
              boxSize={{ base: "12px", md: "22px" }}
              rounded={0}
            />
            300
          </Button>
          <Button
            fontSize={{ base: 9, md: 14 }}
            rounded={10}
            mr={{ base: 0, md: "auto" }}
          >
            claim Benefit
          </Button>
        </Stack>

        <IconButton
          aria-label="Next"
          bg="#F4F4F4"
          size={{ base: "10px", md: "md" }}
          border="1px solid #9E9E9E"
          rounded={20}
          // onClick={handleNext}
        >
          <IoIosArrowForward color="#000" />
        </IconButton>
      </Flex>
    </Box>
  );
};

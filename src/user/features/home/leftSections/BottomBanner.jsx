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
    <Box bg={"#6C3433"} rounded={30} px={{ base: 2, md: 4 }}>
      <Flex py={3} justifyContent={"space-between"} alignItems={"center"}>
        {/* Controls */}
        <IconButton
          bg="#F4F4F4"
          border="1px solid #9E9E9E"
          rounded={20}
          aria-label="Prev"
          size={{ base: "xs", md: "md" }}
          // onClick={handlePrev}
        >
          <IoIosArrowBack color="#000" />
        </IconButton>

        <Stack py={5}>
          <Text fontFamily="InterBold" color={"#fff"}>
            Tommy Hilfiger
          </Text>
          <Text
            fontFamily="InterBold"
            color={"#fff"}
            fontSize={{ base: 24, md: 35 }}
            maxW={{ base: "100%", md: 500 }}
          >
            Enjoy a 20% discount on products from our partner
          </Text>
          <Button
            fontSize={{ base: 15, md: 18 }}
            my={2}
            rounded={30}
            bg={"#512726"}
            maxW={{ base: 90 }}
          >
            <Image src={notify2} alt="Update" boxSize="22px" rounded={0} />
            300
          </Button>
          <Button rounded={10} mr={"auto"}>
            claim Benefit
          </Button>
        </Stack>

        <IconButton
          aria-label="Next"
          bg="#F4F4F4"
          size={{ base: "xs", md: "md" }}
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

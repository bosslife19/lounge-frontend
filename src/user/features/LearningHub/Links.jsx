import {
  Box,
  HStack,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { cardData } from "../../../hooks/useData";
import { CiSearch } from "react-icons/ci";
import { userAvatar } from "../setting/posts/Posts";

export const Links = ({ articles }) => {
  const links = articles.flatMap((item) => (item.link ? [item.link] : []));

  const truncateTexts = (text, maxLength) => {
    if (!text) return "";
    return text.length <= maxLength
      ? text
      : text.substring(0, maxLength) + "...";
  };

  return (
    <Box h={"50vw"} px={{ base: 1, md: 5 }}>
      {links ? (
        links.map((card, idx) => (
          <Box
            w={{ base: "100%", md: 700 }}
            rounded={{ base: "10px", md: "10px" }}
            my={{ base: 2, md: 4 }}
            p={{ base: 3, md: 5 }}
            shadow={"sm"}
            shadowColor={"#3E67A52E"}
            bg="#fff"
            // border={"1px solid #3E67A52E"}
          >
            <HStack>
              <Image
                src={userAvatar}
                alt="Speaker"
                boxSize={{ base: "24px", md: "40px" }}
                rounded="full"
              />
              <Stack spacing={0}>
                <Text
                  color="#070B28"
                  fontSize={{ base: 10, md: 12 }}
                  fontFamily="InterRegular"
                >
                  The Lounge Team
                </Text>
                <a href={card}>
                  <Text
                    fontFamily="InterRegular"
                    color="#808291"
                    mt={-1}
                    textDecoration={"underline"}
                    fontSize={{ base: 9, md: 11 }}
                  >
                    {card}
                  </Text>
                </a>
              </Stack>
            </HStack>
          </Box>
        ))
      ) : (
        <Text>No Links yet</Text>
      )}
    </Box>
  );
};

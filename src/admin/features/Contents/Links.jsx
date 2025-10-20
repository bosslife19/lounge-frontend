import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { cardData } from "../../../hooks/useData";
import { CiSearch } from "react-icons/ci";
import { RxDotsVertical } from "react-icons/rx";
import { CreateLink } from "./Modal/CreateLink";
import { useEffect, useState } from "react";
import { userAvatar } from "../../../user/features/setting/posts/Posts";
import axiosClient from "../../../axiosClient";
export const AdminLinks = ({ articles, setArticles }) => {
  const truncateTexts = (text, maxLength) => {
    if (!text) return "";
    return text.length <= maxLength
      ? text
      : text.substring(0, maxLength) + "...";
  };
  const [links, setLinks] = useState([]);

  useEffect(()=>{
    const getLinks = async ()=>{
      const res = await axiosClient.get('/links');
     
      setLinks(res.data.links)
    }
    getLinks()
  },[])

  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Box mb={"10%"} px={{ base: 5, md: 5 }} py={{ base: 0, md: 5 }}>
       <Button
              ml={"auto"}
              colorScheme="blue"
              w={{ base: "auto" }}
              onClick={() => setIsOpen(true)}
              fontSize={{ base: "10px", md: "14px" }}
              style={{ marginLeft: 10 }}
              mt={{ base: -3, md: 0 }}
            >
              + Post New Link
            </Button>
      {links.length > 0 ? (
        links.map((card, idx) => (
          <HStack>
            <Box
              w={{ base: "100%", md: 700 }}
              rounded={10}
              my={{ base: 1, md: 4 }}
              p={{ base: 2, md: 5 }}
              shadow={"sm"}
              shadowColor={"#3E67A52E"}
              bg="#fff"
              border={"1px solid #3E67A52E"}
            >
              <HStack>
                <Image
                  src={userAvatar}
                  alt="Speaker"
                  boxSize={{ base: "20px", md: "40px" }}
                  rounded="full"
                />
                <Stack spacing={0}>
                  <Text
                    color="#070B28"
                    fontSize={{ base: "9px", md: 12 }}
                    fontFamily="InterRegular"
                  >
                    {card.title}
                  </Text>
                  <Text
                    fontFamily="InterRegular"
                    color="#808291"
                    mt={-1}
                    textDecoration="underline"
                    fontSize={{ base: "8px", md: "10px" }} // keep unit consistent
                    noOfLines={{ base: 2, md: 1 }} // responsive line clamp
                    wordBreak="break-word" // ensures long text breaks instead of overflowing
                    whiteSpace="normal" // allows wrapping
                  >
                    {card.url}
                    
                  </Text>
                </Stack>
              </HStack>
            </Box>
            {/* <Button
              onClick={handleCardClick}
              bg={"transparent"}
              rounded={50}
              p={1}
              size={{ base: "10px", md: "xs" }}
              color={"#33333399"}
              border={"1px solid #E4E4E4"}
            >
              <RxDotsVertical size={10} />
            </Button> */}
          </HStack>
        ))
      ) : (
        <Text>No links yet</Text>
      )}

      <CreateLink isOpen={isOpen} onClose={handleClose} setLinks={setLinks} />
    </Box>
  );
};

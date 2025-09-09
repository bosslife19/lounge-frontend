import {
  Avatar,
  Box,
  Button,
  Card,
  createListCollection,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { cardData } from "../../../hooks/useData";
import { MentoringDetails } from "./MentoringDetails";
import { MdKeyboardArrowRight } from "react-icons/md";
import { SelectOption } from "../../components/select/Select";
import { CiSearch } from "react-icons/ci";
import { Dropdown } from "../../components/select/Dropdown";
import { IoIosArrowBack } from "react-icons/io";
import axiosClient from "../../../axiosClient";
import { userAvatar } from "../setting/posts/Posts";

export const Mentoring = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
const [listings, setListings] = useState([]);
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  useEffect(()=>{
    const getAlllistings = async ()=>{
      const res = await axiosClient.get('/get-all-listings');
      console.log(res.data.listings);
      setListings(res.data.listings);
    }
    getAlllistings();
  }, [])

 const frameworks = createListCollection({
    items: [
      { label: "finance", value: "finance" },
      { label: "finances", value: "finances" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  })
  return (
    <Box bg={'#F5F6FA'} h={"100%"} p={3}>
      <Heading display={'flex'} pb={4} gap={2} alignItems={'center'}>
         <IconButton
         aria-label="Previous"
          rounded="full"
         bg="white"
         border={'1px solid #9E9E9E'}
         _hover={{ bg: "whiteAlpha.500" }}
         size="sm"
         >
          <IoIosArrowBack color="#9E9E9E" />
        </IconButton>
        Mentor Listings
      </Heading>
        <Flex justifyContent={'space-between'} 
        flexDirection={{base:'column',md:"row"}} 
        pb={5} alignItems={{base:'flex-start',md:'center'}} 
        gap={{base:4,md:10}}>
        <InputGroup
         w={{base:'100%',md: 700}}
           startElement={<CiSearch size={15} />}
           >                
          <Input
            py={6}
          fontSize={10}
          borderRadius={10}
         placeholder="Search..."
         /> 
         </InputGroup>

        <Dropdown
        // title={'finance'}
        frameworks={frameworks}
        />

        </Flex>
        
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6} gap={5}>
        {listings.length>0 ? listings.map((card, idx) => (
          <Card.Root
            key={idx+card.id}
            bg={"#fff"}
            shadowColor={"#080F340F"}
            shadow={"sm"}
            rounded={20}
            border={"1px solid #fff"}
          >
            <Card.Body gap="2">
              <Avatar.Root mx={"auto"} boxSize={20} rounded={50}>
                <Avatar.Image src={card.user.profile_picture || userAvatar} />
                <Avatar.Fallback name={card.user.name} />
              </Avatar.Root>
              <Text textAlign={"center"}
              color={'#070416'}
              fontSize={{base:12,md:16}}
                fontFamily="InterRegular">
                {card.user.first_name} {card.user.last_name}
              </Text>
              <Text textAlign={"center"}
               color={'#64626D'}
               fontSize={{base:12,md:16}}
                fontFamily="LatoRegular"
                >
               {card.user.profession} with {card.user.years_of_experience} of experience
              </Text>
              <Card.Title
                mt="2"
                color={'#070416'}
               fontSize={{base:12,md:16}}
                textAlign={"center"}
                fontFamily="InterBold"
              >
                {card.title}
              </Card.Title>
              <Button 
              onClick={() => handleCardClick(card)} 
              bg={'transparent'}>
              <Card.Description 
               py={1}
               w={'100%'}
              display={'flex'} 
              alignItems={'center'} 
              justifyContent={'space-between'} 
              textAlign={"center"}>
                <Text color={'#64626D'} 
                fontSize={{base:12,md:16}}
                fontFamily="InterRegular"
                textAlign={"left"}>View Details</Text>
                <MdKeyboardArrowRight />
              </Card.Description>
              </Button>
            </Card.Body>
            <Card.Footer>
              <Button
                w={"full"}
                fontFamily="InterRegular"
                fontSize={12}
                bg={"#F2F2F2"}
                color={"#333333B2"}
                rounded={20}
                p={5}
              >
               Request Session
              </Button>
            </Card.Footer>
          </Card.Root>
        )):<Text>No Listings yet</Text>}
      </SimpleGrid>

      {/* Modal */}
      {selectedCard && (
        <MentoringDetails
          isOpen={isOpen}
          onClose={handleClose}
          profile={selectedCard}
        />
      )}
    </Box>
  );
};

 
import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
//   useToast,
} from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import imgs from "../../../assets/adults.png"
import { EditEvent } from "./Modal/EditEvent";
import { CreateEvent } from "./Modal/CreateEvent";
const localizer = momentLocalizer(moment);

export default function EventsAdmin() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      start: new Date(),
      end: new Date(moment().add(1, "hours").toDate()),
    },
  ]);

//   const toast = useToast();

  // Create event via sidebar button
  const handleCreateEvent = () => {
    const title = window.prompt("Enter event title");
    if (title) {
      const newEvent = {
        id: events.length + 1,
        title,
        start: new Date(),
        end: new Date(moment().add(1, "hours").toDate()),
      };
      setEvents([...events, newEvent]);
    //   toast({
    //     title: "Event Created",
    //     description: `"${title}" scheduled now`,
    //     status: "success",
    //     duration: 2000,
    //     isClosable: true,
    //   });
    }
  };

  // Create event when user clicks on calendar slot
  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("Enter a new event name");
    if (title) {
      setEvents([...events, { id: events.length + 1, title, start, end }]);
    //   toast({
    //     title: "Event Created",
    //     description: `"${title}" scheduled on ${moment(start).format("LLL")}`,
    //     status: "success",
    //     duration: 2000,
    //     isClosable: true,
    //   });
    }
  };

  // When clicking an existing event
  const handleSelectEvent = (event) => {
    // toast({
    //   title: "Event Selected",
    //   description: event.title,
    //   status: "info",
    //   duration: 2000,
    //   isClosable: true,
    // });
  };

    const [isOpen, setIsOpen] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

     
        const handleCardClick = () => {
       setIsOpen(true);
    };
  
    const handleClose = () => {
      setIsOpen(false);
     };
        
           const handleCardClicked = () => {
          setIsOpened(true);
       };
     
       const handleCloseed = () => {
         setIsOpened(false);
        };

  return (
    <Box
      h="100vh"
      bg={'transparent'}
    >
      {/* Left Sidebar */}
      <Box
      display="flex"
      px={5}
      alignItems={'center'}
       w={{base:'100%',xl:"100vw"}}
        gap={5}
      flexDir={{ base: "column", xl: "row" }}
      >
        <Box
         mb={'auto'} 
        w={{ base: "100%", xl: "300px" }}
        flexShrink={0}
       
      >
         
        <Button   ml={'auto'} 
        colorScheme="blue" 
        w={{base:'auto',xl:"full"}} onClick={handleCardClick}>
          + Create New Event
        </Button>
     <Card.Root
      maxW={'100%'}
      mt={5}
      border="1px solid"
      borderColor="gray.200"
      rounded="xl"
      shadow="md"
      overflow="hidden"
      _hover={{ shadow: "lg" }}
    >
      <Image
        src={imgs}
        alt="Web Developers Summit"
        objectFit="cover"
        w="100%"
        h="180px"
      />

      <Card.Body>
        <Stack spacing={3}>
          <Heading size="md">
            The 2025 Web Developers Summit: Beginners’ Guide to Coding
          </Heading>
          <Text fontWeight="medium" color="gray.600">
            Friday 6 July, 2025
          </Text>
          <Text color="gray.500">11:00AM - 12:00PM (1HR)</Text>
          <Button 
          onClick={handleCardClicked}
          justifyContent={'space-between'}
          flexDirection={'row'}
          color={'#919191'}
          bg={'transparent'}>
            <Text>
                Edit Event
            </Text>
            <MdKeyboardArrowRight />
          </Button>
        </Stack>
      </Card.Body>
    </Card.Root>
          
       </Box>

      {/* Right Calendar */}
      <Box w={{base: '100%',xl:600}}  h={{base:500,md:700}} bg={'#fff'}rounded={20} shadow={'md'} p={4} overflow="hidden">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          popup
          defaultView={Views.MONTH} // Start in month view
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          longPressThreshold={1} // allow single click to create
        //   style={{ width: "100%",height:700 }}
        />
      </Box>
      </Box>

      <CreateEvent
      isOpen={isOpen}
      onClose={handleClose}
      />
      <EditEvent
      isOpen={isOpened}
      onClose={handleCloseed}
      />
    </Box>
  );
}

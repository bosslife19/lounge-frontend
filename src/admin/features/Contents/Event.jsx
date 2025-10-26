import React, { useEffect, useState } from "react";
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
import imgs from "../../../assets/adults.png";
import { EditEvent } from "./Modal/EditEvent";
import { CreateEvent } from "./Modal/CreateEvent";
import axiosClient from "../../../axiosClient";
import { formattedDate } from "../../../lib/formatDate";
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
  const [eventId, setEventId] = useState(0);

  useEffect(() => {
    const getEvents = async () => {
      const res = await axiosClient.get("/get-events");

      setEvents(res.data.events);
    };
    getEvents();
  }, []);

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

  const handleCardClicked = (id) => {
    setEventId(id);
    setIsOpened(true);
  };

  const handleCloseed = () => {
    setIsOpened(false);
  };

  return (
    <Box bg={"transparent"}>
      {/* Left Sidebar */}
      <Button
        ml={6}
        colorScheme="blue"
        fontSize={{ base: "10px", md: 15 }}
        w={{ base: "auto" }}
        px={3}
        py={0}
        onClick={handleCardClick}
      >
        + Create New Event
      </Button>
      <Box
        display="flex"
        px={5}
        alignItems={"center"}
        w={{ base: "100%", xl: "100vw" }}
        gap={5}
        flexDir={{ base: "column", xl: "row" }}
        flexWrap={{ base: "wrap", xl: "wrap" }}
      >
        {events.length > 0 ? (
          events.map((event, index) => (
            <Box
              mb={"auto"}
              w={{ base: "100%", xl: "25%" }}
              flexShrink={0}
              key={event.id}
            >
              <Card.Root
                maxW={"100%"}
                mt={{ base: 3, md: 5 }}
                border="1px solid"
                borderColor="gray.200"
                rounded="xl"
                shadow="md"
                overflow="hidden"
                _hover={{ shadow: "lg" }}
              >
                <Image
                  src={event.event_image}
                  alt="Web Developers Summit"
                  objectFit="cover"
                  w="100%"
                  h={{ base: "100px", md: "180px" }}
                />

                <Card.Body>
                  <Stack spacing={3}>
                    <Heading
                      mt={{ base: -3, md: 0 }}
                      fontSize={{ base: "10px", md: 14 }}
                      size="md"
                    >
                      {event.title}
                    </Heading>
                    <Text
                      fontSize={{ base: "10px", md: 14 }}
                      fontWeight="medium"
                      color="gray.600"
                    >
                      {formattedDate(event?.event_date)}
                    </Text>
                    <Text color="gray.500" fontSize={{ base: "10px", md: 14 }}>
                      {event.start_time} - {event.end_time}
                    </Text>
                    <Button
                      onClick={() => handleCardClicked(event.id)}
                      justifyContent={"space-between"}
                      flexDirection={"row"}
                      color={"#919191"}
                      size={{ base: "10", md: "sm" }}
                      bg={"transparent"}
                      mb={{ base: -3, md: 0 }}
                    >
                      <Text fontSize={{ base: "10px", md: 14 }}>
                        Edit Event
                      </Text>
                      <MdKeyboardArrowRight />
                    </Button>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </Box>
          ))
        ) : (
          <Text fontSize={{ base: "10px", md: 14 }} textAlign={"center"}>
            No Events yet
          </Text>
        )}

        {/* <Box w={{base: '100%',xl:600}}  h={{base:500,md:700}} bg={'#fff'}rounded={20} shadow={'md'} p={4} overflow="hidden">
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
          longPressThreshold={1} 
        />
      </Box> */}
      </Box>

      <CreateEvent
        isOpen={isOpen}
        onClose={handleClose}
        setEvents={setEvents}
      />
      <EditEvent
        isOpen={isOpened}
        onClose={handleCloseed}
        setEvents={setEvents}
        eventId={eventId}
      />
    </Box>
  );
}

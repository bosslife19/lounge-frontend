 
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
import imgs from "../../../assets/adults.png"
import { EditEvent } from "./Modal/EditEvent";
import { CreateEvent } from "./Modal/CreateEvent";
import axiosClient from "../../../axiosClient";
import { formattedDate } from "../../../lib/formatDate";
import { formatTime } from "../../../lib/formatTime";
import { CreateVideo } from "./Modal/CreateVideo";
const localizer = momentLocalizer(moment);

export default function VideoAdmin() {
  const [videos, setVideos] = useState([]);
  const [eventId, setEventId] = useState(0)

  useEffect(()=>{
    const getVideos = async()=>{
      const res = await axiosClient.get('/get-videos');
      
      setVideos(res.data.videos)
    }
    getVideos();
  }, [])

//   const toast = useToast();

  // Create event via sidebar button
  

  // Create event when user clicks on calendar slot


  // When clicking an existing event


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
    <Box
      h="100vh"
      bg={'transparent'}
    >
      {/* Left Sidebar */}
                      <Button   ml={'auto'} 
        colorScheme="blue" 
        w={{base:'auto',}} onClick={handleCardClick} style={{marginLeft:10}}>
          + Upload New Video
        </Button>
      <Box
      display="flex"
      px={5}
      alignItems={'center'}
       w={{base:'100%',xl:"100vw"}}
        gap={5}
      flexDir={{ base: "column", xl: "row" }}
      flexWrap={{base:'wrap', xl:'wrap'}}
      >

        {
          videos.length>0?videos.map((video, index)=>(
 <Box
         mb={'auto'} 
        w={{ base: "100%", xl: "25%" }}
        flexShrink={0}
        key={video.id}
       
      >
         

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
        src={video.thumbnail}
        alt="Video Thumbnail"
        objectFit="cover"
        w="100%"
        h="180px"
      />

      <Card.Body>
        <Stack spacing={3}>
          <Heading size="md">
            {video.title}
          </Heading>
          <Text fontWeight="medium" color="gray.600">

            {formatTime(video?.created_at)}
          </Text>
          {/* <Text color="gray.500">{video.start_time} - {video.end_time}</Text> */}
          <Button 
          onClick={()=>handleCardClicked(video.id)}
          justifyContent={'space-between'}
          flexDirection={'row'}
          color={'#919191'}
          bg={'transparent'}>
            <Text>
                Edit Video
            </Text>
            <MdKeyboardArrowRight />
          </Button>
        </Stack>
      </Card.Body>
    </Card.Root>
          
       </Box>
          )):<Text>No Videos Uploaded yet</Text>
        }
       

     
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

      <CreateVideo
      isOpen={isOpen}
      onClose={handleClose}
      setVideos={setVideos}
      />
      <EditEvent
      isOpen={isOpened}
      onClose={handleCloseed}
      setVideos={setVideos}
      eventId={eventId}
      />
    </Box>
  );
}

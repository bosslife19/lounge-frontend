import { Tabs, Box, Button } from "@chakra-ui/react";
import { LuCircleAlert } from "react-icons/lu";
import { MdAttachFile, MdStars } from "react-icons/md";
import { RiCalendarEventFill } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegCalendar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AdminArticles } from "./Articles";
import { AdminProgram } from "./Program";
import { AdminLinks } from "./Links";
import EventsAdmin from "./Event";
import { CreateArticle } from "./Modal/CreateContent";
import axiosClient from "../../../axiosClient";
import { CreateVideo } from "./Modal/CreateVideo";
import { VideoIcon } from "lucide-react";
import VideoAdmin from "./VideoAdmin";

export const AdminContent = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAction = () => setIsOpened(true);
  const handleClosed = () => setIsOpened(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const res = await axiosClient.get("/get-articles");

      setArticles(res.data.articles);
    };
    const getVideos = async () => {
      const res = await axiosClient.get("/get-videos");

      setVideos(res.data.videos);
    };
    getArticles();
    getVideos();
  }, []);

  return (
    <Box w="100%" h="100%" bg="#FDFDFD">
      <Tabs.Root
        defaultValue="articles"
        variant="unstyled"
        bg="#FDFDFD"
        rounded={20}
      >
        <Tabs.List
          display="flex"
          flexWrap="wrap"
          gap={2}
          mx={5}
          p="13px"
          bg="#FDFDFD"
          border="none"
          rounded={30}
        >
          <Tabs.Trigger
            value="articles"
            color="#9E9E9E"
            p={{ base: 2, md: 6 }}
            fontSize={{ base: "10px", md: 14 }}
            rounded={30}
            border="1px solid #EBEBEE"
            _selected={{ border: "1px solid #2B362F", color: "#2B362F" }}
          >
            <LuCircleAlert />
            Updates & Articles
          </Tabs.Trigger>

          <Tabs.Trigger
            value="projects"
            color="#9E9E9E"
            p={{ base: 2, md: 6 }}
            fontSize={{ base: "10px", md: 14 }}
            rounded={30}
            border="1px solid #EBEBEE"
            _selected={{ border: "1px solid #2B362F", color: "#2B362F" }}
          >
            <MdStars />
            Program
          </Tabs.Trigger>

          <Tabs.Trigger
            value="tasks"
            color="#9E9E9E"
            p={{ base: 2, md: 6 }}
            fontSize={{ base: "10px", md: 14 }}
            rounded={30}
            border="1px solid #EBEBEE"
            _selected={{ border: "1px solid #2B362F", color: "#2B362F" }}
          >
            <MdAttachFile />
            Links
          </Tabs.Trigger>

          <Tabs.Trigger
            value="events"
            color="#9E9E9E"
            p={{ base: 2, md: 6 }}
            fontSize={{ base: "10px", md: 14 }}
            rounded={30}
            border="1px solid #EBEBEE"
            _selected={{ border: "1px solid #2B362F", color: "#2B362F" }}
          >
            <RiCalendarEventFill />
            Events
          </Tabs.Trigger>
          <Tabs.Trigger
            value="videos"
            color="#9E9E9E"
            p={{ base: 2, md: 6 }}
            fontSize={{ base: "10px", md: 14 }}
            rounded={30}
            border="1px solid #EBEBEE"
            _selected={{ border: "1px solid #2B362F", color: "#2B362F" }}
          >
            <VideoIcon />
            Videos
          </Tabs.Trigger>

          <Button
            bg="transparent"
            border="1px solid #E4E4E4"
            p={{ base: 2, md: 6 }}
            color="#212121"
            size={{ base: "10", md: "sm" }}
            rounded={{ base: 8, md: 30 }}
            fontSize={{ base: "10px", md: 14 }}
            onClick={handleAction}
          >
            <CiCirclePlus />
            Create
          </Button>

          <Box ml="auto">
            <Button
              bg="transparent"
              border="1px solid #E4E4E4"
              p={{ base: 2, md: 5 }}
              size={{ base: "10", md: "sm" }}
              rounded={{ base: 8, md: 30 }}
              fontSize={{ base: "10px", md: 14 }}
              color="#212121"
            >
              <FaRegCalendar size={10} />
              This Month
            </Button>
          </Box>

          {/* <Tabs.Indicator rounded="lg" /> */}
        </Tabs.List>

        <Tabs.Content value="articles">
          <AdminArticles articles={articles} setArticles={setArticles} />
        </Tabs.Content>
        <Tabs.Content value="projects">
          <AdminProgram />
        </Tabs.Content>
        <Tabs.Content value="tasks">
          <AdminLinks articles={articles} setArticles={setArticles} />
        </Tabs.Content>
        <Tabs.Content value="events">
          <EventsAdmin />
        </Tabs.Content>
        <Tabs.Content value="videos">
          <VideoAdmin />
        </Tabs.Content>
      </Tabs.Root>

      <CreateArticle
        isOpen={isOpened}
        onClose={handleClosed}
        setArticles={setArticles}
      />

      <CreateVideo isOpen={open} onClose={handleClose} setVideos={setVideos} />
    </Box>
  );
};

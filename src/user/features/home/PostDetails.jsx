import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Stack,
  HStack,
  Button,
  Flex,
  InputGroup,
  Card,
  Avatar,
  Textarea,
} from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { cardData } from "../../../hooks/useData";
import btns from "../../../assets/btn.svg";
import { useContext, useEffect, useState } from "react";
import { formatTime } from "../../../lib/formatTime";
import axiosClient from "../../../axiosClient";
import like from "../../../assets/streamline_like-1-solid.png";
import heart from "../../../assets/solar_heart-angle-bold.png";
import bulb from "../../../assets/fluent-color_lightbulb-filament-20.png";
import { userAvatar } from "../setting/posts/Posts";
import { useRequest } from "../../../hooks/useRequest";
import { GrSend } from "react-icons/gr";
import { AuthContext } from "../../../context/AuthContext";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";

const PostDetails = () => {
  const { id } = useParams();
  const { makeRequest } = useRequest();

  const navigate = useNavigate();
  const profile = cardData.find((item) => item.id === Number(id));
  const [comment, setComment] = useState("");
  const [openComments, setOpenComments] = useState({}); // track which posts are expanded
  const [moreNews, setMoreNews] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const actions = [
    { id: 1, image: like },
    { id: 2, image: heart },
    { id: 3, image: bulb },
  ];

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId], // toggle state for each post
    }));
  };

  const [update, setUpdate] = useState(null);
  const { userDetails } = useContext(AuthContext);
  const handleComment = async (id) => {
    if (!comment) {
      return;
    }

    const res = await makeRequest("/comment", {
      post_id: id,
      body: comment,
    });
    if (res.error) return;

    setRefresh((prev) => !prev);
    setComment("");
    // toast.success("Comment added successfully");
  };
  
    const likePost = async (postId)=>{
    
    const res = await makeRequest('/like-post', {userId:userDetails.id, postId});
    if(!res){
      return;
    }
    if(res.error) return;
    if(res.response.status){
setRefresh(prev=>!prev);
    }
    
  }

  useEffect(() => {
    const getMoreNews = async () => {
      const res = await axiosClient.get("/get-all-posts");

      const same = res.data.posts.filter((item) => item.id == id);
      setUpdate(same[0]);
      setMoreNews(res.data.posts);
    };
    getMoreNews();
  }, [refresh]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!profile) {
    return <Text>Profile not found</Text>;
  }

  return (
    <Card.Root>
      <Flex
        bg={"#F5F6FA"}
        height={"100vw"}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        <Box w={{ base: "100%", md: "80%" }} mx="auto" pt={3} px={6}>
          {/* Back Button */}
          <HStack gap={2} mb={4} alignItems={"center"}>
            <Button
              size={"xs"}
              variant="outline"
              py={4.5}
              px={3}
              // mb={4}
              rounded={"full"}
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack />
            </Button>
            <Text> Commnunity Posts</Text>
          </HStack>
          {/* Profile Info */}
          <Stack bg={"#fff"} p={4} borderRadius={10} spacing={4} mb={4}>
            <Image
              src={update?.post_image}
              alt={update?.title}
              w="100%"
              h={{ base: "200px", md: "300px" }}
              objectFit="cover"
              rounded="xl"
              mb={6}
            />
            <Stack spacing={0}>
              {/* <Text
                fontWeight="bold"
                fontFamily="LatoBold"
                fontSize={{ base: 18, md: 24 }}
                color={"#202020"}
              ></Text> */}
              <Text
                fontFamily="LatoRegular"
                fontSize={{ base: 14, md: 16 }}
                color={"#1C1C1CB2"}
                my={-4}
              >
                {update?.body}
              </Text>
            </Stack>

            <HStack
              justifyContent={"flex-start"}
              alignItems={"center"}
              px={1}
              pt={3}
              gap={4}
            >
               <p style={{position:'relative', left:'3%'}}>{update?.likes?.length}</p>
           
            <Button color={"#212121"} p={0} bg={"transparent"} onClick={()=>likePost(update.id)}>
              <AiOutlineLike />
              </Button>

              <Button
                onClick={() => toggleComments(update.id)}
                color={"#212121"}
                p={0}
                bg={"transparent"}
              >
                <BiMessageRoundedDetail />

                <Text
                  color={"#707070"}
                  fontSize={{ base: 12, md: 14 }}
                  cursor="pointer"
                  // ml={-2}
                >
                  {update?.comments?.length || 0} Comments
                </Text>
              </Button>
            </HStack>

            {/* Expand Comments */}
            {openComments[update?.id] && (
              <Box px={4} py={2}>
                {update.comments && update.comments?.length > 0 ? (
                  update.comments?.map((c, idx) => (
                    <Flex key={idx} gap={3} mb={3} alignItems="flex-start">
                      <Avatar.Root size="sm">
                        <Avatar.Image
                          src={c.user_profile_picture || userAvatar}
                        />
                      </Avatar.Root>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm">
                          {c.user_name}
                        </Text>
                        <Text fontSize="sm">{c.body}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {formatTime(c.created_at)}
                        </Text>
                      </Box>
                    </Flex>
                  ))
                ) : (
                  <Text fontSize="sm" color="gray.500">
                    No comments yet.
                  </Text>
                )}
              </Box>
            )}

            {/* Comment input */}
            <Card.Footer borderTop={"1px solid #E9E5DF"} mt={1} pt={6}>
              <InputGroup
                endElement={
                  <Flex align="right">
                    <Button
                      w={10}
                      h={10}
                      bg="transparent"
                      color="#000"
                      position="absolute"
                      right="3"
                      top="50%"
                      transform="translateY(-50%)"
                      zIndex={1}
                      onClick={() => handleComment(update.id)}
                    >
                      <GrSend />
                    </Button>
                  </Flex>
                }
                startElement={
                  <Avatar.Root ml={-2} mt={-2} size="xs">
                    <Avatar.Image
                      src={userDetails?.profile_picture || userAvatar}
                    />
                  </Avatar.Root>
                }
              >
                <Box w="100%" position="relative">
                  <Textarea
                    placeholder="Write a comment"
                    resize="none"
                    minH="60px"
                    bg={"#F6F6F6"}
                    textWrap={"stable"}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    outline={"none"}
                    py={3}
                    pr="80px"
                    pl="40px"
                    borderRadius="xl"
                    fontSize="11px"
                    lineHeight="1.4"
                    _placeholder={{ color: "#0000005C" }}
                  />
                </Box>
              </InputGroup>
            </Card.Footer>
            <HStack px={5} mt={-4} pb={2} spacing={4} align="flex-start">
              <Stack position={"relative"}>
                <Image
                  src={update?.user.profile_picture || profile.subimage}
                  alt="Update"
                  boxSize="30px"
                  rounded={20}
                  // objectFit="cover"
                />
              </Stack>
              <Stack>
                <Text
                  color={"#202020"}
                  fontSize={{ base: 8, md: 10 }}
                  fontFamily="InterMedium"
                >
                  {update?.user.first_name} {update?.user.last_name}
                </Text>
                <Text
                  color={"#202020"}
                  fontSize={{ base: 8, md: 10 }}
                  mt={"-2"}
                >
                  {formatTime(update?.created_at)}
                </Text>
              </Stack>
            </HStack>
          </Stack>
        </Box>
        {/* small cards */}
        <Box w={{ base: "100%", md: "30%" }} className="pb={4}">
          <Text pl={4} pt={3} mb={-2} color={"#101928"} fontWeight={"medium"}>
            More Posts
          </Text>
          <Box>
            {moreNews.length > 0 &&
              moreNews.map((card, idx) => (
                <Box
                  key={`${card.id}-${idx}`}
                  flexShrink={0}
                  px={4}
                  pt={4}
                  m={3}
                  cursor={"pointer"}
                  className="bg-white   rounded-2xl shadow-lg relative"
                  onClick={() => setUpdate(card)}
                >
                  <Image
                    roundedTop={10}
                    src={card.post_image}
                    h={120}
                    alt={card.title}
                    className="w-full h-40 object-cover"
                  />
                  <button className="absolute cursor-pointer top-5 right-6">
                    <Image
                      roundedTop={10}
                      src={btns}
                      alt={card.title}
                      className="w-full h-40 object-cover"
                    />
                  </button>
                  <Box pt={2}>
                    <Text
                      // fontFamily="LatoRegular"
                      fontSize={{ base: 12, md: 14 }}
                      lineHeight={-2}
                      className="font-semibold"
                    >
                      {card.title}
                    </Text>
                  </Box>
                  <HStack
                    // px={6}
                    pt={4}
                    pb={2}
                    spacing={4}
                    align="flex-start"
                  >
                    <Stack position={"relative"}>
                      <Image
                        src={card.user.profile_picture || profile.subimage}
                        alt="Update"
                        boxSize="30px"
                        rounded={20}
                        // objectFit="cover"
                      />
                    </Stack>
                    <Stack>
                      <Text
                        color={"#202020"}
                        fontSize={{ base: 8, md: 10 }}
                        fontFamily="InterMedium"
                      >
                        {card.user.first_name} {card.user.last_name}
                      </Text>
                      <Text
                        color={"#202020"}
                        fontSize={{ base: 8, md: 10 }}
                        mt={"-2"}
                      >
                        {formatTime(card.created_at)}
                      </Text>
                    </Stack>
                  </HStack>
                </Box>
              ))}
          </Box>
        </Box>
      </Flex>
    </Card.Root>
  );
};

export default PostDetails;

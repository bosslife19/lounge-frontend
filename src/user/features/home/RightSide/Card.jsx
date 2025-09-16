import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Emojione_fire } from "../../../../assets/emojione_fire";
import divider from "../../../../assets/Divider.svg";
import { CiClock2 } from "react-icons/ci";
import logo from "../../../../assets/userImage.jpg";
import tick from "../../../../assets/check.png";
import lightdivider from "../../../../assets/lightDivider.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { supabase } from "../../../../lib/SupabaseClient";
import { formatTimestamp } from "../../../../lib/FormatTimestamps";

export function Card() {
  const { userDetails } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [realTime, setRealTime] = useState(false);

  useEffect(() => {
    if (!realTime && notifications) {
      setCurrentNotification(notifications[0]);
    }
  }, [notifications]);
  useEffect(() => {
    // 1. Fetch existing notifications
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("type", "mentor_matching")
        .eq("user_id", userDetails?.id)
        .order("created_at", { ascending: false });

      if (!error) setNotifications(data);
    };

    fetchNotifications();

    // 2. Subscribe to real-time notifications
    const channel = supabase
      .channel("notifications-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userDetails.id},type=eq.mentor_matching`,
        },
        (payload) => {
          console.log("New notification:", payload.new);
          setNotifications((prev) => [payload.new, ...prev]);
          setRealTime(true);
          setCurrentNotification(payload.new);
        }
      )
      .subscribe();

    // 3. Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [userDetails.id]);

  return (
    <>
      {currentNotification && (
        <Box
          w={"100%"}
          bg="#6C343314"
          h={"322px"}
          pb={4}
          borderRadius="2xl"
          borderColor="gray.200"
        >
          {/* Card Title */}
          <Heading
            fontSize={{ base: 17, md: 22 }}
            mb={2}
            px={5}
            pt={5}
            pb={2}
            fontWeight={"extrabold"}
            fontFamily="LatoBold"
            display={"flex"}
            gap={1}
            justifyContent={"space-between"}
            alignItems={"center"}
            whiteSpace={"nowrap"}
            flexDirection={"row"}
          >
            {/* {currentNotification.message.length > 25
              ? `${currentNotification.message.slice(0, 25)}...`
              : currentNotification.message} */}
            You have Matched
            <Emojione_fire />
          </Heading>
          <Image
            src={divider}
            alt="Update"
            w={"100%"}
            borderRadius="md"
            // objectFit="cover"
          />
          <Stack px={6} pt={5} pb={2}>
            <Text
              fontSize={{ base: 12, md: 18 }}
              fontWeight={"bold"}
              fontFamily="InterMedium"
            >
              Friday, 6 July
              {/* {formatTimestamp(currentNotification.created_at)} */}
            </Text>
            <Text
              fontFamily="InterRegular"
              fontSize={{ base: 12, md: 13 }}
              display={"flex"}
              color={"#475367"}
              gap={2}
              alignItems={"center"}
            >
              <CiClock2 /> 11.30 - 12.00 (30 min)
            </Text>
          </Stack>
          <HStack px={6} pt={5} pb={2} spacing={4} mb={4} align="flex-start">
            <Stack position={"relative"}>
              <Image
                src={currentNotification.profile_picture || logo}
                alt="Update"
                boxSize="40px"
                // borderRadius="50"
                rounded={50}
                objectFit="cover"
              />
              <Image
                src={tick}
                alt="tick"
                w={4}
                position={"absolute"}
                bottom={"-2"}
                right={"0"}
                // borderRadius="md"
                objectFit="cover"
              />
            </Stack>

            <Stack>
              <Text fontSize={{ base: 11, md: 15 }} fontFamily="InterMedium">
                {currentNotification.first_name}
              </Text>
              <Text
                mt={"-2"}
                textTransform={"capitalize"}
                fontSize={{ base: 11, md: 12 }}
                color="gray.700"
              >
                {currentNotification.profession}
              </Text>
            </Stack>
          </HStack>

          <Image
            src={lightdivider}
            alt="Update"
            w={"100%"}
            borderRadius="md"
            // objectFit="cover"
          />

          {/* Footer button */}
          <Box
            display={"flex"}
            justifyContent={"center"}
            px={5}
            w={"100%"}
            pt={4}
          >
            <Button
              fontSize={{ base: 8, md: 13 }}
              bg={"#2B362F"}
              // size="lg"
              w={"100%"}
              rounded="lg"
              shadow="xs"
            >
              Confirm Appointment
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

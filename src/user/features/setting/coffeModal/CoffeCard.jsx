import { useState } from "react";
import { Box, Button, Flex, HStack, Stack, Text, Icon } from "@chakra-ui/react";
import { FaCoffee } from "react-icons/fa";
import { Coffee, Users, Clock, Award, CalendarCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SwitchPage } from "../../../components/switchPage/switch";
// import { SwitchPage } from "../../../components/switchPage/switch";

const CoffeeRouletteCard = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Box
      shadow="xs"
      bg="#fff"
      rounded={10}
      p={{ base: 3, md: 6 }}
      w={{ base: "100%", xl: 475 }}
      mb={5}
      border="1px solid #EDEDF2"
    >
      <Flex
        alignItems={{ base: "flex-start", md: "center" }}
        justifyContent="space-between"
      >
        <HStack alignItems={{ base: "flex-start", md: "center" }}>
          <FaCoffee />
          <Stack spacing={0}>
            <Flex align="center" gap={2}>
              <Text
                color="#191919"
                fontSize={{ base: "11px", md: 14 }}
                fontFamily="InterBold"
              >
                Coffee Roulette Participation
              </Text>
            </Flex>

            <Text
              mt={{ base: -2, md: -1 }}
              color="#475467"
              fontWeight="normal"
              fontSize={{ base: "9px", md: 14 }}
              fontFamily="InterRegular"
              display="flex"
              alignItems="center"
              gap={2}
              py={1}
            >
              Opt-in for our weekly coffee roulette
            </Text>

            {/* Toggle link */}
            <Button
              onClick={() => setShowMore(!showMore)}
              variant="link"
              fontSize={{ base: "9px", md: 14 }}
              // w={"200px"}
              p={0}
              mb={{ base: -2, md: 0 }}
              mr={"auto"}
              color="#2B362F"
              fontWeight="medium"
              textDecoration="underline"
              _hover={{ color: "#3D4A42" }}
              alignSelf="flex-start"
              mt={1}
            >
              {showMore ? "Hide details" : "More about Coffee Roulette"}
            </Button>
          </Stack>
        </HStack>

        <SwitchPage coffee={true} />
      </Flex>

      {/* Expanded Info */}
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box mt={4} borderTop="1px solid #EDEDF2" pt={3}>
              {/* Header */}
              <Stack align="flex-start" spacing={3}>
                <HStack>
                  <Icon as={Coffee} color="#6B4F4F" boxSize={5} />
                  <Text
                    fontWeight="600"
                    fontSize={{ base: "13px", md: 16 }}
                    color="#2B362F"
                  >
                    Coffee Roulette ☕
                  </Text>
                </HStack>
                <Text fontSize={{ base: "9px", md: 14 }} color="#475467">
                  Meet a new community member every week and share a 15-minute
                  coffee chat!
                </Text>

                {/* Participation Info */}
                <Stack mt={2} spacing={1}>
                  <HStack spacing={2}>
                    <Icon as={Users} color="#2B362F" boxSize={4} />
                    <Text
                      fontWeight="semibold"
                      fontSize={{ base: "9px", md: 14 }}
                    >
                      Coffee Roulette Participation
                    </Text>
                  </HStack>
                  <Text
                    fontSize={{ base: "9px", md: 14 }}
                    color="#475467"
                    pl={6}
                  >
                    You’re currently not registered for the weekly Coffee
                    Roulette.
                  </Text>
                </Stack>

                {/* How It Works */}
                <Stack mt={3} spacing={3}>
                  <HStack spacing={2}>
                    <Icon as={CalendarCheck} color="#2B362F" boxSize={4} />
                    <Text
                      fontWeight="semibold"
                      fontSize={{ base: "9px", md: 14 }}
                    >
                      How does it work?
                    </Text>
                  </HStack>

                  <Stack spacing={3} pl={6}>
                    <HStack align="start" spacing={2}>
                      <Icon as={Users} color="#6B4F4F" boxSize={5} />
                      <Box>
                        <Text
                          fontWeight="medium"
                          fontSize={{ base: "9px", md: 14 }}
                        >
                          Weekly Matches
                        </Text>
                        <Text
                          fontSize={{ base: "9px", md: 14 }}
                          color="#475467"
                        >
                          Every Monday, you’re paired with another participant
                          for a friendly chat.
                        </Text>
                      </Box>
                    </HStack>

                    <HStack align="start" spacing={2}>
                      <Icon as={Clock} color="#6B4F4F" boxSize={5} />
                      <Box>
                        <Text
                          fontWeight="medium"
                          fontSize={{ base: "9px", md: 14 }}
                        >
                          15-Minute Conversations
                        </Text>
                        <Text
                          fontSize={{ base: "9px", md: 14 }}
                          color="#475467"
                        >
                          Set up a quick virtual coffee call to connect and
                          share ideas.
                        </Text>
                      </Box>
                    </HStack>

                    <HStack align="start" spacing={2}>
                      <Icon as={Award} color="#6B4F4F" boxSize={5} />
                      <Box>
                        <Text
                          fontWeight="medium"
                          fontSize={{ base: "9px", md: 14 }}
                        >
                          Earn Community Points
                        </Text>
                        <Text
                          fontSize={{ base: "9px", md: 14 }}
                          color="#475467"
                        >
                          Confirm your meeting and both participants earn a
                          community point.
                        </Text>
                      </Box>
                    </HStack>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default CoffeeRouletteCard;

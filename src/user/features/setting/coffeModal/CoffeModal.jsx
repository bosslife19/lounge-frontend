import {
  Dialog,
  Portal,
  CloseButton,
  Stack,
  HStack,
  Text,
  Button,
  Heading,
  Box,
  Icon,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Users, Clock, Award, CalendarCheck } from "lucide-react";

export const CoffeeRouletteIntro = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
          <Portal>
            <Dialog.Backdrop
              as={motion.div}
              bg="blackAlpha.600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Dialog.Positioner>
              <Dialog.Content
                as={motion.div}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                borderRadius="2xl"
                boxShadow="xl"
                bgGradient="linear(to-b, #FFFFFF, #F8F8F8)"
                p={8}
                maxW="lg"
              >
                <Dialog.CloseTrigger
                  asChild
                  rounded="full"
                  position="absolute"
                  top={3}
                  right={3}
                  border="1px solid #D0D5DD"
                >
                  <CloseButton size="sm" color="#475467" />
                </Dialog.CloseTrigger>

                {/* Header */}
                <Stack align="center" spacing={2}>
                  <Box
                    bg="#E5E7EB"
                    borderRadius="full"
                    p={3}
                    mb={2}
                    boxShadow="sm"
                  >
                    <Icon as={Coffee} color="#6B4F4F" boxSize={6} />
                  </Box>

                  <Heading
                    fontSize={{ base: "20px", md: "24px" }}
                    fontWeight="600"
                    color="#2B362F"
                    textAlign="center"
                  >
                    Coffee Roulette ☕
                  </Heading>

                  <Text
                    fontSize={{ base: "13px", md: "15px" }}
                    color="#475467"
                    textAlign="center"
                    maxW="sm"
                  >
                    Meet a new community member every week and share a 15-minute
                    coffee chat!
                  </Text>
                </Stack>

                {/* Info Section */}
                <Stack mt={6} spacing={3}>
                  <HStack spacing={2}>
                    <Icon as={Users} color="#2B362F" boxSize={4} />
                    <Text fontWeight="semibold" fontSize="15px">
                      Coffee Roulette Participation
                    </Text>
                  </HStack>
                  <Text fontSize="14px" color="#475467" pl={6}>
                    You’re currently not registered for the weekly Coffee
                    Roulette.
                  </Text>
                </Stack>

                {/* How It Works Section */}
                <Stack mt={5} spacing={4}>
                  <HStack spacing={2}>
                    <Icon as={CalendarCheck} color="#2B362F" boxSize={4} />
                    <Text fontWeight="semibold" fontSize="15px">
                      How does it work?
                    </Text>
                  </HStack>

                  <Stack spacing={3} pl={6}>
                    <HStack align="start" spacing={2}>
                      <Icon as={Users} color="#6B4F4F" boxSize={5} />
                      <Box>
                        <Text fontWeight="medium" fontSize="14px">
                          Weekly Matches
                        </Text>
                        <Text fontSize="13px" color="#475467">
                          Every Monday, you’re paired with another participant
                          for a friendly chat.
                        </Text>
                      </Box>
                    </HStack>

                    <HStack align="start" spacing={2}>
                      <Icon as={Clock} color="#6B4F4F" boxSize={5} />
                      <Box>
                        <Text fontWeight="medium" fontSize="14px">
                          15-Minute Conversations
                        </Text>
                        <Text fontSize="13px" color="#475467">
                          Set up a quick virtual coffee call to connect and
                          share ideas.
                        </Text>
                      </Box>
                    </HStack>

                    <HStack align="start" spacing={2}>
                      <Icon as={Award} color="#6B4F4F" boxSize={5} />
                      <Box>
                        <Text fontWeight="medium" fontSize="14px">
                          Earn Community Points
                        </Text>
                        <Text fontSize="13px" color="#475467">
                          Confirm your meeting and both participants earn a
                          community point.
                        </Text>
                      </Box>
                    </HStack>
                  </Stack>
                </Stack>

                {/* Actions */}
                <HStack pt={6} justify="flex-end" spacing={3}>
                  <Button
                    variant="outline"
                    color="#2B362F"
                    border="1px solid #2B362F"
                    onClick={onClose}
                    size="sm"
                    _hover={{ bg: "#F3F4F6" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg="#2B362F"
                    color="white"
                    size="sm"
                    _hover={{ bg: "#3D4A42" }}
                    onClick={onClose}
                  >
                    Continue
                  </Button>
                </HStack>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
};

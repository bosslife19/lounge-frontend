import {
  Dialog,
  Portal,
  CloseButton,
  Stack,
  HStack,
  Image,
  Text,
  Button,
  Heading,
  Textarea,
  Field,
} from "@chakra-ui/react";

export const EditSpeakerHeader = ({ isOpen, onClose }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={5}>
          <Dialog.Content borderRadius="lg" bg="#FAFAFA" p={4}>
            <Dialog.CloseTrigger
              rounded={30}
              border={"1px solid #9E9E9E"}
              asChild
            >
              <CloseButton size="xs" color={"#9E9E9E"} />
            </Dialog.CloseTrigger>
            <Stack spacing={0}>
              <Heading fontSize={{ base: "10px", md: 14 }}>
                Edit Programs
              </Heading>
              <Text fontSize={{ base: "10px", md: 14 }}>
                Speaker's Highlight
              </Text>
              <Textarea
                border={"1px solid #D3D4D7"}
                fontSize={{ base: "10px", md: 14 }}
                autoresize
                variant="subtle"
                placeholder="Write your post or question here"
              />
              <Text
                fontSize={{ base: "7px", md: 10 }}
                size={{ base: "xs", md: "sm" }}
                color={"#667185"}
              >
                0/100 words
              </Text>

              <HStack w={"100%"}>
                <Button
                  onClick={() => onClose()}
                  flex={1}
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  py={{ base: 2, md: 6 }}
                  px={{ base: 5, md: 50 }}
                  // w={{base:'35%'}}
                  bg={"#fff"}
                  color={"#2B362F"}
                  border={"1px solid #2B362F"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => onClose()}
                  py={{ base: 2, md: 6 }}
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  flex={1}
                  // w={{ base: "100%" }}
                  rounded={5}
                  bg={"#2B362F"}
                  color="white"
                >
                  Edit Information
                </Button>
              </HStack>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

import {
  Dialog,
  Portal,
  CloseButton,
  Stack,
  HStack,
  Text,
  Button,
  Heading,
  Input,
  Textarea,
  Field,
  InputGroup,
} from "@chakra-ui/react";
import { CgAttachment } from "react-icons/cg";

export const CreateLink = ({ isOpen, onClose }) => {
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
              <Heading fontSize={{ base: "14px", md: "24px" }}>
                Edit Program
              </Heading>
              <Text fontSize={{ base: "10px", md: "12px" }}>Title</Text>
              <Input fontSize={{ base: "10px", md: "12px" }} type="text" />
              <Field.Root>
                <Field.Label
                  fontWeight={"400"}
                  fontSize={{ base: "10px", md: 14 }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                >
                  Video Link
                </Field.Label>
                <InputGroup startElement={<CgAttachment />}>
                  <Input
                    py={{ base: 2, md: 6 }}
                    fontSize={{ base: "10px", md: "12px" }}
                    placeholder=""
                  />
                </InputGroup>
              </Field.Root>

              <HStack>
                <Button
                  onClick={() => onClose()}
                  py={{ base: 2, md: 6 }}
                  flex={0.7}
                  px={{ base: 5, md: 50 }}
                  // w={{base:'35%'}}
                  bg={"#fff"}
                  fontSize={{ base: "10px", md: "12px" }}
                  color={"#2B362F"}
                  border={"1px solid #2B362F"}
                >
                  Cancel
                </Button>
                <Button
                  //   onClick={onFinish}
                  py={{ base: 2, md: 6 }}
                  flex={1}
                  // w={{ base: "100%" }}
                  rounded={5}
                  bg={"#2B362F"}
                  fontSize={{ base: "10px", md: "12px" }}
                  color="white"
                >
                  Create
                </Button>
              </HStack>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

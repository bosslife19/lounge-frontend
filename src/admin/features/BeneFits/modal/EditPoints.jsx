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
  Input,
  FileUpload,
  Textarea,
  Field,
  InputGroup,
  createListCollection,
} from "@chakra-ui/react";
import { FaBriefcase } from "react-icons/fa";
import { Dropdown } from "../../../components/select/Dropdown";

const frameworks = createListCollection({
  items: [
    { label: "Experience", value: "Experience" },
    { label: "finances", value: "finances" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});
export const EditPoints = ({ isOpen, onClose }) => {
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
              <Heading fontSize={{ base: "12px", md: "14px" }}>
                Edit Benefit
              </Heading>
              <Text fontSize={{ base: "10px", md: "14px" }}>Title</Text>
              <Input
                fontSize={{ base: "10px", md: "14px" }}
                placeholder="Surname"
                type="text"
              />
              <Text fontSize={{ base: "11px", md: "14px" }}>Partner</Text>
              <Dropdown frameworks={frameworks} icon />

              <Field.Root>
                <Field.Label
                  fontWeight={"400"}
                  fontSize={{ base: "10px", md: "14px" }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                >
                  Point (EUR)
                </Field.Label>
                <InputGroup startElement={<FaBriefcase />}>
                  <Input
                    fontSize={{ base: "10px", md: "14px" }}
                    type="number"
                    py={{ base: 2, md: 6 }}
                  />
                </InputGroup>
              </Field.Root>
              <HStack pt={4} w={"100%"}>
                <Button
                  flex={0.4}
                  onClick={() => onClose()}
                  py={{ base: 2, md: 6 }}
                  px={{ base: 5, md: 50 }}
                  fontSize={{ base: "10px", md: "14px" }}
                  // w={{base:'35%'}}
                  bg={"#fff"}
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
                  fontSize={{ base: "10px", md: "14px" }}
                  bg={"#2B362F"}
                  color="white"
                >
                  Save Changes
                </Button>
              </HStack>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

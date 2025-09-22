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
} from "@chakra-ui/react";
import logo from "../../../../assets/userImage.jpg";
import { MdAddCircleOutline, MdCalendarToday } from "react-icons/md";
import { RxDotsVertical } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
import { CgAttachment } from "react-icons/cg";
export const EditSession = ({ isOpen, onClose }) => {
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
              <Heading>Edit Session</Heading>
              <HStack justifyContent={"space-between"}>
                <Text
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                >
                  Session
                </Text>

                <Button
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  bg={"transparent"}
                  color={"#212121"}
                >
                  <FiPlusCircle />
                </Button>
              </HStack>
              <Stack>
                <Text
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                >
                  Session 1 (Description)
                </Text>
                <Textarea
                  border={"1px solid #D3D4D7"}
                  bg={"#fff"}
                  fontSize={{ base: "10px", md: 14 }}
                  autoresize
                  variant="subtle"
                  placeholder="Summarize in Brief Points"
                />
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Date & Time
                  </Field.Label>
                  <InputGroup>
                    <Input
                      type="datetime-local"
                      py={{ base: 2, md: 6 }}
                      fontSize={{ base: 10, md: 13 }}
                      placeholder="Surname"
                    />
                  </InputGroup>
                </Field.Root>
                <HStack
                  flexDirection={{ base: "column", md: "row" }}
                  gap="1"
                  alignItems={"center"}
                  width="full"
                  pt={2}
                >
                  <Image
                    src={logo}
                    alt="Member"
                    boxSize={{ base: "19px", md: "30px" }}
                    borderRadius="md"
                    objectFit="cover"
                  />
                  <Field.Root>
                    <Input
                      placeholder="Name"
                      fontSize={{ base: "10px", md: 14 }}
                      //   value={member.name}
                      //      onChange={(e) =>
                      //      handleMemberChange(index, "name", e.target.value)
                      //    }
                      variant="outline"
                    />
                  </Field.Root>
                  <Field.Root>
                    <Input
                      fontSize={{ base: "10px", md: 14 }}
                      placeholder="profession"
                      //     value={member.profession}
                      //     onChange={(e) =>
                      //     handleMemberChange(index, "profession", e.target.value)
                      //    }
                      variant="outline"
                    />
                  </Field.Root>
                  {/* <RxDotsVertical cursor="pointer" size={40} /> */}
                </HStack>

                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "10px", md: 14 }}
                    size={{ base: "xs", md: "sm" }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Video Link
                  </Field.Label>
                  <InputGroup startElement={<CgAttachment />}>
                    <Input
                      py={{ base: 2, md: 6 }}
                      fontSize={{ base: "10px", md: 14 }}
                      placeholder=""
                    />
                  </InputGroup>
                </Field.Root>
              </Stack>

              <Button
                border={"1px solid #DFDFDF"}
                //  onClick={handleAddMember}
                fontWeight={"400"}
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
                fontFamily="InterRegular"
                py={{ base: 2, md: 6 }}
                my={3}
                color={"#333333CC"}
                bg={"#EDEDED"}
              >
                <MdAddCircleOutline color="#1D1B20" />
                Add Members
              </Button>

              <HStack w={"100%"}>
                <Button
                  onClick={() => onClose()}
                  flex={0.6}
                  py={{ base: 2, md: 6 }}
                  px={{ base: 5, md: 50 }}
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
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

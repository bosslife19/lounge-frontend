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
} from "@chakra-ui/react";
import logo from "../../../../assets/userImage.jpg";
import { MdAddCircleOutline } from "react-icons/md";
import { RxDotsVertical } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
export const EditSpeakerHighlight = ({ isOpen, onClose }) => {
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
              <Heading
                fontSize={{ base: "12px", md: 18 }}
                size={{ base: "xs", md: "sm" }}
              >
                Edit Speaker Higlights
              </Heading>
              <HStack justifyContent={"space-between"}>
                <Text
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                >
                  Title
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
              <HStack
                gap="1"
                flexDirection={{ base: "column", md: "row" }}
                alignItems={"center"}
                width="full"
              >
                <Image
                  src={logo}
                  alt="Member"
                  boxSize={{ base: "20px", md: "30px" }}
                  borderRadius="full"
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
              <Textarea
                border={"1px solid #D3D4D7"}
                fontSize={{ base: "10px", md: 14 }}
                autoresize
                variant="subtle"
                placeholder="Write your post or question here"
              />
              <Text color={"#667185"} fontSize={{ base: "9px", md: 14 }}>
                0/100 words
              </Text>
              {/* <HStack gap="1" alignItems={"center"} width="full">
                <Image
                  src={logo}
                  alt="Member"
                  boxSize="30px"
                  borderRadius="md"
                  objectFit="cover"
                />
                <Field.Root>
                  <Input
                    placeholder="Name"
                    //   value={member.name}
                    //      onChange={(e) =>
                    //      handleMemberChange(index, "name", e.target.value)
                    //    }
                    variant="outline"
                  />
                </Field.Root>
                <Field.Root>
                  <Input
                    placeholder="profession"
                    //     value={member.profession}
                    //     onChange={(e) =>
                    //     handleMemberChange(index, "profession", e.target.value)
                    //    }
                    variant="outline"
                  />
                </Field.Root>
                <RxDotsVertical cursor="pointer" size={40} />
              </HStack>
              <Textarea
                border={"1px solid #D3D4D7"}
                //    minH={100}
                fontSize={13}
                autoresize
                variant="subtle"
                placeholder="Write your post or question here"
              />
              <Text color={"#667185"} size={{ base: "9", md: "sm" }}>
                0/100 words
              </Text> */}
              <Button
                border={"1px solid #DFDFDF"}
                //  onClick={handleAddMember}
                fontWeight={"400"}
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
                fontFamily="InterRegular"
                py={{ base: 1, md: 6 }}
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
                  flex={1}
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  py={{ base: 1, md: 6 }}
                  px={{ base: 5, md: 50 }}
                  // w={{base:'35%'}}
                  bg={"#fff"}
                  color={"#2B362F"}
                  border={"1px solid #2B362F"}
                >
                  Cancel
                </Button>
                <Button
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  onClick={() => onClose()}
                  py={{ base: 1, md: 6 }}
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

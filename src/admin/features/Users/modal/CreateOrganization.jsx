import {
  Dialog,
  Portal,
  Stack,
  Field,
  Fieldset,
  Input,
  Button,
  Image,
  HStack,
  InputGroup,
  Textarea,
  CloseButton,
} from "@chakra-ui/react";
import logo from "../../../../assets/userImage.jpg";
import tick from "../../../../assets/Verified tick2.png";
import { FaBriefcase } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { RxDotsVertical } from "react-icons/rx";
import { MdAddCircleOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { LuLink2 } from "react-icons/lu";
import { useState } from "react";

export const CreateOrganization = ({ isOpen, onClose, onFinish }) => {
  const [members, setMembers] = useState([{ name: "", profession: "" }]);

  const handleAddMember = () => {
    setMembers([...members, { name: "", profession: "" }]);
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={5}>
          <Dialog.Content
            rounded={30}
            bg="#FAFAFA"
            p={4}
            maxW={{ base: "sm", md: "xl" }}
          >
            <Fieldset.Root size={{ base: "sm", md: "lg" }}>
              <Stack pt={2}>
                <Fieldset.Legend
                  fontWeight={"400"}
                  fontSize={{ base: "12px", md: 20 }}
                  fontFamily="InterBold"
                  color={"#1A1A21"}
                >
                  Create Organization
                </Fieldset.Legend>
                <Dialog.CloseTrigger
                  rounded={30}
                  border={"1px solid #9E9E9E"}
                  asChild
                >
                  <CloseButton
                    size={{ base: "10", md: "xs" }}
                    color={"#9E9E9E"}
                  />
                </Dialog.CloseTrigger>
              </Stack>

              {/* Profile logo */}
              <Stack m={"auto"} my={{ base: 5, md: 0 }} position={"relative"}>
                <Image
                  src={logo}
                  alt="Update"
                  boxSize={{ base: "30px", md: "60px" }}
                  borderRadius="full"
                  objectFit="cover"
                />
                {/* <Button
                  w={"100%"}
                  bg={"transparent"}
                  position={"absolute"}
                  top={"7"}
                  left={"6"}
                >
                  <Image
                    src={tick}
                    alt="tick"
                    w={19}
                    borderRadius="md"
                    objectFit="cover"
                  />
                </Button> */}
              </Stack>

              <Fieldset.Content pr={3}>
                {/* Name */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Name of Organization
                  </Field.Label>
                  <InputGroup startElement={<CiUser />}>
                    <Input
                      py={{ base: 2, md: 6 }}
                      fontSize={{ base: "10px", md: "14px" }}
                      placeholder="Surname"
                    />
                  </InputGroup>
                </Field.Root>

                {/* Website URL */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Website URL
                  </Field.Label>
                  <InputGroup startElement={<LuLink2 />}>
                    <Input
                      py={{ base: 2, md: 6 }}
                      fontSize={{ base: "10px", md: "14px" }}
                      placeholder="Organization website URL"
                    />
                  </InputGroup>
                </Field.Root>

                {/* Industry */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Industry
                  </Field.Label>
                  <InputGroup startElement={<FaBriefcase />}>
                    <Input
                      py={{ base: 2, md: 6 }}
                      fontSize={{ base: "10px", md: "14px" }}
                      placeholder="Fintech"
                    />
                  </InputGroup>
                </Field.Root>

                {/* Location */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Location
                  </Field.Label>
                  <InputGroup startElement={<IoLocationOutline />}>
                    <Input
                      py={{ base: 2, md: 6 }}
                      fontSize={{ base: "10px", md: "14px" }}
                      placeholder="Select"
                    />
                  </InputGroup>
                </Field.Root>

                {/* Description */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Organization Description
                  </Field.Label>
                  <Textarea
                    resize="none"
                    fontSize={{ base: "10px", md: "16px" }}
                    h={{ base: "80px", md: 150 }}
                    placeholder="Type here"
                  />
                </Field.Root>

                {/* Members */}
                {members.map((member, index) => (
                  <HStack
                    key={index}
                    gap="1"
                    alignItems={"center"}
                    width="full"
                    flexWrap={{ base: "wrap", md: "nowrap" }}
                    justifyContent={"center"}
                    py={{ base: 4, md: 0 }}
                  >
                    <Image
                      src={logo}
                      alt="Member"
                      boxSize="30px"
                      borderRadius="full"
                      objectFit="cover"
                    />
                    <Field.Root>
                      <Input
                        placeholder="Name"
                        fontSize={{ base: "10px", md: "16px" }}
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        variant="outline"
                      />
                    </Field.Root>
                    <Field.Root>
                      <Input
                        placeholder="profession"
                        value={member.profession}
                        fontSize={{ base: "10px", md: "16px" }}
                        onChange={(e) =>
                          handleMemberChange(
                            index,
                            "profession",
                            e.target.value
                          )
                        }
                        variant="outline"
                      />
                    </Field.Root>
                    {/* <RxDotsVertical
                      display={"none"}
                      cursor="pointer"
                      size={40}
                    /> */}
                  </HStack>
                ))}

                <Button
                  border={"1px solid #DFDFDF"}
                  onClick={handleAddMember}
                  fontWeight={"400"}
                  fontFamily="InterRegular"
                  py={{ base: 2, md: 6 }}
                  fontSize={{ base: "10px", md: "14px" }}
                  my={3}
                  color={"#333333CC"}
                  bg={"#EDEDED"}
                >
                  <MdAddCircleOutline color="#1D1B20" />
                  Add Members
                </Button>
              </Fieldset.Content>

              {/* Submit Button */}
              <HStack w={"100%"} flexDirection={{ base: "column", md: "row" }}>
                <Button
                  onClick={() => onClose()}
                  py={{ base: 2, md: 6 }}
                  fontSize={{ base: "10px", md: "14px" }}
                  px={{ base: 5, md: 50 }}
                  w={{ base: "100%", md: "auto" }}
                  bg={"#fff"}
                  color={"#2B362F"}
                  border={"1px solid #2B362F"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={onFinish}
                  py={{ base: 2, md: 6 }}
                  fontSize={{ base: "10px", md: "14px" }}
                  flex={1}
                  w={{ base: "100%", md: "auto" }}
                  rounded={5}
                  bg={"#2B362F"}
                  color="white"
                >
                  Request Creation
                </Button>
              </HStack>
            </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

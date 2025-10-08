import {
  Dialog,
  Portal,
  Stack,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Button,
  Image,
  HStack,
  Box,
  InputGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import logo from "../../../../../assets/userImage.jpg";
import tick from "../../../../../assets/Verified tick2.png";
import { FaBriefcase, FaFacebook } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { BsLinkedin } from "react-icons/bs";
import { RxDotsVertical } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import { ImPhoneHangUp } from "react-icons/im";
import { IoLocationOutline } from "react-icons/io5";
import images from "../../../../../assets/course.png";

export const EditProfile = ({ isOpen, onClose }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            rounded={30}
            bg="#FAFAFA"
            p={4}
            maxW={{ base: "sm", md: "xl" }}
          >
            <Fieldset.Root size={{ base: "sm", md: "lg" }}>
              <Stack>
                <Fieldset.Legend
                  fontWeight={"400"}
                  fontSize={{ base: 15, md: 20 }}
                  fontFamily="InterBold"
                  color={"#1A1A21"}
                >
                  Edit Profile
                </Fieldset.Legend>
              </Stack>
              <Stack mx={"auto"} position={"relative"}>
                <Image
                  src={logo}
                  alt="Update"
                  boxSize={{ base: "70px", md: "100px" }}
                  borderRadius="md"
                  objectFit="cover"
                />
                <Button
                  position={"absolute"}
                  bottom={"-2"}
                  right={"-4"}
                  bg={"transparent"}
                >
                  <Image
                    src={tick}
                    alt="tick"
                    w={7}
                    borderRadius="md"
                    objectFit="cover"
                  />
                </Button>
                <Button
                  position={"absolute"}
                  top={"8"}
                  right={"-11"}
                  bg={"transparent"}
                >
                  <RxDotsVertical color="#475367" />
                </Button>
              </Stack>
              <Fieldset.Content>
                <HStack flexDirection={{ base: "column", md: "row" }}>
                  {/* title */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Name
                    </Field.Label>
                    <InputGroup startElement={<CiUser />}>
                      <Input py={6} placeholder="Surname" />
                    </InputGroup>
                  </Field.Root>

                  {/* Name */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Last Name
                    </Field.Label>
                    <InputGroup startElement={<CiUser />}>
                      <Input py={6} placeholder="Last Name" />
                    </InputGroup>
                  </Field.Root>
                </HStack>

                <HStack flexDirection={{ base: "column", md: "row" }} gap={2}>
                  {/* Gender */}
                  <Field.Root w={{ base: "100%", md: 200 }}>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Gender
                    </Field.Label>
                    <NativeSelect.Root>
                      {/* Icon on the left */}
                      <Box
                        position="absolute"
                        left="3"
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.500"
                      >
                        <CiUser />
                      </Box>

                      <NativeSelect.Field name="country" pl="10">
                        <For each={["Male", "Female", "others"]}>
                          {(item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          )}
                        </For>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                  {/* Pronouns */}
                  <Field.Root w={{ base: "100%", md: 250 }}>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Pronouns
                    </Field.Label>
                    <NativeSelect.Root>
                      {/* Icon on the left */}
                      <Box
                        position="absolute"
                        left="3"
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.500"
                      >
                        <CiUser />
                      </Box>

                      <NativeSelect.Field name="country" pl="10">
                        <For each={["He/Him", "She/Her", "others"]}>
                          {(item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          )}
                        </For>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                  {/* Roots */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Roots
                    </Field.Label>
                    <NativeSelect.Root>
                      {/* Icon on the left */}
                      <Box
                        position="absolute"
                        left="3"
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.500"
                      >
                        <CiUser />
                      </Box>

                      <NativeSelect.Field name="country" pl="10">
                        <For each={["African", "American", "Asia"]}>
                          {(item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          )}
                        </For>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </HStack>

                {/* Email */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Email
                  </Field.Label>
                  <InputGroup startElement={<MdEmail />}>
                    <Input py={6} placeholder="johnmercy03@gmail.com" />
                  </InputGroup>
                </Field.Root>

                <HStack flexDirection={{ base: "column", md: "row" }}>
                  {/* Phone Number */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Phone Number
                    </Field.Label>
                    <InputGroup startElement={<ImPhoneHangUp />}>
                      <Input py={6} placeholder="phoneNumber" />
                    </InputGroup>
                  </Field.Root>

                  {/* Fb */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Facebook
                    </Field.Label>
                    <InputGroup startElement={<FaFacebook color="#1877F2" />}>
                      <Input py={6} placeholder=" johnmercy" />
                    </InputGroup>
                  </Field.Root>

                  {/* Linkedin */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Linkedin
                    </Field.Label>
                    <InputGroup startElement={<BsLinkedin color="#0A66C2" />}>
                      <Input py={6} placeholder="" />
                    </InputGroup>
                  </Field.Root>
                </HStack>

                <HStack>
                  {/* Profession  */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Profession{" "}
                    </Field.Label>
                    <InputGroup startElement={<FaBriefcase />}>
                      <Input py={6} placeholder="Financial Analyst" />
                    </InputGroup>
                  </Field.Root>

                  {/* expert */}
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: 12, md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Expert
                    </Field.Label>
                    <NativeSelect.Root>
                      {/* Icon on the left */}
                      <Box
                        position="absolute"
                        left="3"
                        top="50%"
                        transform="translateY(-50%)"
                        color="gray.500"
                      >
                        <FaBriefcase />
                      </Box>

                      <NativeSelect.Field name="country" pl="10">
                        <For each={["Expert", "Professional", "Experts"]}>
                          {(item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          )}
                        </For>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </HStack>

                {/* Experience */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Experience (Years)
                  </Field.Label>
                  <InputGroup startElement={<FaBriefcase />}>
                    <Input py={6} placeholder="5" />
                  </InputGroup>
                </Field.Root>

                {/* location */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Location
                  </Field.Label>
                  <InputGroup startElement={<IoLocationOutline />}>
                    <Input py={6} placeholder="select" />
                  </InputGroup>
                </Field.Root>

                {/* Organization */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Organization
                  </Field.Label>
                  <InputGroup
                    startElement={
                      <Image
                        src={images}
                        alt="Update"
                        boxSize="20px"
                        //  objectFit={'cover'}
                        rounded={30}
                      />
                    }
                  >
                    <Input
                      py={6}
                      fontFamily="InterRegular"
                      placeholder="Living Springs Finance LTD"
                    />
                  </InputGroup>
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterRegular"
                    color={"#667185"}
                  >
                    Change Organisation
                  </Text>
                </Field.Root>

                {/* Bio */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    About me
                  </Field.Label>
                  <Textarea resize="none" placeholder="Type here" />
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterRegular"
                    color={"#667185"}
                  >
                    Tell us About Yourself
                  </Text>
                </Field.Root>
              </Fieldset.Content>

              {/* Button */}
              <HStack>
                <Button
                  onClick={() => onClose()}
                  py={6}
                  w={{ base: "35%" }}
                  bg={"#fff"}
                  color={"#2B362F"}
                  border={"1px solid #2B362F"}
                >
                  Cancel
                </Button>
                <Button py={6} w={{ base: "60%" }} rounded={5} bg={"#2B362F"}>
                  Save Changes
                </Button>
              </HStack>
            </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

import {
  Dialog,
  Portal,
  CloseButton,
  Stack,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Button,
  Image,
  HStack,
  Text,
  Box,
  Textarea,
  InputGroup,
  Span,
  NumberInput,
  Spinner,
} from "@chakra-ui/react";
import logo from "../../../../../assets/userImage.jpg";
import tick from "../../../../../assets/Verified tick2.png";
import { FaBriefcase } from "react-icons/fa";
import { Checkboxs } from "../../../../components/CheckboxCard/CheckboxCard";
import { PhoneInput } from "../../../../components/phoneINput/PhoneInput";
import { CiCalendar } from "react-icons/ci";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import { useRequest } from "../../../../../hooks/useRequest";
import { toast } from "react-toastify";

export const CreateListOverlay = ({ isOpen, onClose }) => {
  const { userDetails } = useContext(AuthContext);
  const { makeRequest, loading } = useRequest();
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const emailRef = useRef("");
  const [value, setValue] = useState(0);
  const categoryRef = useRef("");
  const calendlyRef = useRef("");
  const prepRef = useRef("");
  const [isFree, setIsfree] = useState(false);
  

  const handleCreateListing = async () => {
    if (
      !titleRef.current.value ||
      !descriptionRef.current.value ||
      !emailRef.current.value ||
      !calendlyRef.current.value ||
      !categoryRef.current.value
    ) {
      return toast.error("One or more required fields not filled");
    }
    const res = await makeRequest("/create-listing", {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      price: value,
      calendly: calendlyRef.current.value,
      preparatoryNote: prepRef.current.value,
      isFree,
      accessEmail: emailRef.current.value,
      category: categoryRef.current.value,
    });
    if (res.error) return;
    toast.success("Listing Created Successfully");
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            rounded={30}
            bg="#FAFAFA"
            p={4}
            maxW={{ base: "sm", md: "lg" }}
          >
            <Dialog.CloseTrigger
              rounded={30}
              border={"1px solid #9E9E9E"}
              asChild
            >
              <CloseButton size="xs" w={0} color={"#9E9E9E"} />
            </Dialog.CloseTrigger>

            <Fieldset.Root size="lg">
              <Stack>
                <Fieldset.Legend>Create Listing</Fieldset.Legend>
              </Stack>
              <Stack mx={"auto"} position={"relative"}>
                <Image
                  src={userDetails.profile_picture || logo}
                  alt="Update"
                  boxSize="100px"
                  borderRadius="md"
                  objectFit="cover"
                  rounded={"full"}
                />
                {/* <Button 
                position={'absolute'}
                 bottom={'-2'}
                 right={'-4'} bg={'transparent'}>
                <Image
                src={tick}
                alt="tick"
                w={7}
                borderRadius="md"
                objectFit="cover"
              />
          </Button> */}
              </Stack>
              <Fieldset.Content>
                {/* title */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Title
                  </Field.Label>
                  <Input name="title" ref={titleRef} />
                </Field.Root>

                {/* Email */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Access Email
                  </Field.Label>
                  <Input name="email" type="email" ref={emailRef} />
                </Field.Root>

                {/* Category */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Category
                  </Field.Label>
                  <NativeSelect.Root>
                    <Box
                      position="absolute"
                      left="3"
                      top="50%"
                      transform="translateY(-50%)"
                      color="gray.500"
                    >
                      <FaBriefcase />
                    </Box>

                    <NativeSelect.Field
                      name="country"
                      pl="10"
                      ref={categoryRef}
                    >
                      <For each={["Finance", "Engineering", "others2"]}>
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
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Description
                  </Field.Label>
                  <Textarea
                    boxSize={150}
                    w={"100%"}
                    outline={"none"}
                    resize={"none"}
                    name="notes"
                    ref={descriptionRef}
                  />
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterRegular"
                    color={"#667185"}
                  >
                    Tell us About the listing
                  </Text>
                </Field.Root>
                {/* check */}
                <Checkboxs checked={isFree} setChecked={setIsfree} />

                {/* Price */}
                {
                  !isFree &&(
                    <>
                     <Span
                  fontWeight={"400"}
                  fontSize={{ base: 12, md: 14 }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                  mb={-3}
                  pt={2}
                >
                  Price (EUR)
                </Span>
                <NumberInput.Root
                  // maxW="200px"
                  value={value}
                  onValueChange={(e) => setValue(e.value)}
                >
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>
                    </>
                  )
                }
               

                {/* calendly */}
                <Span
                  fontWeight={"400"}
                  fontSize={{ base: 12, md: 14 }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                  mb={-3}
                  pt={2}
                >
                  Calendly Link
                </Span>
                <InputGroup startElement={<CiCalendar />}>
                  <Input placeholder="" outline={"none"} ref={calendlyRef} />
                </InputGroup>
                <Text
                  fontWeight={"400"}
                  fontSize={{ base: 12, md: 14 }}
                  fontFamily="InterRegular"
                  color={"#667185"}
                >
                  This will be used for booking sessions
                </Text>
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Preparation Notice
                  </Field.Label>
                  <Textarea
                    _placeholder={{ color: "#98A2B3" }}
                    placeholder="Any Instructions for mentees before session"
                    boxSize={100}
                    w={"100%"}
                    ref={prepRef}
                    outline={"none"}
                    resize={"none"}
                    name="notes"
                  />
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
                <Button
                  py={6}
                  w={{ base: "60%" }}
                  bg={"#2B362F"}
                  onClick={handleCreateListing}
                >
                  {loading ? <Spinner /> : "Create Listing"}
                </Button>
              </HStack>
            </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

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
  Spinner,
  NumberInput,
} from "@chakra-ui/react";
import logo from "../../../../../assets/userImage.jpg";
import tick from "../../../../../assets/Verified tick2.png";
import { FaBriefcase } from "react-icons/fa";

import { PhoneInput } from "../../../../components/phoneINput/PhoneInput";
import { CiCalendar } from "react-icons/ci";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../../context/AuthContext";
import { useRequest } from "../../../../../hooks/useRequest";
import { Checkboxs } from "../../../../components/CheckboxCard/CheckboxCard";

export const EditList = ({ isOpen, onClose, card, setListings }) => {
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const emailRef = useRef("");
  const [value, setValue] = useState(0);
  const calendlyRef = useRef("");
  const prepRef = useRef("");
  const [isFree, setIsfree] = useState(false);
  const { userDetails } = useContext(AuthContext);
  const { makeRequest, loading } = useRequest();

  const handleEditListing = async () => {

    const res = await makeRequest("/edit-listing", {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      price: value,
      calendly: calendlyRef.current.value,
      preparatoryNote: prepRef.current.value,
      isFree,
      accessEmail: emailRef.current.value,
      listingId: card?.id,
    });
    if (res.error) return;
    toast.success("Listing Edited Successfully");
    
  setListings(res.response.listings);

    
    onClose();
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
            maxW={{ base: "sm", md: "lg" }}
          >
            <Dialog.CloseTrigger
              rounded={30}
              border={"1px solid #9E9E9E"}
              asChild
            >
              <CloseButton
                size={{ base: "10", md: "xs" }}
                w={{ base: 6, md: 8 }}
                // fontSize={1}
                p={{ base: 1, md: 2 }}
                color={"#9E9E9E"}
              />
            </Dialog.CloseTrigger>

            <Fieldset.Root size="lg">
              <Stack>
                <Fieldset.Legend fontSize={{ base: "12px", md: "16px" }}>
                  Edit Listing
                </Fieldset.Legend>
              </Stack>
              <Stack mx={"auto"} position={"relative"}>
                <Image
                  src={userDetails.profile_picture || logo}
                  alt="Update"
                  boxSize={{ base: "50px", md: "100px" }}
                  borderRadius="full"
                  objectFit="cover"
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
              <Fieldset.Content mt={{ base: -2, md: 0 }}>
                {/* title */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Title
                  </Field.Label>
                  <Input
                    fontSize={{ base: "9px", md: 12 }}
                    name="title"
                    ref={titleRef}
                    placeholder={card?.title}
                  />
                </Field.Root>

                {/* Email */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Access Email
                  </Field.Label>
                  <Input
                    name="email"
                    type="email"
                    fontSize={{ base: "9px", md: 12 }}
                    ref={emailRef}
                    placeholder={card?.access_email}
                  />
                </Field.Root>

                {/* Category */}
                {/* <Field.Root>
  <Field.Label
   fontWeight={'400'}
   fontSize={{base:12,md:14}}
   fontFamily="InterMedium"
   color={'#101928'} 
  >Category</Field.Label>
  <NativeSelect.Root>

    <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" color="gray.500">
      <FaBriefcase />
    </Box>

     <NativeSelect.Field name="country" pl="10">
       <For each={["Finance", "others1", "others2"]}>
          {(item) => (
           <option key={item} value={item}>
            {item}
           </option>
           )}
          </For>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
          </NativeSelect.Root>
         </Field.Root> */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Description
                  </Field.Label>
                  <Textarea
                    // boxSize={{ base: 70, md: 150 }}
                    w={"100%"}
                    fontSize={{ base: "9px", md: 12 }}
                    outline={"none"}
                    resize={"none"}
                    name="notes"
                    ref={descriptionRef}
                    placeholder={card?.description}
                  />
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: "9px", md: 12 }}
                    fontFamily="InterRegular"
                    color={"#667185"}
                  >
                    Tell us About the listing
                  </Text>
                </Field.Root>
                {/* check */}
                <Checkboxs checked={isFree} setChecked={setIsfree} />

                {/* Price */}
                <Span
                  fontWeight={"400"}
                  fontSize={{ base: "10px", md: 14 }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                  my={-3}
                  pt={2}
                >
                  Price (EUR)
                </Span>
                <NumberInput.Root
                  // maxW="200px"
                  value={value}
                  size={{ base: "xs", md: "sm" }}
                  fontSize={{ base: "9px", md: 12 }}
                  onValueChange={(e) => setValue(e.value)}
                >
                  <NumberInput.Control />
                  <NumberInput.Input />
                </NumberInput.Root>

                {/* calendly */}
                <Span
                  fontWeight={"400"}
                  fontSize={{ base: "10px", md: 14 }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                  mb={-3}
                  pt={2}
                >
                  Calendly Link
                </Span>
                <InputGroup startElement={<CiCalendar />}>
                  <Input
                    fontSize={{ base: "9px", md: 12 }}
                    placeholder={card?.calendly}
                    outline={"none"}
                    ref={calendlyRef}
                  />
                </InputGroup>
                <Text
                  fontWeight={"400"}
                  fontSize={{ base: "9px", md: 14 }}
                  fontFamily="InterRegular"
                  color={"#667185"}
                >
                  This will be used for booking sessions
                </Text>
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "10px", md: 14 }}
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
                    fontSize={{ base: "9px", md: 12 }}
                    ref={prepRef}
                    outline={"none"}
                    resize={"none"}
                    name="notes"
                  />
                </Field.Root>
              </Fieldset.Content>

              {/* Button */}
              <HStack flexDirection={{ base: "column", md: "row" }}>
                <Button
                  onClick={() => onClose()}
                  py={{ base: 3, md: 6 }}
                  w={{ base: "100%", md: "35%" }}
                  bg={"#fff"}
                  color={"#2B362F"}
                  border={"1px solid #2B362F"}
                >
                  Cancel
                </Button>
                <Button
                  py={{ base: 3, md: 6 }}
                  w={{ base: "100%", md: "60%" }}
                  bg={"#2B362F"}
                  onClick={handleEditListing}
                >
                  {loading ? <Spinner /> : "Edit Listing"}
                </Button>
              </HStack>
            </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

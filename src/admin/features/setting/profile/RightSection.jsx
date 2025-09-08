import {
  Box,
  Button,
  Field,
  Fieldset,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo from "../../../../assets/userImage.jpg";
import { useRef, useState } from "react";
import { CiLock } from "react-icons/ci";
import { useRequest } from "../../../../hooks/useRequest";
import { toast } from "react-toastify";

export const RightSectionProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const newPasswordRef = useRef("");
  const currentPasswordRef = useRef("");
  const { makeRequest, loading } = useRequest();

  const updatePassword = async () => {
    if (!newPasswordRef.current.value||!currentPasswordRef.current.value)
      return toast.error("Please fill the password fields first");
    const res = await makeRequest("/update-admin-password", {
      newPassword: newPasswordRef.current.value,
      currentPassword: currentPasswordRef.current.value,
    });
    if (res.error) return;
    toast.success("Password updated successfully");
    currentPasswordRef.current.value = "";
    newPasswordRef.current.value ="";
  };

  const handleCardClick = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  // Dummy Data
  const cardData = [
    {
      id: 1,
      image: logo,
      title: "Project One",
      subtitle: "software developer",
    },
    {
      id: 2,
      image: logo,
      title: "Project One",
      subtitle: "software developer",
    },
  ];

  return (
    <Box
      shadow={"xs"}
      bg={"#FCFCFC"}
      rounded={10}
      p={3}
      w={{ base: "100%" }}
      border={"1px solid #EDEDF2"}
      mb={"auto"}
    >
      <Fieldset.Root size={{ base: "sm", md: "lg" }}>
        <Stack>
          <Fieldset.Legend
            fontWeight={"400"}
            fontSize={{ base: 15, md: 20 }}
            fontFamily="InterBold"
            color={"#1A1A21"}
          >
            Update Password
          </Fieldset.Legend>
          <Text
            fontWeight={"400"}
            fontSize={{ base: 12, md: 14 }}
            fontFamily="InterRegular"
            color={"#8C94A6"}
          >
            Enter your current password to make update
          </Text>
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
              Current Password
            </Field.Label>
            <InputGroup startElement={<CiLock />}>
              <Input placeholder="Enter Password" ref={currentPasswordRef}/>
            </InputGroup>
          </Field.Root>

          <Field.Root>
            <Field.Label
              fontWeight={"400"}
              fontSize={{ base: 12, md: 14 }}
              fontFamily="InterMedium"
              color={"#101928"}
            >
              New Password
            </Field.Label>
            <InputGroup startElement={<CiLock />}>
              <Input placeholder="Enter New Password" ref={newPasswordRef} />
            </InputGroup>
          </Field.Root>
        </Fieldset.Content>

        {/* Button */}
        <HStack justifyContent={"end"}>
          <Button p={5} fontSize={{ base: 12, md: 14 }} bg={"#2B362F"} onClick={updatePassword}>
            {
              loading? <Spinner/>:'Update Password'
            }
          </Button>
        </HStack>
      </Fieldset.Root>
    </Box>
  );
};

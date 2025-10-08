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
} from "@chakra-ui/react";
import logo from "../../../../../assets/userImage.jpg";
import tick from "../../../../../assets/Verified tick2.png";
import { FaBriefcase } from "react-icons/fa";
import { Checkboxs } from "../../../../components/CheckboxCard/CheckboxCard";
import { PhoneInput } from "../../../../components/phoneINput/PhoneInput";
import { CiCalendar, CiLock } from "react-icons/ci";
import { useRequest } from "../../../../../hooks/useRequest";
import { useRef } from "react";
import { toast } from "react-toastify";

export const UpdatePasword = ({ isOpen, onClose }) => {
  const { makeRequest, loading } = useRequest();
  const currentPasswordRef = useRef("");
  const newPasswordRef = useRef("");
  const fileInputRef = useRef(null);

  const handleChangePassword = async () => {
    if (!currentPasswordRef.current.value || !newPasswordRef.current.value) {
      return toast.error("Please fill all fields");
    }

    const res = await makeRequest("/change-password", {
      currentPassword: currentPasswordRef.current.value,
      newPassword: newPasswordRef.current.value,
    });

    if (res.error) return;

    toast.success("Password Changed Successfully");
    onClose();
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // open file picker
    }
  };
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={5}>
          <Dialog.Content
            rounded={{ base: 10, md: 30 }}
            bg="#FAFAFA"
            p={4}
            maxW={{ base: "sm", md: "lg" }}
          >
            <Fieldset.Root size={{ base: "sm", md: "lg" }}>
              <Stack>
                <Fieldset.Legend
                  fontWeight={"400"}
                  fontSize={{ base: "13px", md: 20 }}
                  fontFamily="InterBold"
                  color={"#1A1A21"}
                >
                  Update About
                </Fieldset.Legend>
                <Image
                  src={logo} // fallback to default image
                  alt="Profile Image"
                  boxSize={{ base: "70px", md: "100px" }}
                  borderRadius="full"
                  objectFit="cover"
                  cursor="pointer"
                  onClick={handleImageClick}
                />

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  //   onChange={handleFileChange}
                />
              </Stack>

              <Fieldset.Content>
                {/* title */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "12px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Name
                  </Field.Label>
                  <InputGroup startElement={<CiLock size={10} />}>
                    <Input
                      placeholder="Enter Name"
                      //   ref={currentPasswordRef}
                      fontSize={{ base: "10px", md: "14px" }}
                    />
                  </InputGroup>
                </Field.Root>

                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: "11px", md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    About Company
                  </Field.Label>
                  <InputGroup startElement={<CiLock size={10} />}>
                    <Input
                      placeholder="Enter New About"
                      //   ref={newPasswordRef}
                      fontSize={{ base: "10px", md: "14px" }}
                    />
                  </InputGroup>
                </Field.Root>
              </Fieldset.Content>

              {/* Button */}
              <HStack justifyContent={"end"}>
                <Button
                  onClick={handleChangePassword}
                  p={{ base: 2, md: 5 }}
                  fontSize={{ base: "10px", md: 14 }}
                  bg={"#2B362F"}
                  size={{ base: "xs", md: "md" }}
                >
                  {loading ? <Spinner /> : "Update Password"}
                </Button>
              </HStack>
            </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

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
  FileUpload,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRequest } from "../../../../hooks/useRequest";
import { toast } from "react-toastify";

export const CreateEvent = ({ isOpen, onClose, events, setEvents }) => {
  const titleRef = useRef("");
  const fileRef = useRef(null);
  const dateRef = useRef();
  const memberRef = useRef("");
  const startTimeRef = useRef("");
  const endTimeRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const { makeRequest, loading } = useRequest();
  const linkRef = useRef("");

  let eventImage;

  const handleCreateEvent = async () => {
    if (
      !titleRef.current.value ||
      !dateRef.current.value ||
      !startTimeRef.current.value ||
      !endTimeRef.current.value ||
      !linkRef.current.value
    ) {
      return toast.error("Please fill in all required fields");
    }
    eventImage = fileRef.current?.files[0];
    if (eventImage) {
      const formData = new FormData();
      formData.append("file", eventImage);
      formData.append("upload_preset", "lounge-platform"); // Replace with your Cloudinary preset
      try {
        setIsLoading(true);
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/wokodavid/image/upload",
          formData
        );
        eventImage = res.data.secure_url;

        setIsLoading(false);
      } catch (error) {
        console.error("Image upload failed", error);
        setIsLoading(false);
        toast.error("Image Upload Failed. Please try again.");
        return;
      }
    }
    const members = memberRef.current?.value
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email.length > 0);
    const res = await makeRequest("/create-event", {
      title: titleRef.current.value,
      eventDate: dateRef.current.value + "-01",
      startTime: startTimeRef.current.value,
      endTime: endTimeRef.current.value,
      members: JSON.stringify(members),
      eventImage,
      link: linkRef.current.value,
    });
    if (res.error) return;

    toast.success("Event Created Successfully");
    setEvents((prev) => [res.response.event, ...prev]);
    onClose();
  };

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
            <Stack spacing={4}>
              <Heading fontSize={{ base: "14px", md: "24px" }}>
                Create Event
              </Heading>

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
                  ref={titleRef}
                  type="text"
                  placeholder="Add title"
                />
              </Field.Root>
              <Field.Root>
                <Field.Label
                  fontWeight={"400"}
                  fontSize={{ base: "10px", md: 14 }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                >
                  Event Link
                </Field.Label>
                <Input
                  ref={linkRef}
                  type="text"
                  fontSize={{ base: "9px", md: 12 }}
                  placeholder="Paste link to event (zoom,google meet, microsoft teams, etc.)"
                />
              </Field.Root>

              <FileUpload.Root>
                <FileUpload.HiddenInput ref={fileRef} />
                <FileUpload.Trigger asChild>
                  <Field.Root>
                    <Field.Label
                      fontWeight={"400"}
                      fontSize={{ base: "10px", md: 14 }}
                      fontFamily="InterMedium"
                      color={"#101928"}
                    >
                      Event image
                    </Field.Label>
                    <InputGroup endElement={<BiUpload />}>
                      <Input
                        py={{ base: 2, md: 6 }}
                        fontSize={{ base: "9px", md: 12 }}
                      />
                    </InputGroup>
                  </Field.Root>
                </FileUpload.Trigger>
                <FileUpload.List />
              </FileUpload.Root>

              <Field.Root>
                <Field.Label
                  fontWeight={"400"}
                  fontSize={{ base: "10px", md: 14 }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                >
                  Event Date
                </Field.Label>
                <InputGroup>
                  <Input
                    ref={dateRef}
                    type="date"
                    py={{ base: 2, md: 6 }}
                    fontSize={{ base: "9px", md: 12 }}
                  />
                </InputGroup>
              </Field.Root>

              <HStack spacing={6}>
                <Field.Root>
                  <Field.Label
                    fontWeight="400"
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                    color="#101928"
                  >
                    Start Time
                  </Field.Label>
                  <InputGroup>
                    <Input
                      fontSize={{ base: "9px", md: 12 }}
                      ref={startTimeRef}
                      type="time"
                    />
                  </InputGroup>
                </Field.Root>

                <Field.Root>
                  <Field.Label
                    fontWeight="400"
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                    color="#101928"
                  >
                    End Time
                  </Field.Label>
                  <InputGroup>
                    <Input
                      fontSize={{ base: "9px", md: 12 }}
                      ref={endTimeRef}
                      type="time"
                    />
                  </InputGroup>
                </Field.Root>
              </HStack>

              <Field.Root>
                <Field.Label
                  fontWeight={"400"}
                  fontSize={{ base: "10px", md: 14 }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                >
                  Notify Members
                </Field.Label>
                <InputGroup>
                  <Input
                    ref={memberRef}
                    placeholder="Member email addresses (comma separated)"
                    py={{ base: 2, md: 6 }}
                    fontSize={{ base: "9px", md: 12 }}
                  />
                </InputGroup>
              </Field.Root>

              <HStack
                flexDirection={{ base: "column", md: "row" }}
                justifyContent={"space-between"}
              >
                <Button
                  onClick={() => onClose()}
                  mr={"auto"}
                  bg={"#fff"}
                  width={{ base: "100%", md: "auto" }}
                  fontSize={{ base: "9px", md: 12 }}
                  color={"#2B362F"}
                  border={"1px solid #2B362F"}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateEvent}
                  py={{ base: 2, md: 6 }}
                  rounded={5}
                  width={{ base: "100%", md: "auto" }}
                  bg={"#2B362F"}
                  fontSize={{ base: "9px", md: 12 }}
                  color="white"
                >
                  {loading || isLoading ? <Spinner /> : "Create Now"}{" "}
                  <IoIosArrowRoundForward />
                </Button>
              </HStack>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

import {
  Dialog,
  Portal,
  CloseButton,
  Stack,
  Button,
  Heading,
  Input,
  FileUpload,
  Textarea,
  Spinner,
  Text,
} from "@chakra-ui/react";
// import { CgAttachment } from "react-icons/cg";
// import { CiImageOn } from "react-icons/ci";
// import { PiTelegramLogoLight } from "react-icons/pi";
import { useRequest } from "../../../../hooks/useRequest";
import { useRef, useState } from "react";
// import axios from "axios";
import { toast } from "react-toastify";

export const CreateSpeakerHighlight = ({
  isOpen,
  onClose,
  programId,
  refresh,
}) => {
  const { loading, makeRequest } = useRequest();

  const nameRef = useRef("");
  const highlightRef = useRef("");

  const handlePost = async () => {
    if (!nameRef.current.value || !highlightRef.current.value) {
      return toast.error("Missing required fields");
    }

    const response = await makeRequest("/speaker-highlights", {
      name: nameRef.current?.value,
      highlight: highlightRef.current?.value,
      programId,
    });

    if (response.error) return;

    toast.success("Speaker Highlight added successfully");

    refresh();
    onClose();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPostImage(file);
    }
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
            <Stack spacing={0}>
              <Heading
                fontSize={{ base: "12px", md: 18 }}
                size={{ base: "xs", md: "sm" }}
              >
                Create Speaker Highlight
              </Heading>
              <Text
                fontSize={{ base: "10px", md: 14 }}
                // size={{ base: "xs", md: "sm" }}
              >
                Speaker Name
              </Text>
              <Input
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
                type="text"
                ref={nameRef}
              />

              <>
                <Text fontSize={{ base: "10px", md: 14 }}>
                  Speaker Highlight
                </Text>
                <Textarea
                  type="text"
                  fontSize={{ base: "10px", md: 14 }}
                  placeholder="Paste the highlighted speaker's statement"
                  ref={highlightRef}
                />
              </>

              {/* <HStack maxW={200} justifyContent={"flex-start"}>
                <FileUpload.Root>
                  <FileUpload.HiddenInput />
                  <FileUpload.Trigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleImageClick}
                    >
                      <CiImageOn />{" "}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                     Add Video Thumbnail
                    </Button>
                  </FileUpload.Trigger>
                  <FileUpload.List />
                </FileUpload.Root>
               


              </HStack> */}

              <Button
                rounded={20}
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
                onClick={handlePost}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Save"}
              </Button>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

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
} from "@chakra-ui/react";
import { CgAttachment } from "react-icons/cg";
import { CiImageOn } from "react-icons/ci";
import { PiTelegramLogoLight } from "react-icons/pi";

export const EditArticle = ({ isOpen, onClose }) => {
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
              <CloseButton size={{ base: "10", md: "xs" }} color={"#9E9E9E"} />
            </Dialog.CloseTrigger>
            <Stack spacing={0}>
              <Heading fontSize={{ base: "13px", md: "24px" }}>
                Edit Article
              </Heading>
              <Text fontSize={{ base: "11px", md: "14px" }}>Title</Text>
              <Input type="text" fontSize={{ base: "10px", md: "14px" }} />
              <Textarea
                border={"1px solid #D3D4D7"}
                h={100}
                pb={{ base: 50, md: 300 }}
                fontSize={{ base: "10px", md: "14px" }}
                autoresize
                variant="subtle"
                placeholder="Write your post or question here"
              />
              <HStack maxW={200} justifyContent={"flex-start"}>
                <FileUpload.Root>
                  <FileUpload.HiddenInput />
                  <FileUpload.Trigger asChild>
                    <Button
                      fontSize={{ base: "10px", md: "14px" }}
                      rounded={{ base: 8, md: 30 }}
                      variant="outline"
                      size="sm"
                    >
                      <CiImageOn /> Add media
                    </Button>
                  </FileUpload.Trigger>
                  <FileUpload.List />
                </FileUpload.Root>
                {/* add Link */}

                <Button
                  my={4}
                  bg={"#EFF2FC"}
                  color={"#292D32"}
                  size="sm"
                  rounded={{ base: 8, md: 20 }}
                  fontSize={{ base: "10px", md: "14px" }}
                >
                  <CgAttachment size={10} />
                  Add Link
                </Button>
              </HStack>
              <Button rounded={{ base: 8, md: 20 }}>
                Post <PiTelegramLogoLight />
              </Button>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

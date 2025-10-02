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
  Spinner,
} from "@chakra-ui/react";
import { useRef } from "react";
import { CgAttachment } from "react-icons/cg";
import { CiImageOn } from "react-icons/ci";
import { PiTelegramLogoLight } from "react-icons/pi";
import { useRequest } from "../../../../hooks/useRequest";
import { toast } from "react-toastify";

export const EditProgram = ({ isOpen, onClose, currentContent, setRefresh }) => {
  const titleRef = useRef("");
    const descRef=useRef('');
    const {loading, makeRequest} = useRequest()
   const handleSave = async()=>{
      if(!titleRef.current.value || !descRef.current.value ){
        return toast.error('Please fill in the required fields')
      }
  
      const res = await makeRequest('/update-title', {
        programId: currentContent.id,
        title: titleRef.current.value, 
        description: descRef.current.value,
        
  
      })
      if(res.error) return;
      toast.success('Program updated successfully');
      setRefresh(prev => !prev)
      onClose()
  
    }
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
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
              >
                Edit Program
              </Heading>
              <Text
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
              >
                Title
              </Text>
              <Input ref={titleRef} fontSize={{ base: "10px", md: 14 }} type="text" defaultValue={currentContent?.title} />
              <Text
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
              >
               Description
              </Text>
              <Textarea
                border={"1px solid #D3D4D7"}
                minH={200}
                fontSize={{ base: "10px", md: 14 }}
                autoresize
                variant="subtle"
                defaultValue={currentContent?.content}
                ref={descRef}
                // placeholder="Write your post or question here"
              />
              <Text
                color={"#667185"}
                fontSize={{ base: "7px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
              >
                0/100 words
              </Text>
              <HStack w={"100%"}>
                <Button
                  onClick={() => onClose()}
                  py={{ base: 1, md: 6 }}
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  px={{ base: 5, md: 50 }}
                  // w={{base:'35%'}}
                  bg={"#fff"}
                  color={"#2B362F"}
                  border={"1px solid #2B362F"}
                >
                  Cancel
                </Button>
                <Button
                     onClick={handleSave}
                  py={{ base: 1, md: 6 }}
                  flex={1}
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  // w={{ base: "100%" }}
                  rounded={5}
                  bg={"#2B362F"}
                  color="white"
                >
                 {
                  loading?<Spinner/>:'Save Changes'
                 }
                </Button>
              </HStack>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

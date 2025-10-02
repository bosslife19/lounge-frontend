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
  Field,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";
import logo from "../../../../assets/userImage.jpg";
import { MdAddCircleOutline, MdCalendarToday } from "react-icons/md";
import { RxDotsVertical } from "react-icons/rx";
import { FiPlusCircle } from "react-icons/fi";
import { CgAttachment } from "react-icons/cg";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRequest } from "../../../../hooks/useRequest";
export const EditSession = ({ isOpen, onClose, currentContent, setRefresh}) => {
  const titleRef = useRef("");
  const descRef=useRef('');
  const linkRef= useRef('')
  const timeRef = useRef();
  const dateRef = useRef();
  const {loading, makeRequest} = useRequest()

  const handleSave = async()=>{
    if(!titleRef.current.value || !descRef.current.value || !linkRef.current.value || !timeRef.current.value ||!dateRef.current.value){
      return toast.error('Please fill in the required fields')
    }

    const res = await makeRequest('/update-session', {
      sessionId: currentContent.id,
      title: titleRef.current.value, 
      description: descRef.current.value,
      link: linkRef.current.value,
      time: timeRef.current.value,
      date: dateRef.current.value,

    })
    if(res.error) return;
    toast.success('Session updated successfully')
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
                Edit Session
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
                defaultValue={currentContent?.description}
                ref={descRef}
                // placeholder="Write your post or question here"
              />
              {/* <Text
                color={"#667185"}
                fontSize={{ base: "7px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
              >
                0/100 words
              </Text> */}
              <Text
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
              >
                Link
              </Text>
              <Input ref={linkRef} fontSize={{ base: "10px", md: 14 }} type="text" defaultValue={currentContent?.video_link} />
                 <Text
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
              >
                Time
              </Text>
              <Input fontSize={{ base: "10px", md: 14 }} type="time" defaultValue={currentContent?.time} ref={timeRef} />
               <Text
                fontSize={{ base: "10px", md: 14 }}
                size={{ base: "xs", md: "sm" }}
              >
                Date
              </Text>
              <Input fontSize={{ base: "10px", md: 14 }} type="date" defaultValue={currentContent?.date} ref={dateRef} />
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
                  //   onClick={onFinish}
                  py={{ base: 1, md: 6 }}
                  flex={1}
                  fontSize={{ base: "10px", md: 14 }}
                  size={{ base: "xs", md: "sm" }}
                  // w={{ base: "100%" }}
                  rounded={5}
                  bg={"#2B362F"}
                  color="white"
                  onClick={handleSave}
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

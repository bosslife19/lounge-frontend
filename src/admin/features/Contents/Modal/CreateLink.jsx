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
  Spinner,
} from "@chakra-ui/react";
import { CgAttachment } from "react-icons/cg";
import { useRequest } from "../../../../hooks/useRequest";
import { useRef } from "react";
import { toast } from "react-toastify";

export const CreateLink = ({ isOpen, onClose, setLinks}) => {
  const {loading, makeRequest} = useRequest();
  const linkRef = useRef()
  const titleRef= useRef('');
  const handleLinkPost = async ()=>{
    if(!linkRef.current.value ||!titleRef.current.value) return toast.error("All fields are required");
    const res = await makeRequest('/link', {url:linkRef.current.value, title: titleRef.current.value});
    if(res.error) return;
    toast.success("Link posted successfully");
    setLinks(prev=>[res.response.link, ...prev]);
    onClose();
    linkRef.current.value = "";
    
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
              <Heading fontSize={{ base: "14px", md: "24px" }}>
                Post New Link
              </Heading>
              {/* <Text fontSize={{ base: "10px", md: "12px" }}>Title</Text>
              <Input fontSize={{ base: "10px", md: "12px" }} type="text" /> */}
              <Field.Root style={{marginTop:10}}>
                <Field.Label
                  fontWeight={"400"}
                  fontSize={{ base: "10px", md: 14 }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                >
                   Link Title/Description
                </Field.Label>
                <InputGroup>
                  <Input
                    py={{ base: 2, md: 6 }}
                    fontSize={{ base: "10px", md: "12px" }}
                    placeholder=""
                    type="text"
                    ref={titleRef}
                  />
                </InputGroup>
              </Field.Root>

              <Field.Root>
                <Field.Label
                  fontWeight={"400"}
                  fontSize={{ base: "10px", md: 14 }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                >
                   Link Url
                </Field.Label>
                <InputGroup startElement={<CgAttachment />}>
                  <Input
                    py={{ base: 2, md: 6 }}
                    fontSize={{ base: "10px", md: "12px" }}
                    placeholder=""
                    type="url"
                    ref={linkRef}
                  />
                </InputGroup>
              </Field.Root>

              <HStack>
                <Button
                  onClick={() => onClose()}
                  py={{ base: 2, md: 6 }}
                  flex={0.7}
                  px={{ base: 5, md: 50 }}
                  // w={{base:'35%'}}
                  bg={"#fff"}
                  fontSize={{ base: "10px", md: "12px" }}
                  color={"#2B362F"}
                  border={"1px solid #2B362F"}
                >
                  Cancel
                </Button>
                <Button
                  //   onClick={onFinish}
                  py={{ base: 2, md: 6 }}
                  flex={1}
                  // w={{ base: "100%" }}
                  rounded={5}
                  bg={"#2B362F"}
                  fontSize={{ base: "10px", md: "12px" }}
                  color="white"
                  onClick={handleLinkPost}
                >
                  {
                    loading?<Spinner color="white" />:"Post Link"
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

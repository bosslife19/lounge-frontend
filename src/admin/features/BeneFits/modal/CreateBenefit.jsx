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
  createListCollection,
  Spinner,
} from "@chakra-ui/react";
import { FaBriefcase } from "react-icons/fa";
import { Dropdown } from "../../../components/select/Dropdown";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useRequest } from "../../../../hooks/useRequest";

const frameworks = createListCollection({
  items: [
    { label: "Experience", value: "Experience" },
    { label: "finances", value: "finances" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
});
export const CreateBenefits = ({ isOpen, onClose, setBenefits }) => {
  const title = useRef('');
  const company = useRef('');
  const points = useRef(0)
const {loading, makeRequest} = useRequest()
  const handleCreate = async()=>{
    if(!title.current.value || !company.current.value || !points.current.value) return toast.error("All fields are required");
    const res = await makeRequest('/benefit', {title: title.current.value, company: company.current.value, points:points.current.value});
    if(res.error) return;
    setBenefits(prev=>[res.response.benefit, ...prev]);
    toast.success('Benefit Created successfully')
    onClose();

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
              <Heading fontSize={{ base: "12px", md: "14px" }}>
                Create Benefit
              </Heading>
              <Text fontSize={{ base: "10px", md: "14px" }}>Title</Text>
              <Input
                fontSize={{ base: "10px", md: "14px" }}
                placeholder="Benefit name/title"
                type="text"
                ref={title}
              />
              <Text fontSize={{ base: "11px", md: "14px" }}>Partner</Text>
              <Input
                fontSize={{ base: "10px", md: "14px" }}
                placeholder="Name of company users can claim benefit from"
                type="text"
                ref={company}
              />

              <Field.Root>
                <Field.Label
                  fontWeight={"400"}
                  fontSize={{ base: "10px", md: "14px" }}
                  fontFamily="InterMedium"
                  color={"#101928"}
                >
                  Points Required
                </Field.Label>
                <InputGroup>
                  <Input
                    fontSize={{ base: "10px", md: "14px" }}
                    type="number"
                    py={{ base: 2, md: 6 }}
                    ref={points}
                  />
                </InputGroup>
              </Field.Root>
              <HStack pt={4} w={"100%"}>
                <Button
                  flex={0.4}
                  onClick={() => onClose()}
                  py={{ base: 2, md: 6 }}
                  px={{ base: 5, md: 50 }}
                  fontSize={{ base: "10px", md: "14px" }}
                  // w={{base:'35%'}}
                  bg={"#fff"}
                  color={"#2B362F"}
                  border={"1px solid #2B362F"}
                >
                  Cancel
                </Button>
                <Button
                   onClick={handleCreate}
                  py={{ base: 2, md: 6 }}
                  flex={1}
                  // w={{ base: "100%" }}
                  rounded={5}
                  fontSize={{ base: "10px", md: "14px" }}
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

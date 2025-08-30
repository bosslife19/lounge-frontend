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
  Field,
  InputGroup,
  createListCollection,
} from "@chakra-ui/react";
import { FaBriefcase } from "react-icons/fa";
import { Dropdown } from "../../../components/select/Dropdown";

       const frameworks = createListCollection({
        items: [
          { label: "Experience", value: "Experience" },
          { label: "finances", value: "finances" },
          { label: "Angular", value: "angular" },
          { label: "Svelte", value: "svelte" },
        ],
      })
export const CreatePoints = ({ isOpen, onClose }) => {
  
 
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="lg" bg="#FAFAFA" p={4}>
            <Dialog.CloseTrigger rounded={30} border={'1px solid #9E9E9E'} asChild>
              <CloseButton size="xs" color={'#9E9E9E'} />
            </Dialog.CloseTrigger>
            <Stack spacing={0}>
              <Heading>
                Create Point Allotment
              </Heading>
              <Text>
                Function
              </Text>
              <Input placeholder="Daily Log in" 
              type="text" />
               
               
               <Field.Root>
                  <Field.Label
                    fontWeight={'400'}
                   fontSize={{base:11,md:14}}
                   fontFamily="InterMedium"
                   color={'#101928'} >Point (EUR)</Field.Label>
                    <InputGroup startElement={<FaBriefcase />}>
                        <Input type='number' py={6}  fontSize={{base:10,md:13}} 
                        />
                    </InputGroup>
                    </Field.Root>
                   <HStack pt={4} w={'100%'}>
                     <Button 
                     flex={0.4}
                     onClick={()=>onClose()}
                           py={6} 
                               px={{base:5,md:50}}
                                // w={{base:'35%'}}
                                 bg={'#fff'} color={'#2B362F'} border={"1px solid #2B362F"} >
                                Cancel
                             </Button>
                           <Button
                        //   onClick={onFinish}
                          py={6}
                         flex={1}
                        // w={{ base: "100%" }}
                         rounded={5}
                         bg={"#2B362F"}
                        color="white"
                       >
                      Save Changes 
                    </Button>
                 </HStack>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
 
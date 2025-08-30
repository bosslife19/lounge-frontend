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
} from "@chakra-ui/react";
import { BiUpload } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";
 
export const CreateEvent = ({ isOpen, onClose }) => {
 
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="lg" bg="#FAFAFA" p={4}>
            <Dialog.CloseTrigger rounded={30} border={'1px solid #9E9E9E'} asChild>
              <CloseButton size="xs" color={'#9E9E9E'} />
            </Dialog.CloseTrigger>
            <Stack  spacing={0}>
              <Heading>
               Create Event
              </Heading>
              <Text>
                Title
                 </Text>
                  <Input type="text" placeholder="Add title" />
                  
                    <FileUpload.Root>
                    <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                     <Field.Root>
                  <Field.Label
                   fontWeight={'400'}
                   fontSize={{base:11,md:14}}
                   fontFamily="InterMedium"
                   color={'#101928'} >Event image</Field.Label>
                   <InputGroup endElement={<BiUpload/>}>
                     <Input  py={6} fontSize={{base:10,md:13}} 
                      />
                   </InputGroup>
                  </Field.Root>
                </FileUpload.Trigger>
                <FileUpload.List />
              </FileUpload.Root>

              {/* created Date  */}
                <Field.Root>
                  <Field.Label
                   fontWeight={'400'}
                   fontSize={{base:11,md:14}}
                   fontFamily="InterMedium"
                   color={'#101928'} >Created Date </Field.Label>
                   <InputGroup >
                     <Input type="month"  py={6} fontSize={{base:10,md:13}} 
                      />
                   </InputGroup>
                  </Field.Root>

              <HStack spacing={6}>
              {/* Start Time */}
            <Field.Root>
          <Field.Label
          fontWeight="400"
          fontSize={{ base: 11, md: 14 }}
          fontFamily="InterMedium"
          color="#101928"
        >
          Start Time
        </Field.Label>
        <InputGroup>
          <HStack>
            <Input
              type="number"
              placeholder="MM"
              min={1}
              max={12}
              maxLength={2}
              py={6}
              w="60px"
              fontSize={{ base: 10, md: 13 }}
            />
            <Text>/</Text>
            <Input
              type="number"
              placeholder="YY"
              min={0}
              max={99}
              maxLength={2}
              py={6}
              w="60px"
              fontSize={{ base: 10, md: 13 }}
            />
          </HStack>
        </InputGroup>
      </Field.Root>

      {/* End Time */}
      <Field.Root>
        <Field.Label
          fontWeight="400"
          fontSize={{ base: 11, md: 14 }}
          fontFamily="InterMedium"
          color="#101928"
        >
          End Time
        </Field.Label>
        <InputGroup>
          <HStack>
            <Input
              type="number"
              placeholder="MM"
              min={1}
              max={12}
              maxLength={2}
              py={6}
              w="60px"
              fontSize={{ base: 10, md: 13 }}
            />
            <Text>/</Text>
            <Input
              type="number"
              placeholder="YY"
              min={0}
              max={99}
              maxLength={2}
              py={6}
              w="60px"
              fontSize={{ base: 10, md: 13 }}
            />
               </HStack>
              </InputGroup>
             </Field.Root>
              </HStack>

                 <Field.Root>
                  <Field.Label
                   fontWeight={'400'}
                   fontSize={{base:11,md:14}}
                   fontFamily="InterMedium"
                   color={'#101928'} >Add Member </Field.Label>
                   <InputGroup >
                     <Input placeholder="Member email address"  
                       py={6} fontSize={{base:10,md:13}} 
                      />
                   </InputGroup>
                  </Field.Root>

                   <HStack justifyContent={'space-between'}>
                     <Button 
                     onClick={()=>onClose()}
                         mr={'auto'}
                       bg={'#fff'} color={'#2B362F'} border={"1px solid #2B362F"} >
                        Cancel
                        </Button>
                           <Button
                           py={6}
                         rounded={5}
                         bg={"#2B362F"}
                        color="white"
                       >
                    Create Now <IoIosArrowRoundForward/>
                    </Button>
                 </HStack>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
 
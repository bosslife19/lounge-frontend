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
  } from "@chakra-ui/react";
 import logo from "../../../../../assets/userImage.jpg";
 import tick from "../../../../../assets/Verified tick2.png";
import { FaBriefcase } from "react-icons/fa";
import { Checkboxs } from "../../../../components/CheckboxCard/CheckboxCard";
import { PhoneInput } from "../../../../components/phoneINput/PhoneInput";
 import { CiCalendar, CiLock } from "react-icons/ci";

export const UpdatePasword = ({ isOpen, onClose }) => {
 
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content rounded={30} bg="#FAFAFA" p={4} 
          maxW={{base:'sm',md:"lg"}}>
            
         <Fieldset.Root size={{base:'sm',md:"lg"}}  >
         <Stack>
          <Fieldset.Legend
          fontWeight={'400'}
           fontSize={{base:15,md:20}}
           fontFamily="InterBold"
           color={'#1A1A21'}
          >Update Password</Fieldset.Legend>
          <Text 
          fontWeight={'400'}
           fontSize={{base:12,md:14}}
           fontFamily="InterRegular"
           color={'#8C94A6'}
          >
            Enter your current password to make update
          </Text>
           </Stack>
              
       <Fieldset.Content>
        {/* title */}
        <Field.Root>
          <Field.Label
          fontWeight={'400'}
           fontSize={{base:12,md:14}}
           fontFamily="InterMedium"
           color={'#101928'}
          >Current Password</Field.Label>
           <InputGroup startElement={<CiLock />}>
             <Input placeholder="Enter Password" />
           </InputGroup>
        </Field.Root>

        <Field.Root>
          <Field.Label
          fontWeight={'400'}
           fontSize={{base:12,md:14}}
           fontFamily="InterMedium"
           color={'#101928'}
          >New Password</Field.Label>
           <InputGroup startElement={<CiLock />}>
             <Input placeholder="Enter New Password" />
           </InputGroup>
        </Field.Root>
        </Fieldset.Content>

          {/* Button */}
          <HStack justifyContent={'end'}>
           <Button onClick={()=>onClose()} 
           p={5}  
           fontSize={{base:12,md:14}}
             bg={'#2B362F'} >
            Update Password
          </Button>
         </HStack>
         </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

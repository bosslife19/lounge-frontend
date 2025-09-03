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
  Spinner,
  } from "@chakra-ui/react";
 import logo from "../../../../../assets/userImage.jpg";
 import tick from "../../../../../assets/Verified tick2.png";
import { FaBriefcase } from "react-icons/fa";
import { Checkboxs } from "../../../../components/CheckboxCard/CheckboxCard";
import { PhoneInput } from "../../../../components/phoneINput/PhoneInput";
 import { CiCalendar, CiLock } from "react-icons/ci";
 import { useRequest } from "../../../../../hooks/useRequest";
import { useRef } from "react";
import { toast } from "react-toastify";

export const UpdatePasword = ({ isOpen, onClose }) => {
  const {makeRequest, loading} = useRequest();
  const currentPasswordRef = useRef('');
  const newPasswordRef = useRef('');

  const handleChangePassword = async ()=>{

if(!currentPasswordRef.current.value || !newPasswordRef.current.value){
  return toast.error("Please fill all fields")
}



  const res = await makeRequest('/change-password', {
    currentPassword: currentPasswordRef.current.value,
    newPassword: newPasswordRef.current.value
  })

  if(res.error) return;

  toast.success('Password Changed Successfully');
  onClose();

}
 
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
             <Input placeholder="Enter Password"  ref={currentPasswordRef}/>
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
             <Input placeholder="Enter New Password" ref={newPasswordRef} />
           </InputGroup>
        </Field.Root>
        </Fieldset.Content>

          {/* Button */}
          <HStack justifyContent={'end'}>
           <Button onClick={handleChangePassword} 
           p={5}  
           fontSize={{base:12,md:14}}
             bg={'#2B362F'} >
            {
              loading? <Spinner/>:'Update Password'
            }
          </Button>
         </HStack>
         </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

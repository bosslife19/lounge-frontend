import {
  Dialog,
  Portal,
  Fieldset,
    Button,
   HStack,
  Image,
  Text,
  } from "@chakra-ui/react";
 import avatar from "../../../../assets/registration_4745657 1.png"
export const FinishProfile = ({ isOpen, onClose  }) => {
 
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} >
      <Portal >
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content rounded={30} bg="#FAFAFA" p={4} 
          maxW={{base:'sm',md:"50%"}} >
         <Fieldset.Root size={{base:'sm',md:"lg"}} p={7}  >
       <Fieldset.Content 
       alignItems={'center'}
       justifyContent={'center'}>
        <Image
         src={avatar}
         w={{base:200}}
         />
        <Text
        fontWeight={'400'}
        pt={10}
           fontSize={{base:28,md:40}}
           fontFamily="LatoRegular"
           color={'#2B362F'}
        >
            Congratulations!
        </Text>

        <Text
         fontWeight={'400'}
          pt={5}
           fontSize={{base:16,md:18}}
           fontFamily="LatoRegular"
           color={'#A4A9AE'}
           maxW={450}
           lineHeight={1.5}
           textAlign={'center'}
        >
            You have successfully created your profile here with Lounge. Start enjoying our services.
         </Text>
        </Fieldset.Content>
          {/* Button */}
            <Button mx={'auto'} 
            onClick={onClose} 
             p={7}  
             fontSize={{base:17,md:18}}
             rounded={10}
              fontFamily="LatoRegular"
             bg={'#2B362F'} >
            Back to Home
          </Button>
          </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

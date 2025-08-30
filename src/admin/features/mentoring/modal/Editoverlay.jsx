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
 import logo from "../../../../assets/Image.png";
 import tick from "../../../../assets/Verified tick2.png";
import { FaBriefcase } from "react-icons/fa";
// import { Checkboxs } from "../../../../components/CheckboxCard/CheckboxCard";
// import { PhoneInput } from "../../../../components/phoneINput/PhoneInput";
 import { CiCalendar } from "react-icons/ci";
import { Checkboxs } from "../../../../user/components/CheckboxCard/CheckboxCard";
import { PhoneInput } from "../../../../user/components/phoneINput/PhoneInput";

export const EditMentor = ({ isOpen, onClose }) => {
 
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content rounded={30} bg="#FAFAFA" p={4} 
          maxW={{base:'sm',md:"lg"}}>
            <Dialog.CloseTrigger
              rounded={30}
              border={"1px solid #9E9E9E"}
              asChild
            >
              <CloseButton size="xs" w={0} color={"#9E9E9E"} />
            </Dialog.CloseTrigger>

         <Fieldset.Root size="lg"  >
         <Stack>
          <Fieldset.Legend>Create Listing</Fieldset.Legend>
           </Stack>
              <Stack mx={'auto'} position={'relative'}>
              <Image
                src={logo}
                alt="Update"
                boxSize="100px"
                borderRadius="md"
                objectFit="cover"
               
              />
               <Button 
                position={'absolute'}
                 bottom={'-2'}
                 right={'-4'} bg={'transparent'}>
                <Image
                src={tick}
                alt="tick"
                w={7}
                borderRadius="md"
                objectFit="cover"
              />
          </Button>
        </Stack>
       <Fieldset.Content>
        {/* title */}
        <Field.Root>
          <Field.Label
          fontWeight={'400'}
           fontSize={{base:12,md:14}}
           fontFamily="InterMedium"
           color={'#101928'}
          >Title</Field.Label>
          <Input name="title" />
        </Field.Root>

          {/* Email */}
        <Field.Root>
          <Field.Label
           fontWeight={'400'}
           fontSize={{base:12,md:14}}
           fontFamily="InterMedium"
           color={'#101928'}
          >Access Email</Field.Label>
          <Input name="email" type="email" />
        </Field.Root>

    {/* Category */}
    <Field.Root>
  <Field.Label
   fontWeight={'400'}
   fontSize={{base:12,md:14}}
   fontFamily="InterMedium"
   color={'#101928'}
  >Category</Field.Label>
  <NativeSelect.Root>
    {/* Icon on the left */}
    <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" color="gray.500">
      <FaBriefcase />
    </Box>

     <NativeSelect.Field name="country" pl="10">
       <For each={["Finance", "others1", "others2"]}>
          {(item) => (
           <option key={item} value={item}>
            {item}
           </option>
           )}
          </For>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
          </NativeSelect.Root>
         </Field.Root>
          <Field.Root>
          <Field.Label
           fontWeight={'400'}
            fontSize={{base:12,md:14}}
            fontFamily="InterMedium"
            color={'#101928'}
          >Description</Field.Label>
          <Textarea boxSize={150} w={'100%'}   outline={'none'} resize={'none'} name="notes" />
           <Text
            fontWeight={'400'}
            fontSize={{base:12,md:14}}
            fontFamily="InterRegular"
            color={'#667185'}
           >Tell us About the listing</Text>
         </Field.Root>
         {/* check */}
         <Checkboxs/>

         {/* Price */}
          <Span
         fontWeight={'400'}
            fontSize={{base:12,md:14}}
            fontFamily="InterMedium"
            color={'#101928'}
            mb={-3}
             pt={2}
         >Price (EUR)</Span>
         <PhoneInput/>

         {/* calendly */}
         <Span
         fontWeight={'400'}
            fontSize={{base:12,md:14}}
            fontFamily="InterMedium"
            color={'#101928'}
             mb={-3}
             pt={2}
         >Calendly Link</Span>
         <InputGroup startElement={<CiCalendar />}>
          <Input placeholder="" outline={'none'} />
        </InputGroup>
        <Text
        fontWeight={'400'}
        fontSize={{base:12,md:14}}
         fontFamily="InterRegular"
         color={'#667185'}
         >
            This will be used for booking sessions
        </Text>
          <Field.Root>
          <Field.Label
          fontWeight={'400'}
            fontSize={{base:12,md:14}}
            fontFamily="InterMedium"
            color={'#101928'}
          >Preparation Notice</Field.Label>
          <Textarea 
          _placeholder={{color:'#98A2B3'}}
          placeholder="Any Instructions for mentees before session"
           boxSize={100} 
           w={'100%'}   
           outline={'none'} 
           resize={'none'} 
           name="notes" />
          </Field.Root>
          </Fieldset.Content>

          {/* Button */}
          <HStack>
           <Button onClick={()=>onClose()} py={6} w={{base:'35%'}} bg={'#fff'} color={'#2B362F'} border={"1px solid #2B362F"} >
             Cancel
           </Button>
           <Button py={6} w={{base:'60%'}} bg={'#2B362F'} >
            Save Changes
          </Button>
         </HStack>
         </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

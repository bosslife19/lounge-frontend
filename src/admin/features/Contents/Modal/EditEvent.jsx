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
   Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRequest } from "../../../../hooks/useRequest";
import { toast } from "react-toastify";
 
export const EditEvent = ({ isOpen, onClose,  eventId }) => {
  const titleRef = useRef('');
  const fileRef = useRef(null);
  const dateRef= useRef();
  const memberRef = useRef('');
  const startTimeRef = useRef('');
  const endTimeRef = useRef('')
  const [isLoading, setIsLoading] = useState(false);
  const {makeRequest, loading} = useRequest();
  const linkRef = useRef("")
 
  let eventImage;

  const handleCreateEvent = async ()=>{
    if(!titleRef.current.value||!dateRef.current.value||!startTimeRef.current.value||!endTimeRef.current.value||!linkRef.current.value){
      return toast.error('Please fill in all required fields')
    }
    eventImage = fileRef.current?.files[0];
   if(eventImage){
     const formData = new FormData();
          formData.append("file", eventImage);
          formData.append("upload_preset", "lounge-platform"); // Replace with your Cloudinary preset
                try {
                setIsLoading(true);
            const res = await axios.post(
              "https://api.cloudinary.com/v1_1/wokodavid/image/upload",
              formData
            );
            eventImage = res.data.secure_url;

    
          setIsLoading(false);
           
          } catch (error) {
            console.error("Image upload failed", error);
            setIsLoading(false);
            toast.error("Image Upload Failed. Please try again.");
            return;
          }
   }
   const members = memberRef.current?.value
        .split(',')
        .map(email => email.trim())
        .filter(email => email.length > 0);
   const res = await makeRequest('/edit-event', {
    title:titleRef.current.value,
    eventDate:dateRef.current.value + '-01',
    startTime: startTimeRef.current.value,
    endTime: endTimeRef.current.value,
    members:JSON.stringify(members),
    eventImage,
    link: linkRef.current.value,
    eventId
   });
   if(res.error) return;

   toast.success('Event Edited Successfully');
   
   onClose()
   

  }
 
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="lg" bg="#FAFAFA" p={4}>
            <Dialog.CloseTrigger rounded={30} border={'1px solid #9E9E9E'} asChild>
              <CloseButton size="xs" color={'#9E9E9E'} />
            </Dialog.CloseTrigger>
 <Stack spacing={4}>
      <Heading>Edit Event</Heading>
      
      <Field.Root>
        <Field.Label
          fontWeight={'400'}
          fontSize={{base:11,md:14}}
          fontFamily="InterMedium"
          color={'#101928'}
        >
          Title
        </Field.Label>
        <Input 
          ref={titleRef}
          type="text" 
          placeholder="Add title" 
        />
      </Field.Root>
            <Field.Root>
        <Field.Label
          fontWeight={'400'}
          fontSize={{base:11,md:14}}
          fontFamily="InterMedium"
          color={'#101928'}
        >
          Event Link
        </Field.Label>
        <Input 
          ref={linkRef}
          type="text" 
          placeholder="Paste link to event (zoom,google meet, microsoft teams, etc.)" 
        />
      </Field.Root>

      <FileUpload.Root>
        <FileUpload.HiddenInput ref={fileRef} />
        <FileUpload.Trigger asChild>
          <Field.Root>
            <Field.Label
              fontWeight={'400'}
              fontSize={{base:11,md:14}}
              fontFamily="InterMedium"
              color={'#101928'}
            >
              Event image
            </Field.Label>
            <InputGroup endElement={<BiUpload/>}>
              <Input py={6} fontSize={{base:10,md:13}} />
            </InputGroup>
          </Field.Root>
        </FileUpload.Trigger>
        <FileUpload.List />
      </FileUpload.Root>

      <Field.Root>
        <Field.Label
          fontWeight={'400'}
          fontSize={{base:11,md:14}}
          fontFamily="InterMedium"
          color={'#101928'}
        >
          Event Date
        </Field.Label>
        <InputGroup>
          <Input 
            ref={dateRef}
            type="date" 
            py={6} 
            fontSize={{base:10,md:13}} 
          />
        </InputGroup>
      </Field.Root>

      <HStack spacing={6}>
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
            <Input
              ref={startTimeRef}
              type="time"
            />
          </InputGroup>
        </Field.Root>

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
            <Input
              ref={endTimeRef}
              type="time"
            />
          </InputGroup>
        </Field.Root>
      </HStack>

      <Field.Root>
        <Field.Label
          fontWeight={'400'}
          fontSize={{base:11,md:14}}
          fontFamily="InterMedium"
          color={'#101928'}
        >
          Notify Members
        </Field.Label>
        <InputGroup>
          <Input 
            ref={memberRef}
            placeholder="Member email addresses (comma separated)" 
            py={6} 
            fontSize={{base:10,md:13}} 
          />
        </InputGroup>
      </Field.Root>

      <HStack justifyContent={'space-between'}>
        <Button 
          onClick={() => onClose()}
          mr={'auto'}
          bg={'#fff'} 
          color={'#2B362F'} 
          border={"1px solid #2B362F"}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreateEvent}
          py={6}
          rounded={5}
          bg={"#2B362F"}
          color="white"
        >
        {loading||isLoading?<Spinner/>:"Edit"} <IoIosArrowRoundForward/>
        </Button>
      </HStack>
    </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
 
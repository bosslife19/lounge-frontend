import {
  Avatar,
  Box,
  Button,
  Card,
   Flex,
   HStack,
   Image,
   InputGroup,
   Spinner,
   Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
  import { cardData } from "../../../hooks/useData";
 import { BsThreeDots } from "react-icons/bs";
 import like from "../../../assets/streamline_like-1-solid.png"
 import heart from "../../../assets/solar_heart-angle-bold.png"
 import bulb from "../../../assets/fluent-color_lightbulb-filament-20.png"
import { GrMicrophone } from "react-icons/gr";
import { CiImageOn } from "react-icons/ci";
import { PiTelegramLogoLight } from "react-icons/pi";
import userImage from '../../../assets/userImage.jpg'
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

export const RightSide = () => {
// const actions = [
//   { id: 1, image: like },
//   { id: 2, image: heart },
//   { id: 3, image: bulb},
//    ];

const postRef = useRef(null);
     const fileInputRef = useRef(null);
     const [postImage, setPostImage] = useState(null);
     const {userDetails} = useContext(AuthContext);
     let image;
     const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // open file picker
    }
  };
  const {makeRequest, loading,} = useRequest();
  const handlePost = async ()=>{
    if(postImage){
      const formData = new FormData();
      formData.append("file", postImage);
      formData.append("upload_preset", "lounge-platform"); // Replace with your Cloudinary preset
            try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/wokodavid/image/upload",
          formData
        );
        image = res.data.secure_url;
       
      } catch (error) {
        console.error("Image upload failed", error);
        toast.error("Image Upload Failed. Please try again.");
      }
    }

  

    const response = await makeRequest('/upload-post', {
      body: postRef.current?.value,
      image
    })

    if(response.error) return;

    toast.success('Post uploaded successfully');
    postRef.current.value = '';
    setPostImage(null);

  }
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // show preview
      const reader = new FileReader();
      
      reader.readAsDataURL(file);

      // TODO: send `file` to your backend API for upload
      setPostImage(file);
      


    }
  };
  return (
      <Stack w={{base:'100%',md:'50%'}} mb={'auto'}>
     
        <Card.Root
          
          bg={"#fff"}
          shadowColor={"#080F340F"}
          shadow={"sm"}
          rounded={20}
          border={"1px solid #fff"}
          px={4}
         > 
         <Card.Body gap="2" >
               <HStack ml={-5}>
                   <Stack position={"relative"}>
                           <Image
                            src={userImage}
                            alt="Update"
                            boxSize="40px"
                             rounded={20}
                          />
                          </Stack>
                          <Stack >
                          <Text
                            color={"#191919"}
                            fontSize={{ base: 10, md: 14 }}
                            fontFamily="InterBold"
                         >
                           {userDetails?.first_name} {userDetails?.last_name}
                         </Text>
                         <Text
                         mt={-3}
                            color={"#202020"}
                            fontWeight={'normal'}
                            fontSize={{ base: 10, md: 14 }}
                            fontFamily="InterRegular"
                         >
                           {userDetails?.profession}
                         </Text>
                        
                      </Stack>
                </HStack>
                 
                </Card.Body>
                 <Textarea ref={postRef} h={100} pb={300} fontSize={13} autoresize variant="subtle" placeholder="Write your post or question here" />

                     <Button 
                      onClick={handleImageClick}
                     my={4}
                     bg={'#EFF2FC'} 
                     color={'#292D32'} 
                     rounded={20} 
                     fontSize={11} 
                     mr={'auto'}>
                        <CiImageOn />
                         <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                        Add media
                     </Button>
                <Card.Footer borderTop={'1px solid #D4D7E5'}>
                <Button 
                     mt={5}
                     bg={'#000'} 
                     color={'#fff'} 
                     rounded={20} 
                     fontSize={{base:12,md:15}} 
                     px={10}
                     mr={-4}
                      fontFamily="InterRegular"
                     ml={'auto'} onClick={handlePost}>
                       {
                        loading? <Spinner/>:'Post'
                       }
                <PiTelegramLogoLight />               
            </Button>
        </Card.Footer>
      </Card.Root>
 
    </Stack>
   )
}

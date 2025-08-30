import {
  Dialog,
  Portal,
  Stack,
  Field,
  Fieldset,
  Input,
  Button,
  Image,
  HStack,
  InputGroup,
  Textarea,
  Box,
  Heading,
  CloseButton,
} from "@chakra-ui/react";
import logo from "../../../../assets/userImage.jpg";
import tick from "../../../../assets/Verified tick2.png";
import { FaBriefcase } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { RxDotsVertical } from "react-icons/rx";
import { MdAddCircleOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { LuLink2 } from "react-icons/lu";
import { useState } from "react";
 
export const CreateOrganization = ({ isOpen, onClose, onFinish }) => {
  const [members, setMembers] = useState([{ name: "", profession: "" }]);

  const handleAddMember = () => {
    setMembers([...members, { name: "", profession: "" }]);
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            rounded={30}
            bg="#FAFAFA"
            p={4}
           
            maxW={{ base: "sm", md: "xl" }}
          >
            <Fieldset.Root  size={{ base: "sm", md: "lg" }}>
              <Stack  pt={2}>
                <Fieldset.Legend
                  fontWeight={"400"}
                  fontSize={{ base: 15, md: 20 }}
                  fontFamily="InterBold"
                  color={"#1A1A21"}
                >
                  Create Organization
                </Fieldset.Legend>
                 <Dialog.CloseTrigger rounded={30} border={'1px solid #9E9E9E'} asChild>
                    <CloseButton size="xs" color={'#9E9E9E'} />
                </Dialog.CloseTrigger>
              </Stack>

              {/* Profile logo */}
                 <Stack m={'auto'} position={"relative"}>
                  <Image
                    src={logo}
                    alt="Update"
                    boxSize="60px"
                    borderRadius="md"
                    objectFit="cover"
                  />
                  <Button
                    w={"100%"}
                    bg={"transparent"}
                    position={"absolute"}
                    top={"7"}
                    left={"6"}
                  >
                    <Image
                      src={tick}
                      alt="tick"
                      w={19}
                      borderRadius="md"
                      objectFit="cover"
                    />
                  </Button>
                </Stack>
                 

              <Fieldset.Content  pr={3}>
                {/* Name */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Name of Organization
                  </Field.Label>
                  <InputGroup startElement={<CiUser />}>
                    <Input py={6} placeholder="Surname" />
                  </InputGroup>
                </Field.Root>

                {/* Website URL */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Website URL
                  </Field.Label>
                  <InputGroup startElement={<LuLink2 />}>
                    <Input py={6} placeholder="Organization website URL" />
                  </InputGroup>
                </Field.Root>

                {/* Industry */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Industry
                  </Field.Label>
                  <InputGroup startElement={<FaBriefcase />}>
                    <Input py={6} placeholder="Fintech" />
                  </InputGroup>
                </Field.Root>

                {/* Location */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Location
                  </Field.Label>
                  <InputGroup startElement={<IoLocationOutline />}>
                    <Input py={6} placeholder="Select" />
                  </InputGroup>
                </Field.Root>

                {/* Description */}
                <Field.Root>
                  <Field.Label
                    fontWeight={"400"}
                    fontSize={{ base: 12, md: 14 }}
                    fontFamily="InterMedium"
                    color={"#101928"}
                  >
                    Organization Description
                  </Field.Label>
                  <Textarea resize="none" h={150} placeholder="Type here" />
                </Field.Root>

                
                {/* Members */}
                {members.map((member, index) => (
                  <HStack
                    key={index}
                    gap="1"
                    alignItems={"center"}
                    width="full"
                  >
                    <Image
                      src={logo}
                      alt="Member"
                      boxSize="30px"
                      borderRadius="md"
                      objectFit="cover"
                    />
                    <Field.Root>
                      <Input
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        variant="outline"
                      />
                    </Field.Root>
                    <Field.Root>
                      <Input
                        placeholder="profession"
                        value={member.profession}
                        onChange={(e) =>
                          handleMemberChange(index, "profession", e.target.value)
                        }
                        variant="outline"
                      />
                    </Field.Root>
                    <RxDotsVertical cursor="pointer" size={40} />
                  </HStack>
                ))}

                <Button
                border={'1px solid #DFDFDF'}
                  onClick={handleAddMember}
                  fontWeight={"400"}
                  
                  fontSize={{ base: 12, md: 14 }}
                  fontFamily="InterRegular"
                  py={6}
                  my={3}
                  color={"#333333CC"}
                  bg={"#EDEDED"}
                 >
               <MdAddCircleOutline color="#1D1B20" />
                  Add Members
                </Button>
              </Fieldset.Content>

              {/* Submit Button */}
               <HStack  w={'100%'}>
                 <Button onClick={()=>onClose()}
                  py={6} 
                  px={{base:5,md:50}}
                  // w={{base:'35%'}}
                   bg={'#fff'} color={'#2B362F'} border={"1px solid #2B362F"} >
                  Cancel
                 </Button>
                <Button
                  onClick={onFinish}
                  py={6}
                  flex={1}
                  // w={{ base: "100%" }}
                  rounded={5}
                  bg={"#2B362F"}
                  color="white"
                >
                  Request Creation
                </Button>
              </HStack>
            </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

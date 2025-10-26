import {
  Dialog,
  Portal,
  Fieldset,
  Button,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import avatar from "../../../../assets/online-job-interview 1.png";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
export const FirstModal = ({ isOpen, onClose, onStartCreating }) => {
  const { userDetails } = useContext(AuthContext);

  return (
    <Dialog.Root open={isOpen}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={5}>
          <Dialog.Content
            rounded={{ base: 10, md: 30 }}
            bg="#FAFAFA"
            p={4}
            maxW={{ base: "sm", md: "50%" }}
          >
            <Fieldset.Root size={{ base: "sm", md: "lg" }} p={7}>
              <Fieldset.Content alignItems={"center"} justifyContent={"center"}>
                <Image src={avatar} w={{ base: 150, md: 300 }} />
                <Text
                  fontWeight={"400"}
                  pt={{ base: 5, md: 10 }}
                  fontSize={{ base: 20, md: 30, lg: 40 }}
                  fontFamily="LatoRegular"
                  color={"#2B362F"}
                  // lineHeight={"50px"}
                >
                  CREATE PROFILE
                </Text>

                <Text
                  fontWeight={"400"}
                  pt={5}
                  fontSize={{ base: 12, md: 18 }}
                  fontFamily="LatoRegular"
                  color={"#A4A9AE"}
                  maxW={{ base: "100%", md: 450 }}
                  lineHeight={1.5}
                  textAlign={"center"}
                  mb={{ base: 3, md: 0 }}
                >
                  Create your profile in just 5 minutes and start enjoying our
                  professional platform.
                </Text>
              </Fieldset.Content>

              <Button
                mx={"auto"}
                onClick={onStartCreating}
                p={{ base: 5, md: 7 }}
                fontSize={{ base: 15, md: 20 }}
                rounded={10}
                bg={"#2B362F"}
              >
                Start Creating
              </Button>
            </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

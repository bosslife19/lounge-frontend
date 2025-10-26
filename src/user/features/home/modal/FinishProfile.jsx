import {
  Dialog,
  Portal,
  Fieldset,
  Button,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import avatar from "../../../../assets/registration_4745657 1.png";
export const FinishProfile = ({ isOpen, onClose }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={5}>
          <Dialog.Content
            rounded={{ base: 10, md: 30 }}
            bg="#FAFAFA"
            p={4}
            maxW={{ base: "sm", md: "50%" }}
          >
            <Fieldset.Root
              size={{ base: "sm", md: "lg" }}
              p={{ base: 2, lg: 7 }}
            >
              <Fieldset.Content alignItems={"center"} justifyContent={"center"}>
                <Image src={avatar} w={{ base: 100, lg: 200 }} />
                <Text
                  fontWeight={"400"}
                  pt={{ base: 5, md: 10 }}
                  fontSize={{ base: 20, md: 40 }}
                  fontFamily="LatoRegular"
                  color={"#2B362F"}
                >
                  Congratulations!
                </Text>

                <Text
                  fontWeight={"400"}
                  pt={5}
                  mb={{ base: "15px", lg: "0px" }}
                  fontSize={{ base: "12px", lg: 18 }}
                  fontFamily="LatoRegular"
                  color={"#A4A9AE"}
                  maxW={{ base: "100%", md: 450 }}
                  lineHeight={1.5}
                  textAlign={"center"}
                >
                  You have successfully created your profile here with Lounge.
                  Start enjoying our services.
                </Text>
              </Fieldset.Content>
              {/* Button */}
              <Button
                mx={{ base: "0px", lg: "auto" }}
                onClick={onClose}
                p={7}
                fontSize={{ base: 17, md: 18 }}
                rounded={10}
                fontFamily="LatoRegular"
                bg={"#2B362F"}
              >
                Back to Home
              </Button>
            </Fieldset.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

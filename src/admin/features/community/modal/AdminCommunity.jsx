import { Dialog, Portal, Fieldset, CloseButton } from "@chakra-ui/react";
import { AdminRightSide } from "../RightSide";
// import { AdminRightSide } from "../RightSide";

export const AdminCreateCommunityModal = ({
  isOpen,
  onClose,
  setAdminPosts,
  adminPosts,
}) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) onClose(); // closes when backdrop is clicked or ESC is pressed
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner px={5}>
          <Dialog.Content
            rounded={30}
            // bg="#FAFAFA"
            // p={4}
            maxW={{ base: "100%", md: "50%" }}
          >
            {/* <Dialog.CloseTrigger
              rounded={30}
              border={"1px solid #9E9E9E"}
              // asChild
              p={20}
              // zIndex={1000}
            >
              <CloseButton zIndex={-10} size={9} p={1} color={"#9E9E9E"} />
            </Dialog.CloseTrigger> */}

            <AdminRightSide posts={adminPosts} setPosts={setAdminPosts} />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";

export const Checkboxs = ({ checked, setChecked }) => {
  return (
    <Checkbox.Root
      checked={checked}
      size={{ base: "xs", md: "sm" }}
      onCheckedChange={(e) => setChecked(!!e.checked)}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label
        fontWeight={"400"}
        fontSize={{ base: "9px", md: 14 }}
        fontFamily="InterMedium"
        color={"#101928"}
      >
        This is a free mentoring service
      </Checkbox.Label>
    </Checkbox.Root>
  );
};

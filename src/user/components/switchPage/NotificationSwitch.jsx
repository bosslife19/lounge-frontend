import { Switch } from "@chakra-ui/react";
import { useState } from "react";

export const NotificationSwitch = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Switch.Root
      size={{ base: "xs", md: "sm" }}
      checked={checked}
      onCheckedChange={(e) => setChecked(e.checked)}
    >
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label />
    </Switch.Root>
  );
};

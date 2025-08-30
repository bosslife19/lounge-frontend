"use client"

import {
  Flex,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { MdBusinessCenter } from "react-icons/md";
import { RiCalendarEventFill } from "react-icons/ri";

export const Dropdown = ({ icon, frameworks, iconed }) => {
  return (
    <Select.Root collection={frameworks} size="sm">
      <Select.HiddenSelect />

      {/* Trigger */}
      <Select.Control
        py={2}
        rounded={12}
        border="1px solid #CCCCCC"
        cursor="pointer"
        _focusWithin={{ borderColor: "blue.400" }}
      >
        <Select.Trigger border="none" outline="none" px={2} py={1}>
          <Flex align="center" gap={2}>
            {iconed && <RiCalendarEventFill />}
            {icon && <MdBusinessCenter />}
            <Select.ValueText
              fontWeight="medium"
              color="#9E9E9E"
              placeholder="Select"
            />
          </Flex>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      {/* Dropdown menu */}
      <Portal>
        <Select.Positioner>
          <Select.Content
            bg="white"
            border="1px solid #E2E8F0"
            rounded="md"
            shadow="sm"
            zIndex={2000}
          >
            {frameworks.items.map((framework) => (
              <Select.Item
                key={framework.value}
                item={framework}
                px={3}
                py={2}
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
              >
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

"use client";

import { Flex, Portal, Select } from "@chakra-ui/react";
import { MdAccountCircle, MdBusinessCenter } from "react-icons/md";

export const Dropdown = ({ icon, icons, frameworks, color, filteredResults, setFilteredResults }) => {
  
 const handleChange = (value) => {

      // filter cards based on category
      const filtered = filteredResults.filter(
        (card) => card.category.toLowerCase() === value.value[0].toLowerCase()
      );
      setFilteredResults(filtered);
    
  };
  return (
    <Select.Root collection={frameworks} size="xs" width="auto" minW="140px"  onValueChange={handleChange}>
      <Select.HiddenSelect />
      <Select.Control
         py={1}
        rounded={12}
        bg={color}
        border={"1px solid #EBEBEB"}
      >
        <Select.Trigger border={"none"} outline={"none"}>
          <Flex gap={2} w="full" align="center">
            {icon && <MdBusinessCenter />}
            {icons && <MdAccountCircle />}
            <Select.ValueText
              fontWeight="medium"
              color="#9E9E9E"
              placeholder="Select"
              textAlign="left"
              flex="1"
              whiteSpace="normal"
              overflow="visible"
              wordBreak="break-word"
            />
          </Flex>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
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

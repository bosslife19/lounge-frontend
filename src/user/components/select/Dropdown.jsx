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
<<<<<<< HEAD
    <Select.Root collection={frameworks} size="xs" width="auto" minW="140px"  onValueChange={handleChange}>
      <Select.HiddenSelect />
      <Select.Control
         py={1}
        rounded={12}
=======
    <Select.Root
      collection={frameworks}
      size="xs"
      width="auto"
      minW={{ base: "100%", md: "140px" }}
    >
      <Select.HiddenSelect />
      <Select.Control
        py={{ base: 0, md: 2 }}
        rounded={{ base: 5, md: 12 }}
>>>>>>> 5a9c440e2f60e0b1db4f4ebf1e29f002e9fd7a2c
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

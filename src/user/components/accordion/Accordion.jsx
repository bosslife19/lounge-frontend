import { Accordion, Span } from "@chakra-ui/react";

export const Accordions = () => {
  return (
    <Accordion.Root multiple defaultValue={["b"]}>
      {items.map((item, index) => (
        <Accordion.Item
          shadow={"sm"}
          shadowColor={"#00000012"}
          rounded={10}
          my={4}
          px={3}
          bg={"#fff"}
          key={index}
          value={item.value}
        >
          <Accordion.ItemTrigger>
            <Span
              flex="1"
              py={2}
              fontFamily="InterBold"
              fontSize={{ base: "11px", md: 18 }}
              fontWeight={"semibold"}
              color={"#333333"}
            >
              {item.title}
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody
              fontFamily="InterRegular"
              fontWeight={"normal"}
              fontSize={{ base: "9px", md: 14 }}
              color={"#333333CC"}
              py={{ base: 1, md: 3 }}
            >
              {item.text}
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

const items = [
  {
    value: "a",
    title: "What is UX design?",
    text: "UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.",
  },
  {
    value: "b",
    title: "What are the key principles of UX design?",
    text: "Some value 2...",
  },
  {
    value: "c",
    title: "What are the key principles of UX design?",
    text: "Some value 3...",
  },
  {
    value: "d",
    title: "What are the key principles of UX design?",
    text: "Some value 3...",
  },
  {
    value: "e",
    title: "What are the key principles of UX design?",
    text: "Some value 3...",
  },
];

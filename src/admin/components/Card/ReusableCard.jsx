import { Avatar, Box, Card, HStack, Stack, Text } from "@chakra-ui/react";

export const ReusableCard = ({
  arrows,
  description,
  title,
  image,
  rate,
  current,
  timestamp,
  color,
}) => {
  return (
    <Card.Root width="100%" rounded={10}>
      <Card.Body gap="0">
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Stack>
            <Card.Title
              mt="0"
              fontFamily={"nunitoRegular"}
              fontSize={{ base: 13, md: 16 }}
              color={"#606060"}
            >
              {title}
            </Card.Title>
            <Card.Description
              fontFamily={"nunitoBold"}
              fontSize={{ base: 18, md: 28 }}
              color={"#202224"}
            >
              {description}
            </Card.Description>
          </Stack>
          <Avatar.Root
            bg={"transparent"}
            w={{ base: "30px", md: "60px" }}
            h={{ base: "30px", md: "60px" }}
            rounded={23}
          >
            <Avatar.Image src={image} />
            <Avatar.Fallback name={title} />
          </Avatar.Root>
        </HStack>
      </Card.Body>
      <Card.Footer
        fontSize={{ base: 12, md: 15 }}
        fontFamily={"nunitoSemiBold"}
        color={"#606060"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <Box color={color}>{arrows}</Box> <Text color={color}>{rate}</Text>{" "}
        <Text>{current}</Text> from <Text>{timestamp} </Text>
      </Card.Footer>
    </Card.Root>
  );
};

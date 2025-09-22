import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import like from "../../../../assets/streamline_like-1-solid.png";
import heart from "../../../../assets/solar_heart-angle-bold.png";
import bulb from "../../../../assets/fluent-color_lightbulb-filament-20.png";
import globe from "../../../../assets/Globe.png";
import { cardData } from "../../../../hooks/useData";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";

export const SettingsPosts = () => {
  const actions = [
    { id: 1, image: like },
    { id: 2, image: heart },
    { id: 3, image: bulb },
  ];
  return (
    <Stack
      px={6}
      py={{ base: 1, md: 4 }}
      w={{ base: "100%", md: 600 }}
      mb={"auto"}
      gap={7}
    >
      {cardData.map((card, idx) => (
        <Card.Root
          key={idx}
          bg={"#fff"}
          shadowColor={"#080F340F"}
          shadow={"sm"}
          size={{ base: "sm", md: "md" }}
          roundedBottom={20}
          border={"1px solid #fff"}
        >
          <Card.Body gap="2">
            <Flex alignItems={"flex-start"} justifyContent={"space-between"}>
              <HStack>
                <Stack position={"relative"}>
                  <Image
                    src={card.eImage}
                    alt="Update"
                    boxSize={{ base: "30px", md: "50px" }}
                    rounded={20}
                  />
                </Stack>
                <Stack>
                  <Text
                    color={"#191919"}
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterBold"
                  >
                    John
                  </Text>
                  <Text
                    mt={-3}
                    color={"#202020"}
                    fontSize={{ base: "10px", md: 14 }}
                    fontFamily="InterMedium"
                  >
                    Banker
                  </Text>
                  <HStack mt={"-2"} alignItems={"center"}>
                    <Text
                      color={"#626262"}
                      fontFamily="InterRegular"
                      fontSize={{ base: "7px", md: 14 }}
                      //    a
                    >
                      20h
                    </Text>
                    <Image src={globe} w={{ base: 2, md: 4 }} />
                  </HStack>
                </Stack>
              </HStack>
              {/* <Button color={"#212121"} bg={"transparent"}>
                <BsThreeDots />
              </Button> */}
            </Flex>

            <Text
              color={"#070416"}
              fontSize={{ base: "11px", md: 16 }}
              fontFamily="InterRegular"
            >
              {card.desc3}
            </Text>
            <Text
              color={"#0966C2"}
              fontSize={{ base: "9px", md: 14 }}
              fontFamily="InterMedium"
            >
              #hastag #hastag #hashtag
            </Text>
          </Card.Body>
          <Image
            src={card.eImage}
            boxSize={"100%"}
            h={{ base: 120, md: 220 }}
            fit="cover"
          />
          <HStack
            justifyContent={"flex-start"}
            alignItems={"center"}
            px={1}
            pt={{ base: 1, md: 3 }}
            gap={4}
          >
            <Text
              fontSize={{ base: 10, md: 15 }}
              style={{ position: "relative", left: "3%" }}
            >
              {/* {card.likes?.length} */}
            </Text>

            <Button
              color={"#212121"}
              p={0}
              fontSize={{ base: 10, md: 15 }}
              bg={"transparent"}
              // onClick={() => likePost(card.id)}
              size={{ base: "xs", md: "sm" }}
            >
              <AiOutlineLike />
            </Button>
            <Button
              // onClick={() => toggleComments(card.id)}
              color={"#212121"}
              p={0}
              bg={"transparent"}
              size={{ base: "xs", md: "sm" }}
            >
              <BiMessageRoundedDetail />

              <Text
                color={"#707070"}
                fontSize={{ base: 10, md: 14 }}
                cursor="pointer"
                // ml={-2}
              >
                {/* {card.comments?.length || 0} Comments */}
              </Text>
            </Button>
          </HStack>
          <Card.Footer borderTop={"1px solid #E9E5DF"} mt={1}></Card.Footer>
        </Card.Root>
      ))}
    </Stack>
  );
};

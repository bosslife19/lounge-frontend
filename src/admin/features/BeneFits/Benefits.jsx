import {
  Avatar,
  Box,
  Button,
  Card,
  createListCollection,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  Menu,
  Portal,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { cardData } from "../../../hooks/useData";
import coins from "../../../assets/coingold.png";
import { BiDotsVerticalRounded, BiPencil, BiTrash } from "react-icons/bi";
import { FiPlusCircle } from "react-icons/fi";
import { CreateBenefits } from "./modal/CreateBenefit";
import { EditBenefits } from "./modal/EditBenefits";
import axiosClient from "../../../axiosClient";
import ConfirmDeleteModal from "../../../components/ConfirmDelete";
import { toast } from "react-toastify";
import { SoapDispenserDroplet } from "lucide-react";
export const BenefitsPoints = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [benefits, setBenefits] = useState([])
  const [benefitId, setBenefitId] = useState(0)
  const [benefitTitle, setBenefitTitle] = useState('');
  const [benefitPoints, setBenefitPoints] = useState('');
  const [benefitCompany, setBenefitCompany] = useState('');
const [refresh, setRefresh] = useState(false)
const [confirmOpen, setConfirmOpen] = useState(false)
const [loading, setLoading] = useState(false)
      const handleConfirm = async (benefitId) => {
     
      
        try {
          setLoading(true);
          
          await axiosClient.delete(`/benefit/${benefitId}`);
          // Remove the deleted post from the state
          setBenefits(benefits.filter((benefit) => benefit.id !== benefitId));
          setLoading(false)
          toast.success("Benefit deleted successfully");
          setConfirmOpen(false);
        } catch (error) {
          console.error("Error deleting benefit:", error);
          setLoading(false)
          alert("Failed to delete the benefit. Please try again.");
        }
      
    }
    const handleDeletePost = async (postId) => {
    setBenefitId(postId)
    setConfirmOpen(true);

  };
  const handleCardClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(()=>{
    const getBenefits = async ()=>{
      const res = await axiosClient.get('/benefits');

      setBenefits(res.data.benefits)
    }
    getBenefits()
  }, [refresh])

  const frameworks = createListCollection({
    items: [
      { label: "Experience", value: "Experience" },
      { label: "finances", value: "finances" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });

  const [isOpened, setIsOpened] = useState(false);

  const handleAction = () => {
    setIsOpened(true);
  };

  const handleClosed = () => {
    setIsOpened(false);
  };
  return (
    <Box bg={"#FDFDFD"} h={"100%"} p={3}>
      <Button
        mb={4}
        position={"absolute"}
        right={0}
        top={5}
        size={{ base: "xs", md: "sm" }}
        border={`1px solid #333`}
        rounded={20}
        color={"#333"}
        bg="#fff"
        onClick={handleCardClick}
        _hover={{ bg: "#f0f0f0" }}
      >
        <HStack spacing={2}>
          <FiPlusCircle size={10} />
          <Text
            fontSize={{ base: "9px", md: 13 }}
            fontWeight="400"
            fontFamily="OutfitRegular"
          >
            Add Benefits
          </Text>
        </HStack>
      </Button>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6} gap={5}>
        {benefits?.map((card, idx) => (
          <Card.Root
            key={idx}
            bg={"#fff"}
            shadowColor={"#080F340F"}
            shadow={"sm"}
            rounded={20}
            border={"1px solid #fff"}
          >
            <Card.Body gap="2">
              <Menu.Root>
                <Menu.Trigger position={"absolute"} right={5} top={5} asChild>
                  <Button
                    fontSize={{ base: "10px", md: "14px" }}
                    p={0}
                    rounded={30}
                    bg={"#fff"}
                    size="sm"
                  >
                    <BiDotsVerticalRounded color="#212121" size={10} />
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item
                        fontSize={{ base: "10px", md: "14px" }}
                        onClick={() => {
                          setBenefitId(card.id)
                          setBenefitTitle(card.title)
                          setBenefitCompany(card.company)
                          setBenefitPoints(card.points_required)
                          handleAction()
                        }}
                        value="new-txt"
                      >
                        <BiPencil />
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        fontSize={{ base: "10px", md: "14px" }}
                        value="new-file"
                        onClick={()=>handleDeletePost(card.id)}
                      >
                        <BiTrash />
                        Delete
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
              <Text
                color={"#070416"}
                fontSize={{ base: "12px", md: "14px" }}
                fontFamily="InterRegular"
              >
                {card.title}
              </Text>

              <Card.Title
                mt="2"
                color={"#070416"}
                lineHeight={"20px"}
                fontSize={{ base: "10px", md: "14px" }}
                fontFamily="InterBold"
              >
                {card.company}
              </Card.Title>
              <HStack
                bg={"#BFBFBF"}
                mr={"auto"}
                py={2}
                px={3}
                borderRadius={20}
                alignItems={"center"}
              >
                <Image src={coins} w={5} h={5} />
                <Text fontSize={{ base: "10px", md: "14px" }} color={"#fff"}>
                  {card.points_required}
                </Text>
              </HStack>
            </Card.Body>
          </Card.Root>
        ))}
        {
          benefits.length <=0 && <Text>No Benefits Yet</Text>
        }
      </SimpleGrid>

      <CreateBenefits isOpen={isOpen} onClose={handleClose} setBenefits={setBenefits} />

      <EditBenefits isOpen={isOpened} onClose={handleClosed} 
      setBenefits={setBenefits} benefitId={benefitId} benefitTitle={benefitTitle}
      benefitPoints={benefitPoints}
      benefitCompany={benefitCompany}
      setRefresh={setRefresh}
      
      />
      <ConfirmDeleteModal onClose={()=>setConfirmOpen(false)} onConfirm={()=>handleConfirm(benefitId)} isOpen={confirmOpen} loading={loading}/>
    </Box>
  );
};

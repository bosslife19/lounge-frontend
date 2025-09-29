import { Box, Menu, Button, Portal, HStack, Text } from "@chakra-ui/react";
import { BottomTable } from "../../components/BottomTable";
import { useState } from "react";
import img from "../../../assets/userImage.jpg";
import { IoIosArrowDown, IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const RewardReq = () => {
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowActions, setRowActions] = useState({});
  const navigate = useNavigate();

  const tableData = [
    {
      UserId: "#38734",
      Name: "Jamal",
      image: img,
      Profession: "Web Developer",
      Experience: "3",
      Timestamp: "09/08/24, 12:00pm",
    },
    {
      UserId: "#12233",
      Name: "Lydia",
      image: img,
      Profession: "UI Designer",
      Experience: "5",
      Timestamp: "09/08/24, 12:10pm",
    },
    {
      UserId: "#12234",
      Name: "Alice",
      image: img,
      Profession: "Backend Dev",
      Experience: "4",
      Timestamp: "09/08/24, 12:20pm",
    },
    {
      UserId: "#12235",
      Name: "Bob",
      image: img,
      Profession: "Frontend Dev",
      Experience: "2",
      Timestamp: "09/08/24, 12:30pm",
    },
    {
      UserId: "#12236",
      Name: "Charlie",
      image: img,
      Profession: "UI Designer",
      Experience: "5",
      Timestamp: "09/08/24, 12:40pm",
    },
  ];

  const handleSelect = (userId, label, color, icon = null) => {
    setRowActions((prev) => ({ ...prev, [userId]: { label, color, icon } }));
  };

  const dataTable = {
    col: {
      col_1: { col_1_1: "User ID" },
      col_2: { col_2_1: "Name & Image" },
      col_3: { col_3_1: "Profession" },
      col_4: { col_4_1: "Experience" },
      col_5: { col_5_1: "Last Visited" },
      col_6: { col_6_1: "Action" },
    },
    row: tableData.map((row, index) => {
      const selected = rowActions[row.UserId] || {
        label: "Action",
        color: "gray.600",
        icon: null,
      };
      const uniqueKey = `${row.UserId}-${index}`;
      return {
        row_0: uniqueKey,
        row_1: { row_1_1: row.UserId },
        row_2: { row_2_1: row.image, row_2_2: row.Name },
        row_3: { row_3_1: row.Profession },
        row_4: { row_4_1: row.Experience },
        row_5: { row_5_1: row.Timestamp },
        row_6: {
          row_6_1: (
            <Menu.Root key={uniqueKey}>
              <Menu.Trigger asChild>
                <Button
                  size={{ base: "10", md: "sm" }}
                  border={`1px solid ${selected.color}`}
                  rounded={{ base: 8, md: 20 }}
                  p={1}
                  mr={1}
                  variant="outline"
                  color={selected.color}
                >
                  <HStack spacing={1}>
                    {selected.icon && selected.icon}
                    <Text
                      fontSize={{ base: "10px", md: "13px" }}
                      fontWeight="400"
                      fontFamily="OutfitRegular"
                    >
                      {selected.label}
                    </Text>
                    {!selected.icon && <IoIosArrowDown />}
                  </HStack>
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content cursor="pointer" rounded={{ base: 9, md: 20 }}>
                    <Menu.Item
                      color="#333333CC"
                      fontSize={{ base: "10px", md: "13px" }}
                      onClick={() =>
                        handleSelect(
                          row.UserId,
                          "Approve",
                          "green.500",
                          <IoMdCheckboxOutline boxSize={3} />
                        )
                      }
                    >
                      <IoMdCheckboxOutline /> Approve
                    </Menu.Item>
                    {/* <Menu.Item color="#333333CC" onClick={() => navigate(`/users/${row.UserId}`)}>View Details</Menu.Item> */}
                    <Menu.Item
                      color="#333333CC"
                      fontSize={{ base: "10px", md: "13px" }}
                      onClick={() =>
                        handleSelect(
                          row.UserId,
                          "Decline",
                          "red.500",
                          <MdOutlineCancel boxSize={3} />
                        )
                      }
                    >
                      <MdOutlineCancel /> Decline
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          ),
        },
      };
    }),
  };

  return (
    <Box bg="#FDFDFD" p={{ base: 0, md: 2 }}>
      <BottomTable
        dataTable={dataTable}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </Box>
  );
};

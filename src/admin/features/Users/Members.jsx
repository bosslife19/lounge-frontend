import { Box, Menu, Button, Portal, HStack, Text } from "@chakra-ui/react";
import { BottomTable } from "../../components/BottomTable";
import { useEffect, useMemo, useState } from "react";
import img from "../../../assets/userImage.jpg";
import { IoIosArrowDown, IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { CreateNewUser } from "./modal/CreateUser";
import axiosClient from "../../../axiosClient";
import { formatTime } from "../../../lib/formatTime";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";

export const Members = () => {
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const { makeRequest } = useRequest();
  const handleAddUser = () => {
    setIsOpen(true);
  };
  const handleDelete = async (id) => {
    const res = await makeRequest("/delete-user", { userId: id });
    if (res.error) return;
    setUsers((prev) => prev.filter((item) => item.id !== id));
    toast.success("User Removed successfully");
  };
  const handleClose = () => {
    setIsOpen(false);
  };
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
  const navigate = useNavigate();
  const [rowActions, setRowActions] = useState({});

  const [isOpen, setIsOpen] = useState(false);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const res = await axiosClient.get("/users");

      setUsers(res.data.users);
    };
    getUsers();
  }, []);

  const handleSelect = (userId, label, color, icon = null) => {
    setRowActions((prev) => ({ ...prev, [userId]: { label, color, icon } }));
  };

  const dataTable = {
    col: {
      col_1: { col_1_1: "User ID" },
      col_2: { col_2_1: "Name & Logo" },
      col_3: { col_3_1: "Email" },
      col_4: { col_4_1: "Profession" },
      col_5: { col_5_1: "Years of Experience" },
      col_6: { col_6_1: "Action" },
    },
    row:
      users.length > 0 ? (
        users.map((row, index) => {
          const selected = rowActions[row.id] || {
            label: "Action",
            color: "gray.600",
            icon: null,
          };
          const uniqueKey = `${row.id}-${index}`;
          return {
            row_0: uniqueKey,
            row_1: { row_1_1: row.id },
            row_2: { row_2_1: row?.profile_picture || img, row_2_2: row?.name },
            row_3: { row_3_1: row.email },
            row_4: { row_4_1: <Text>{row.profession}</Text> },
            row_5: { row_5_1: row.years_of_experience },
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
                      <Menu.Content
                        cursor="pointer"
                        rounded={{ base: 9, md: 20 }}
                      >
                        {/* <Menu.Item
                      color="#333333CC"
                      onClick={() => handleSelect(row.UserId, "Approve", "green.500", <IoMdCheckboxOutline boxSize={3} />)}
                    > 
                      <IoMdCheckboxOutline /> Remove
                    </Menu.Item> */}
                        {/* <Menu.Item color="#333333CC" onClick={() => navigate(`/admin/organization-details`)}>View Details</Menu.Item> */}
                        <Menu.Item
                          color="#333333CC"
                          fontSize={{ base: "10px", md: "13px" }}
                          onClick={() => handleDelete(row.id)}
                        >
                          <MdOutlineCancel /> Remove
                        </Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              ),
            },
          };
        })
      ) : (
        <Text textAlign={"center"} fontSize={{ base: "10px", md: "13px" }}>
          No Organizations Yet
        </Text>
      ),
  };

  return (
    <Box w={"full"} bg="#FDFDFD" py={{ base: 1, md: 6 }}>
      {/* <Button
          mb={4}
           position={'absolute'}
           right={0}
           top={5}
              size="sm"
              border={`1px solid #333`}
              rounded={20}
              color={"#333"}
              bg="#fff"
              onClick={handleAddUser}
              _hover={{ bg: "#f0f0f0" }}
            >
              <HStack spacing={2}>
                <FaUserPlus size={12} />
                <Text
                  fontSize={{base:10,md:13}}
                  fontWeight="400"
                  fontFamily="OutfitRegular"
                >
                  Add New User
                </Text>
              </HStack>
            </Button> */}

      <CreateNewUser isOpen={isOpen} onClose={handleClose} />
      {users.length > 0 ? (
        <BottomTable
          dataTable={dataTable}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

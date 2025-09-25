import { Box, Menu, Button, Portal, HStack, Text } from "@chakra-ui/react";
import { BottomTable } from "../../components/BottomTable";
import { useEffect, useMemo, useState } from "react";
import img from "../../../assets/userImage.jpg";
import { IoIosArrowDown, IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axiosClient";

import { formatTime } from "../../../lib/formatTime";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";

export const NewOrganization = () => {
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowActions, setRowActions] = useState({});
  const { makeRequest } = useRequest();
  const [organizationRequests, setOrganizationRequests] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const getRequests = async () => {
      const res = await axiosClient.get("/organization-requests");

      setOrganizationRequests(res.data.requests);
    };
    getRequests();
  }, []);
  const handleApprove = async (id) => {
    const res = await makeRequest("/approve-organization-request", {
      organizationId: id,
      approved: true,
    });
    if (res.response.status) {
      toast.success("Organization request approved successfully");
    }
    if (res.error) return;
  };

  const handleSelect = (userId, label, color, icon = null) => {
    setRowActions((prev) => ({ ...prev, [userId]: { label, color, icon } }));
  };

  const dataTable = {
    col: {
      col_1: { col_1_1: "ID" },
      col_2: { col_2_1: "Organization Name/Logo" },
      col_3: { col_3_1: "Organization Website" },
      col_4: { col_4_1: "Organization Email" },
      col_5: { col_5_1: "Time of Request" },
      col_6: { col_6_1: "Action" },
    },
    row: organizationRequests?.map((row, index) => {
      const selected = rowActions[row.id] || {
        label: "Action",
        color: "gray.600",
        icon: null,
      };
      const uniqueKey = `${row.id}-${index}`;
      return {
        row_0: uniqueKey,
        row_1: { row_1_1: row.id },
        row_2: { row_2_1: row.logo, row_2_2: row.name },
        row_3: { row_3_1: row.website },
        row_4: { row_4_1: row.email },
        row_5: { row_5_1: formatTime(row.created_at) },
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
                      cursor="pointer"
                      onClick={() => handleApprove(row.id)}
                    >
                      <IoMdCheckboxOutline /> Approve
                    </Menu.Item>
                    {/* <Menu.Item
                      color="#333333CC"
                      onClick={() => navigate(`/users/${row.UserId}`)}
                    >
                      View Details
                    </Menu.Item> */}
                    <Menu.Item
                      color="#333333CC"
                      fontSize={{ base: "10px", md: "13px" }}
                      cursor={"pointer"}
                      onClick={() =>
                        handleSelect(
                          row.id,
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
    <Box bg="#F5F6FA" p={{ base: 0, md: 2 }}>
      {organizationRequests.length > 0 ? (
        <BottomTable
          dataTable={dataTable}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
        />
      ) : (
        <Text>No Organization Requests yet</Text>
      )}
    </Box>
  );
};

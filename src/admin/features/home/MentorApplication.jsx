import { Box, Menu, Button, Portal, HStack, Text } from "@chakra-ui/react";
import { BottomTable } from "../../components/BottomTable";
import { useState } from "react";
import img from "../../../assets/userImage.jpg";
import { IoIosArrowDown, IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../../../axiosClient";
import { formatTime } from "../../../lib/formatTime";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";

export const MentorApplication = () => {
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowActions, setRowActions] = useState({});
  const navigate = useNavigate();
  const [mentorRequests, setMentorRequests] = useState([]);
  const {makeRequest} = useRequest();

  useEffect(()=>{
    const getRequests = async()=>{
      const res = await axiosClient.get('/get-all-mentor-requests');


      setMentorRequests(res.data.requests);
    }
    getRequests();
  },[])
 
const handleApprove = async (id)=>{
  const res = await makeRequest('/approve-mentor', {approved:true,requestId: id});
  if(res.response.status){
    toast.success('Mentorship request approved successfully');
   
     handleSelect(row.id, "Approve", "green.500", <IoMdCheckboxOutline boxSize={3} />)
     setMentorRequests(mentorRequests.filter(item=>item.id !== id));
  }
  if(res.error) return;
  
}
const handleReject = async (id)=>{
  const res = await makeRequest('/approve-mentor', {approved:false,requestId: id});
  if(res.response.status){
    toast.success('Mentorship request rejected');
    
    
     setMentorRequests(mentorRequests.filter(item=>item.id !== id));
  }
  if(res.error) return;
  
}

  const handleSelect = (userId, label, color, icon = null) => {
    setRowActions((prev) => ({ ...prev, [userId]: { label, color, icon } }));
  };

  const dataTable = {
    col: {
      col_1: { col_1_1: "User ID" },
      col_2: { col_2_1: "Name & Image" },
      col_3: { col_3_1: "Profession" },
      col_4: { col_4_1: "Years of Experience" },
      col_5: { col_5_1: "Last Visited" },
      col_6: { col_6_1: "Action" },
    },
    row: mentorRequests?.map((row, index) => {
      const selected = rowActions[row.id] || { label: "Action", color: "gray.600", icon: null };
      const uniqueKey = `${row.id}-${index}`;
      return {
        row_0: uniqueKey,
        row_1: { row_1_1: row.id },
        row_2: { row_2_1: row.user.profile_picture, row_2_2: row.name },
        row_3: { row_3_1: row.user.profession },
        row_4: { row_4_1: row.user.years_of_experience },
        row_5: { row_5_1: formatTime(row.user.last_visited) },
        row_6: {
          row_6_1: (
            <Menu.Root key={uniqueKey}>
              <Menu.Trigger asChild>
                <Button
                  size="sm"
                  border={`1px solid ${selected.color}`}
                  rounded={20}
                  variant="outline"
                  color={selected.color}
                >
                  <HStack spacing={1}>
                    {selected.icon && selected.icon}
                    <Text fontSize="13px" fontWeight="400" fontFamily="OutfitRegular">{selected.label}</Text>
                    {!selected.icon && <IoIosArrowDown />}
                  </HStack>
                </Button>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content cursor="pointer" rounded={20}>
                    <Menu.Item
                      color="#333333CC"
                      cursor='pointer'
                      onClick={()=>handleApprove(row.id)}
                    >
                      <IoMdCheckboxOutline /> Approve
                    </Menu.Item>
                    {/* <Menu.Item  color="#333333CC" onClick={() => navigate(`/users/${row.UserId}`)}>View Details</Menu.Item> */}
                    <Menu.Item 
                      color="#333333CC"
                      cursor='pointer'
                      onClick={() => handleReject(row.id)}
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
    <Box w={'full'} bg="#F5F6FA" p={6}>
      {
        mentorRequests.length > 0 ?
              <BottomTable
        dataTable={dataTable}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />:
      <Text>No Mentor Applications yet</Text>
      }

    </Box>
  );
};

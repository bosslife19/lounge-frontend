
import { Box, Table, Image, Text, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Pagination from "./pagination/adminpagination";
import React from "react";

const MotionTbody = motion(Table.Body);
const MotionTr = motion(Table.Row);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const rowAnimation = { 
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const BottomTable = ({ dataTable, pageSize, currentPage, setCurrentPage, setPageSize }) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRows = dataTable.row.slice(startIndex, endIndex);

   return (
    <Box bg="#fff" px={0} rounded="lg" border="1px solid #CECECE" overflowX="auto">
      <Table.Root size="sm" striped>
        <Table.Header>
          <Table.Row bg="#fff">
            {Object.keys(dataTable.col).map((colKey) => (
              <Table.ColumnHeader
                key={colKey}
                fontSize="13px"
                fontWeight="400"
                letterSpacing="1%"
                color="#49454FCC"
                borderBottom="1px solid #CECECE"
                fontFamily="OutfitRegular"
                py="20px"
                bg="#fff"
                textAlign="start"
                whiteSpace={'nowrap'}
              >
                {dataTable.col[colKey][`${colKey}_1`]}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>

        <MotionTbody initial="hidden" animate="visible" variants={containerVariants}>
          {paginatedRows.map((row, rowIndex) => (
            <MotionTr
              key={row.row_0}
              variants={rowAnimation}
              _hover={{ bg: "gray.50" }}
              bg={rowIndex % 2 === 0 ? "gray.100" : "white"}
            >
              {Object.keys(dataTable.col).map((colKey, colIndex) => {
                const cell = row[`row_${colIndex + 1}`];

                if (cell?.row_2_1 && cell?.row_2_2) {
                  return (
                    <Table.Cell
                      key={`${row.row_0}-${colKey}`}
                      fontSize={["11px", "13px"]}
                      fontWeight="500"
                      color="#384250"
                    >
                      <HStack spacing={2}>
                        <Image src={cell.row_2_1} alt={cell.row_2_2} boxSize="20px" rounded="full" />
                        <Text>{cell.row_2_2}</Text>
                      </HStack>
                    </Table.Cell>
                  );
                }

                    return (
  <Table.Cell
    key={`${row.row_0}-${colKey}`}
    fontSize={["11px", "13px"]}
    fontWeight="400"
    letterSpacing="1%"
    color="#222222E5"
    fontFamily="OutfitRegular"
  >
                   {React.isValidElement(cell?.[`row_${colIndex + 1}_1`])
                    ? cell?.[`row_${colIndex + 1}_1`]
                  : typeof cell?.[`row_${colIndex + 1}_1`] === "string" ||
                  typeof cell?.[`row_${colIndex + 1}_1`] === "number"
                 ? cell?.[`row_${colIndex + 1}_1`]
                 : "-"}
                 </Table.Cell>);

              })}
            </MotionTr>
          ))}
        </MotionTbody>
      </Table.Root>

      <Pagination
        count={dataTable.row.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </Box>
  );
};

import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { SeverityPill } from "../severity-pill";

export const ListResults = ({
  data = [],
  onClickUser,
  dataHeader = [],
  ...rest
}) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectOne = (event, id) => {
    setSelectedCustomerIds(id);
    onClickUser(id);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox"></TableCell> */}
                {dataHeader.map((header) => (
                  <TableCell>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.slice(0, limit)?.map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  selected={selectedCustomerIds.indexOf(item.id) !== -1}
                  onClick={(event) => handleSelectOne(event, item.id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(item.id) !== -1}
                      onChange={(event) => handleSelectOne(event, item.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      {item?.avatar && (
                        <Avatar src={item.avatar} sx={{ mr: 2 }}>
                          {getInitials(item.message)}
                        </Avatar>
                      )}
                      <Typography color="textPrimary" variant="body1">
                        {item.message}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.nivel}</TableCell>
                  <TableCell>{format(new Date(item.signupDate), 'dd/MM/yyyy')}/ {format(new Date(item.signupDate), "HH:mm")}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (item.priority === "normal" && "success") ||
                        (item.priority === "baja" && "warning") ||
                        "error"
                      }
                    >
                      {item.priority}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={data.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ListResults.propTypes = {
  data: PropTypes.array.isRequired,
};

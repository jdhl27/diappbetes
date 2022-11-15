import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
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
import { Files as FilesIcon } from "../../icons/files";
import Lottie from "lottie-react";
import emptyAnimations from "../../assets/animations/empty.json";

export const ListResults = ({
  data = [],
  onClickUser,
  dataHeader = [],
  type = "register",
  loading = false,
  ...rest
}) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectOne = (event, id, user) => {
    setSelectedCustomerIds(id);
    onClickUser(user);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const renderDataRow = (item) => {
    if (type === "register") {
      return (
        <>
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
          <TableCell>
            {format(new Date(item.signupDate), "dd/MM/yyyy")}-{" "}
            {format(new Date(item.signupDate), "HH:mm")}
          </TableCell>
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
        </>
      );
    }

    if (type === "observation") {
      return (
        <>
          <TableCell>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Typography color="textPrimary" variant="body1">
                {item.recommendations}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>{item.id_medico}</TableCell>
          <TableCell>
            {format(new Date(item.signupDate), "dd/MM/yyyy")}-{" "}
            {format(new Date(item.signupDate), "HH:mm")}
          </TableCell>
          <TableCell>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {renderFiles(item.files)}
            </Box>
          </TableCell>
        </>
      );
    }

    if (type === "patient") {
      return (
        <>
          <TableCell>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              {/* {item?.avatar && ( */}
              <Avatar src={item?.avatar} sx={{ mr: 2 }}>
                {getInitials(item.displayName)}
              </Avatar>
              {/* )} */}
              <Typography color="textPrimary" variant="body1">
                {item.message}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>{item.displayName}</TableCell>
          <TableCell>
            {format(new Date(item.signupDate), "dd/MM/yyyy")}-{" "}
            {format(new Date(item.signupDate), "HH:mm")}
          </TableCell>
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
        </>
      );
    }
  };

  const renderFiles = (files) => {
    let array = [];
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      array.push(
        <Button
          component="a"
          startIcon={<FilesIcon />}
          disableRipple
          sx={{
            backgroundColor: "rgba(255,255,255, 0.08)",
            borderRadius: 1,
            color: "#000",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
          href={file.url}
          target={"_blank"}
        >
          <Box sx={{ flexGrow: 1 }}>{file.name}</Box>
        </Button>
      );
    }
    return array;
  };

  if (data.length > 0) {
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
                    selected={selectedCustomerIds === item._id}
                    onClick={(event) => handleSelectOne(event, item._id, item)}
                    style={{ cursor: "pointer" }}
                  >
                    {renderDataRow(item)}
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
  }

  if (!loading) {
    return (
      <Lottie
        animationData={emptyAnimations}
        loop={true}
        style={{
          width: "34%",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      />
    );
  }
};

ListResults.propTypes = {
  data: PropTypes.array.isRequired,
};

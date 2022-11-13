import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import Loading from "../../components/loading";
import { ListResults } from "../../components/tableData/list-results";
import { ListToolbar } from "../../components/tableData/list-toolbar";
import { customers } from "../../__mocks__/customers";

const RegisterGlucosa = () => {
  const [loading, setLoading] = useState(true);

  // const token = window.localStorage.token;
  // if (token) {
  return (
    <DashboardLayout>
      {/* {loading && <Loading />} */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ListToolbar />
          <Box sx={{ mt: 3 }}>
            <ListResults data={customers} />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
  // }
  // return <Navigate to="/login" replace={true} />;
};

export default RegisterGlucosa;

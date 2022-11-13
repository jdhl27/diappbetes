import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import Loading from "../../components/loading";
import BasicModal from "../../components/modal";
import Input from "../../components/input";
import ButtonComponent from "../../components/button"
import { ListResults } from "../../components/tableData/list-results";
import { ListToolbar } from "../../components/tableData/list-toolbar";
import { customers } from "../../__mocks__/customers";

const RegisterGlucosa = () => {
  const dataSend = {
    ...data,
    date: new Date()
  }
  const [loading, setLoading] = useState(true);

  // const token = window.localStorage.token;
  // if (token) {
  return (
    <DashboardLayout>
      {/* {loading && <Loading />} */}
      <ButtonComponent text="Agregar registro" onClick={handleOpen} />

        <BasicModal isOpen={open} handleClose={handleClose}>
                <div className="container-modal">
                  <h2 className="subtitle">Registro de Glucosa</h2>

                  <Input
                    type="text"
                    placeholder="Ejem: 120"
                    label="Medición Glucosa"
                    autofocus
                   
                  />

                  <Input
                    type="text"
                    placeholder="Síntomas relevantes"
                    label="Mensaje"
                    autofocus
                   
                  />
                  <br/>
                  <ButtonComponent text="Guardar" />
                </div>

              </BasicModal>
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

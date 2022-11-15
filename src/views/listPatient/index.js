import { Box, Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import Loading from "../../components/loading";
import { ListResults } from "../../components/tableData/list-results";
import { ListToolbar } from "../../components/tableData/list-toolbar";
import { Notify } from "../../components/notify";
import User from "../../API/endpoints/user";
import UserContext from "../../contexts/user/userContext";
import { useNavigate } from "react-router-dom";

const ListPatient = () => {
  const [loading, setLoading] = useState(true);
  const [dataAll, setDataAll] = useState([]);

  // Context for user selected
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getPatients();
  }, [user]);

  const getPatients = () => {
    setLoading(true);
    User.GetPatient()
      .then((response) => {
        console.log("vea su respuesta: ", response);
        if (response.status >= 200 && response.status < 400) {
          setDataAll(response?.data?.reverse());
        } else {
          Notify("Ocurrió un error", "error");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("error: ", err);
        setLoading(false);
      });
  };

  return (
    <DashboardLayout>
      {loading && <Loading />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ListToolbar
            title={"Pacientes"}
            titleButton={"Agregar observación"}
            hidden={false}
          />
          <Box sx={{ mt: 3 }}>
            <ListResults
              loading={loading}
              type={"patient"}
              dataHeader={["Reporte pacientes", "Nombre", "Fecha", "Prioridad"]}
              data={dataAll}
              onClickUser={(item) => {
                navigate(`/pacientes/${item?.id_paciente}/`);
              }}
            />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default ListPatient;

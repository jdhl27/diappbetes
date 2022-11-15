import { Box, Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import Loading from "../../components/loading";
import BasicModal from "../../components/modal";
import Input from "../../components/input";
import ButtonComponent from "../../components/button";
import { ListResults } from "../../components/tableData/list-results";
import { ListToolbar } from "../../components/tableData/list-toolbar";
import TextAreaComponent from "../../components/textArea";
import { Notify } from "../../components/notify";
import User from "../../API/endpoints/user";
import UserContext from "../../contexts/user/userContext";

const ListPatient = () => {
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({});
  const [dataAll, setDataAll] = useState([]);

  // Context for user selected
  const { user } = useContext(UserContext);
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getPatients();
  }, [user]);

  const getPatients = () => {
    setLoading(true);
    User.GetPatient()
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          setDataAll(response?.data);
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
            onClickAction={handleOpen}
            titleButton={"Agregar observación"}
            hidden={false}
          />
          <Box sx={{ mt: 3 }}>
            <ListResults
              type={"patient"}
              dataHeader={["Reporte pacientes", "Nombre", "Fecha", "Prioridad"]}
              data={dataAll}
              onClickUser={(id) => {
                // console.log("click user: ", id);
              }}
            />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default ListPatient;

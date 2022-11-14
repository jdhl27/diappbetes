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
import Glucose from "../../API/endpoints/glucose";
import User from "../../API/endpoints/user";
import UserContext from "../../contexts/user/userContext";
import { AuthContext } from "../../contexts/auth";

const RegisterGlucosa = () => {
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
    Glucose.GetAllGlucoses({ id_paciente: user._id || userData?._id })
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
  }, [user]);

  const handleAdd = () => {
    const dataSend = {
      ...data,
      signupDate: new Date(),
      id_paciente: user._id,
    };

    if (data.message && data.nivel) {
      setLoading(true);
      Glucose.PostGlucose(dataSend)
        .then((response) => {
          if (response.status >= 200 && response.status < 400) {
          } else {
            Notify("Hubo un error", "error");
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          Notify("Hubo un error", "error");
        });
    } else {
      Notify("Por favor llene los campos", "warn");
    }
  };

  return (
    <DashboardLayout>
      {loading && <Loading />}

      <BasicModal isOpen={open} handleClose={handleClose}>
        <div className="container-modal">
          <h2 className="subtitle">Registro de Glucosa</h2>

          <Input
            type="number"
            placeholder="Ejem: 120"
            label="Medición Glucosa"
            autofocus
            onchange={(value) => {
              setData({
                ...data,
                nivel: value,
              });
            }}
          />
          <TextAreaComponent
            type="text"
            placeholder="Síntomas relevantes"
            label="Mensaje"
            onchange={(value) => {
              setData({
                ...data,
                message: value,
              });
            }}
          />
          <br />
          <ButtonComponent text="Guardar" onClick={handleAdd} />
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
          <ListToolbar
            title={"Registros"}
            onClickAction={handleOpen}
            titleButton={"Agregar registro"}
          />
          <Box sx={{ mt: 3 }}>
            <ListResults
              dataHeader={["Mensaje", "Nivel registrado", "Fecha", "Prioridad"]}
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

export default RegisterGlucosa;

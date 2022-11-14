import { Box, Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import Loading from "../../components/loading";
import BasicModal from "../../components/modal";
import Input from "../../components/input";
import ButtonComponent from "../../components/button";
import { ListResults } from "../../components/tableData/list-results";
import { ListToolbar } from "../../components/tableData/list-toolbar";
import { customers } from "../../__mocks__/customers";
import TextAreaComponent from "../../components/textArea";
import { notify } from "../../components/notify";
import Glucose from "../../API/endpoints/glucose";
import User from "../../API/endpoints/user";
import UserContext from "../../contexts/user/userContext";

const RegisterGlucosa = () => {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({});
  const [dataAll, setDataAll] = useState([]);

  // Context for user selected
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    console.log("entro");
    if (Object.keys(user).length === 0) {
      const token = window.localStorage.token;
      if (token) {
        User.GetUser()
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              updateUser(response?.data?.user);
            }
          })
          .catch((err) => {
            console.log("error: ", err);
          });
      }
    }
  }, []);

  useEffect(() => {
    Glucose.GetAllGlucoses()
      .then((response) => {
        console.log("VEAAA: ", response);
        if (response.status >= 200 && response.status < 300) {
          // updateUser(response?.data?.user);
          setDataAll(response?.data)
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

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
          if (response.status >= 200 && response.status < 300) {
          } else {
            notify("Hubo un error", "error");
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          notify("Hubo un error", "error");
        });
    } else {
      notify("Por favor llene los campos", "warn");
    }
  };

  // const token = window.localStorage.token;
  // if (token) {
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
                console.log("click user: ", id);
              }}
            />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
  // }
  // return <Navigate to="/login" replace={true} />;
};

export default RegisterGlucosa;

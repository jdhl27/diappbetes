import { Box, Container } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import Loading from "../../components/loading";
import BasicModal from "../../components/modal";
import ButtonComponent from "../../components/button";
import { ListResults } from "../../components/tableData/list-results";
import { ListToolbar } from "../../components/tableData/list-toolbar";
import TextAreaComponent from "../../components/textArea";
import { Notify } from "../../components/notify";
import Observation from "../../API/endpoints/observation";
import UserContext from "../../contexts/user/userContext";
import { useParams } from "react-router-dom";

const RegisterObservacion = () => {
  const [loading, setLoading] = useState(true);

  const { userId } = useParams();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({});
  const [dataAll, setDataAll] = useState([]);

  // Context for user selected
  const { user } = useContext(UserContext);
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getObservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userId]);

  const getObservations = () => {
    setLoading(true);
    Observation.GetAllObservations({
      id_paciente: userId || user._id || userData?._id,
    })
      .then((response) => {
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

  const handleAdd = (recommendationsVoice) => {
    const dataSend = {
      ...data,
      recommendations: data.recommendations || recommendationsVoice,
      id_paciente: userId,
      id_medico: user._id,
    };

    if (data.recommendations || recommendationsVoice) {
      setLoading(true);
      Observation.PostObservation(dataSend)
        .then((response) => {
          if (response.status >= 200 && response.status < 400) {
            setOpen(false);
            getObservations();
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

      {user.isMedical ? (
        <BasicModal isOpen={open} handleClose={handleClose}>
          <div className="container-modal">
            <h2 className="subtitle">Registro de Observación</h2>

            {/* <Input
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
            /> */}
            <TextAreaComponent
              value={data?.recommendations}
              type="text"
              placeholder="Recuerda seguir el tratamiento..."
              label="Mensaje"
              onchange={(value) => {
                setData({
                  ...data,
                  recommendations: value,
                });
              }}
              onchangeVoice={(value) => {
                if (value?.includes("enviar")) {
                  value = value?.replace("enviar", "");
                  handleAdd(value);
                }
                setData({
                  ...data,
                  recommendations: value,
                });
              }}
            />
            <br />
            <ButtonComponent text="Guardar" onClick={handleAdd} />
          </div>
        </BasicModal>
      ) : null}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ListToolbar
            title={"Observaciones"}
            onClickAction={handleOpen}
            titleButton={"Agregar observación"}
            hidden={user?.isMedical}
          />
          <Box sx={{ mt: 3 }}>
            <ListResults
              loading={loading}
              type={"observation"}
              dataHeader={["Mensaje", "Médico", "Fecha", "Documentos"]}
              data={dataAll}
              onClickUser={(id) => {}}
            />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default RegisterObservacion;

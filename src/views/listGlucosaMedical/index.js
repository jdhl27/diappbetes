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
import Glucose from "../../API/endpoints/glucose";
import UserContext from "../../contexts/user/userContext";
import { useNavigate, useParams } from "react-router-dom";
import Observation from "../../API/endpoints/observation";
import User from "../../API/endpoints/user";

const ListGlucosaMedical = () => {
  const { userId } = useParams();

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [dataAll, setDataAll] = useState([]);
  const navigate = useNavigate();

  // Context for user selected
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    User.GetUserId({ id_user: userId })
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          setDataUser(response?.data);
        } else {
          Notify("Ocurrió un error", "error");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("error: ", err);
        setLoading(false);
      });
    getGlucosa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const getGlucosa = () => {
    setLoading(true);
    Glucose.GetAllGlucoses({ id_paciente: userId })
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

  const handleAdd = (recommendationsVoice = null) => {
    const dataSend = {
      ...data,
      signupDate: new Date(),
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
            title={`Registros de ${dataUser?.displayName}`}
            onClickAction={handleOpen}
            titleButton={"Agregar observación"}
            secondAction={true}
            onClickActionTwo={() => {
              navigate(`/observaciones/${userId}/`);
            }}
            titleButtonTwo={"Ver observaciones"}
            hidden={user?.isMedical}
            hiddenImport={true}
            item={dataUser}
          />
          <Box sx={{ mt: 3 }}>
            <ListResults
              loading={loading}
              dataHeader={["Mensaje", "Nivel registrado", "Fecha", "Prioridad"]}
              data={dataAll}
              onClickUser={(id) => {}}
            />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default ListGlucosaMedical;

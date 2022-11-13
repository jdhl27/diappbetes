import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import Loading from "../../components/loading";
import BasicModal from "../../components/modal";
import Input from "../../components/input";
import ButtonComponent from "../../components/button";



const RegisterGlucosa = () => {
  const dataSend = {
    ...data,
    date: new Date()
  }
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({});
  
  const token = window.localStorage.token;
  if (token) {
    return (
      <DashboardLayout>
        {/* {loading && <Loading />} */}
        <h1>Estoy en la vista RegisterGlucosa</h1>
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
      </DashboardLayout>
    );
  }
  return <Navigate to="/login" replace={true} />;
};

export default RegisterGlucosa;

import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import Loading from "../../components/loading";
import BasicModal from "../../components/modal";
import Input from "../../components/input";
import ButtonComponent from "../../components/button";
import { ListResults } from "../../components/tableData/list-results";
import { ListToolbar } from "../../components/tableData/list-toolbar";
import { customers } from "../../__mocks__/customers";

const RegisterGlucosa = () => {
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState({});

 
  return (
    <DashboardLayout>
      {/* {loading && <Loading />} */}
      <h2 className="subtitle">Registro de Observaciones</h2>

    </DashboardLayout>
  );
  
};

export default RegisterGlucosa;

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import Loading from "../../components/loading";

const RegisterGlucosa = () => {
  const [loading, setLoading] = useState(true);

  const token = window.localStorage.token;
  if (token) {
    return (
      <DashboardLayout>
        {/* {loading && <Loading />} */}
        <h1>Estoy en la vista RegisterGlucosa</h1>
      </DashboardLayout>
    );
  }
  return <Navigate to="/login" replace={true} />;
};

export default RegisterGlucosa;

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import Loading from "../../components/loading";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const token = window.localStorage.token;
  if (token) {
    return (
      <DashboardLayout>
        {/* {loading && <Loading />} */}
        <h1>Estoy en la vista dashboard</h1>
      </DashboardLayout>
    );
  }
  return <Navigate to="/login" replace={true} />;
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import User from "../../API/endpoints/user";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import Header from "../../components/header";
import Loading from "../../components/loading";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dataUser, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.token;
    if (token) {
      User.GetUser()
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            setUser(response?.data?.user);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error: ", err);
        });
    }
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
      setLoading(false);
    }, 1000);
  };

  const token = window.localStorage.token;
  if (token) {
    return (
      <DashboardLayout>
        {loading && <Loading />}
        {/* <Header
          userData={dataUser}
          onLogout={() => {
            handleLogout();
          }}
        /> */}
      </DashboardLayout>
    );
  }
  return <Navigate to="/login" replace={true} />;
};

export default Dashboard;

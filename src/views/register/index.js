import React, { useState } from "react";
import Lottie from "lottie-react";
import { Navigate, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/button";
import Input from "../../components/input";
import Logo from "../../components/logo";
import healthcareAnimation from "../../assets/animations/healthcare-loader.json";
import "./styles.css";
import User from "../../API/endpoints/user";
import Loading from "../../components/loading";
import Links from "../../components/links";

const date = new Date();
const yearCurrent = date.getFullYear();

function Register() {
  const localStorage = window.localStorage;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    const dataSend = {
      ...data,
      displayName: `${data?.firstName} ${data?.lastName}`,
    };
    delete dataSend["firstName"];
    delete dataSend["lastName"];
    delete dataSend["passwordConfirm"];

    if (data.email && data.password) {
      setLoading(true);
      User.PostUserRegister(dataSend)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            localStorage.setItem("token", response.data.token);
            navigate("/");
          } else {
            alert("Revisa los datos");
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error: ", err);
        });
    } else {
      alert("Por favor llene los campos");
    }
  };

  if (token) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="container-register">
      {loading && <Loading />}
      <div className="container-logo-form">
        <Logo styles={{ paddingLeft: "42px" }} widthLogo={"150px"} />
        <div className="container-form">
          <div className="container-form-two">
            <h1 className="subtitle">Registrate</h1>

            <div className="form">
              <Input
                type="text"
                placeholder="Pepito"
                label="Nombre"
                autofocus
                onchange={(value) => {
                  setData({
                    ...data,
                    firstName: value,
                  });
                }}
              />

              <Input
                type="text"
                placeholder="Perez"
                label="Apellidos"
                onchange={(value) => {
                  setData({
                    ...data,
                    lastName: value,
                  });
                }}
              />

              <Input
                type="number"
                placeholder="3044488123"
                label="Celular"
                onchange={(value) => {
                  setData({
                    ...data,
                    phone: value,
                  });
                }}
              />

              <Input
                type="email"
                placeholder="ejemplo@yopmail.com"
                label="Correo Electrónico"
                onchange={(value) => {
                  setData({
                    ...data,
                    email: value,
                  });
                }}
              />

              <Input
                type="password"
                placeholder="***************"
                label="Contraseña"
                onchange={(value) => {
                  setData({
                    ...data,
                    password: value,
                  });
                }}
              />
              <Input
                type="password"
                placeholder="***************"
                label="Confirmar contraseña"
                onchange={(value) => {
                  setData({
                    ...data,
                    passwordConfirm: value,
                  });
                }}
              />
              {/* 
              <Input
                type="city"
                placeholder="Ciudad de recidencia"
                label="Ciudad"
              /> */}

              <div className="button-form">
                <ButtonComponent
                  text="Registrarse"
                  onClick={() => {
                    handleRegister();
                  }}
                />
              </div>
            </div>
            <hr className="line" />

            <p className="text">
              Ya tengo una cuenta. {` `}
              <Links text="Iniciar sesión" isLink={true} href={"/login"} />
            </p>

            <p className="text-light">
              &copy; {yearCurrent} Diappbetes - Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      <div className="container-image">
        <Lottie
          animationData={healthcareAnimation}
          loop={true}
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}

export default Register;

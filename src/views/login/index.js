import React, { useState } from "react";
import Lottie from "lottie-react";
import ButtonComponent from "../../components/button";
import Input from "../../components/input";
import Links from "../../components/links";
import Logo from "../../components/logo";
import healthcareAnimation from "../../assets/animations/healthcare-loader.json";
import "./styles.css";

import User from "../../API/endpoints/user";
import { useNavigate } from "react-router-dom";

const date = new Date();
const yearCurrent = date.getFullYear();
const heightScreen = window.innerHeight;
const localStorage = window.localStorage;

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const handleLogin = () => {
    if (data.email && data.password) {
      User.PostUserLogin(data)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            localStorage.setItem("token", response.data.token);
            navigate("home");
          } else {
            alert('Revisa los datos')
          }
        })
        .catch((err) => console.log("error: ", err));
    } else {
      alert("Por favor llene los campos");
    }
  };

  return (
    <div className="container">
      <div className="container-logo-form">
        <Logo styles={{ paddingLeft: "42px" }} widthLogo={"150px"} />
        <div
          className={
            heightScreen <= 700
              ? "container-form-login paddingTop0"
              : "container-form-login"
          }
        >
          <div className="container-form-two">
            <h1 className="subtitle">Ingresa </h1>

            <div className="form">
              <Input
                type="email"
                placeholder="ejemplo@yopmail.com"
                label="Correo Electrónico"
                autofocus={true}
                onchange={(value) => {
                  setData({
                    ...data,
                    email: value,
                  });
                }}
              />

              <Input
                type="password"
                placeholder="**************"
                label="Contraseña"
                onchange={(value) => {
                  setData({
                    ...data,
                    password: value,
                  });
                }}
              />

              <div className="container-forgot-password">
                <Links text="Olvidé mi clave" />
              </div>

              <ButtonComponent
                text="Ingresar"
                onClick={() => {
                  handleLogin();
                }}
              />
            </div>

            <hr className="line" />

            <p className="text">
              Intenta creando una cuenta. {` `}
              <Links text="Crear mi cuenta" isLink={true} href={"/register"} />
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

export default Login;

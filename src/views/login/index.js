import React from "react";
import Lottie from "lottie-react";
import ButtonComponent from "../../components/button";
import Input from "../../components/input";
import Links from "../../components/links";
import Logo from "../../components/logo";
import healthcareAnimation from "../../assets/animations/healthcare-loader.json";
import "./styles.css";

const date = new Date();
const yearCurrent = date.getFullYear();

function Login() {
  return (
    <div className="container">
      <div className="container-logo-form">
        <Logo styles={{ marginLeft: "42px", width: "150px" }} />
        <div className="container-form">
          <div className="container-form-two">
            {/* <h1 className="title">Bienvenido a Diappbetes</h1> */}
            <h1 className="subtitle">Ingresa</h1>

            <div className="form">
              <Input
                type="email"
                placeholder="ejemplo@yopmail.com"
                label="Correo Electrónico"
              />

              <Input
                type="password"
                placeholder="**************"
                label="Contraseña"
                autofocus={false}
              />

              <div className="container-forgot-password">
                <Links text="Olvidé mi clave" />
              </div>

              <ButtonComponent text="Ingresar" />
            </div>

            <hr className="line" />

            <p className="text">
              Intenta creando una cuenta. {` `}
              <Links text="Crear mi cuenta" />
            </p>

            <p className="text-light">
              &copy; {yearCurrent} Diappbetes - Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      <div className="container-image">
        <Lottie animationData={healthcareAnimation} loop={true} />
      </div>
    </div>
  );
}

export default Login;

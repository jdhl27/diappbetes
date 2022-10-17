import React from "react";
import Lottie from "lottie-react";
import ButtonComponent from "../../components/button";
import Input from "../../components/input";
import Logo from "../../components/logo";
import healthcareAnimation from "../../assets/animations/healthcare-loader.json";
import "./styles.css";


const date = new Date();
const yearCurrent = date.getFullYear();

function Register() {
  return (
    <div className="container-register">
      <div className="container-logo-form">
        <Logo styles={{ paddingLeft: "42px" }} widthLogo={"150px"} />
        <div className="container-form">
          <div className="container-form-two">
            {/* <h1 className="title">Bienvenido a Diappbetes</h1> */}
            <h1 className="subtitle">Registrate</h1>

            <div className="form">
              <Input
                type="text"
                placeholder="Pepito"
                label="Nombre"
                autofocus
              />

              <Input
                type="text"
                placeholder="Perez"
                label="Apellidos"
              />

              <Input
                type="number"
                placeholder="3044488123"
                label="Celular"
              />

              <Input
                type="email"
                placeholder="ejemplo@yopmail.com"
                label="Correo Electrónico"
              />

              <Input
                type="password"
                placeholder="***************"
                label="Contraseña"
              />
              <Input
                type="password"
                placeholder="***************"
                label="Confirmar contraseña"
              />
              {/* 
              <Input
                type="city"
                placeholder="Ciudad de recidencia"
                label="Ciudad"
              /> */}


              <div className="button-form">
                <ButtonComponent text="Registrarse" />
              </div>

            </div>
            <hr className="line" />

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


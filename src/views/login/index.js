import React, { useState } from "react";
import Lottie from "lottie-react";
import { Navigate, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/button";
import Input from "../../components/input";
import Links from "../../components/links";
import Logo from "../../components/logo";
import Loading from "../../components/loading";
import healthcareAnimation from "../../assets/animations/healthcare-loader.json";
import {useValidateEmail} from '../../hooks/useValidation'
import "./styles.css";

import User from "../../API/endpoints/user";

const date = new Date();
const yearCurrent = date.getFullYear();
const heightScreen = window.innerHeight;

function Login() {
  const localStorage = window.localStorage;
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [validar, setValidar] = useState({empty: false, noLogin: false})
  const [email, validateEmail] = useValidateEmail()

  const handleLogin = () => {
    validateEmail(data.email)
    console.log(email)
    if (email.isEmail && data.password) {
      setLoading(true);
      User.PostUserLogin(data)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            localStorage.setItem("token", response.data.token);
            navigate("/");
          } else {
            //alert("Revisa los datos");
            setValidar((e)=>{return {...e,noLogin:true}})
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error: ", err);
        });
    } else {
      //alert("Por favor llene los campos");
      setValidar((e)=> {return{...e, ...email}})
    }
  };

  if (token) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="container">
      {loading && <Loading />}
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
            {!email.isEmail && <div className="from-msm">{email.message}</div>}
            {validar.noLogin && <div className="from-msm">Por favor validar correo o Contraseña sean correctos</div>}
            <h1 className="subtitle">Ingresa </h1>

            <div className="form">
              <Input
                type="email"
                placeholder="ejemplo@yopmail.com"
                label="Correo Electrónico"
                autofocus={true}
                onchange={(value) => {
                  validateEmail(value)
                  setData({
                    ...data,
                    email: value,
                  });
                }}
              />
              {!email.isEmail && <div className="from-msm4">{email.message}</div>}
              
              <Input
                type="password"
                placeholder="**************"
                label="Contraseña"
                onchange={(value) => {
                  setValidar((e)=> {return{...e, empty: '', noLogin:false}})
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

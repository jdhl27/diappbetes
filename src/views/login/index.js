import React, { useState } from "react";
import Lottie from "lottie-react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ButtonComponent from "../../components/button";
import Input from "../../components/input";
import Links from "../../components/links";
import Logo from "../../components/logo";
import Loading from "../../components/loading";
import healthcareAnimation from "../../assets/animations/healthcare-loader.json";
import { useValidateEmail, useValidateinput } from '../../hooks/useValidation'
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
  const [validar, setValidar] = useState({ empty: false, noLogin: false })
  const [email, validateEmail] = useValidateEmail()
  const [inputPass, validateInput] = useValidateinput()

  const handleLogin = () => {
    validateEmail(data.email)
    validateInput(data.password)
    if (!email.isEmail) {
      notify("Verifique el correo", "warn")
      return 
    }
    if (email.isEmail && inputPass.isValid) {
      setLoading(true);
      User.PostUserLogin(data)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            localStorage.setItem("token", response.data.token);
            navigate("/");
          } else {
            //alert("Revisa los datos");
            setValidar((e) => { return { ...e, noLogin: true } })
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error: ", err);
        });
    } else {
      //alert("Por favor llene los campos");
      notify("Por favor llene los campos", "warn")
      setValidar((e) => { return { ...e, ...email } })
    }
  };

  const notify = (msg = "", type = 'info', position = toast.POSITION.TOP_LEFT) => {
    switch (type) {
      case "info":
        toast.info(msg || "Info Notification !", {
          position
        });
        break;
      case "success":
        toast.success(msg || "Success Notification !", {
          position
        });
        break;
      case "error":
        toast.error(msg || "Error Notification !", {
          position
        });
        break;
      case "warn":
        toast.warn(msg || "Warning Notification !", {
          position
        });
        break;

      default:
        toast.info(msg || "Info Notification !", {
          position
        });
    }
  };

  if (token) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="container">
      {loading && <Loading />}
      <ToastContainer />
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
            {email.isEmail ? <div className="from-msm">{email.message}</div> : null}
            {validar.noLogin ? <div className="from-msm">Por favor validar correo o Contraseña sean correctos</div> : null}
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
              {!email.isEmail && <div className="from-msm4" style={{color: 'red'}}>{email.message}</div>}

              <Input
                type="password"
                placeholder="**************"
                label="Contraseña"
                onchange={(value) => {
                  validateInput(value)
                  setData({
                    ...data,
                    password: value,
                  });
                }}
              />
              {!inputPass.isValid && <div className="from-msm4" style={{color: 'red'}}>{inputPass.message}</div>}

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

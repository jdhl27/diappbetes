import React, { useContext, useState } from "react";
import Lottie from "lottie-react";
import { Navigate, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ButtonComponent from "../../components/button";
import Input from "../../components/input";
import Links from "../../components/links";
import Logo from "../../components/logo";
import Loading from "../../components/loading";
import healthcareAnimation from "../../assets/animations/healthcare-loader.json";
import { useValidateEmail, useValidateinput } from "../../hooks/useValidation";
import UserContext from "../../contexts/user/userContext";
import { Notify } from "../../components/notify";
import "./styles.css";

import User from "../../API/endpoints/user";
import { AuthContext } from "../../contexts/auth";

const date = new Date();
const yearCurrent = date.getFullYear();
const heightScreen = window.innerHeight;

function Login() {
  // Context for user selected
  const { updateUser } = useContext(UserContext);
  const { authToken, updateToken } = useContext(AuthContext);

  const localStorage = window.localStorage;

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [email, validateEmail] = useValidateEmail();
  const [inputPass, validateInput] = useValidateinput();

  const handleLogin = () => {
    validateEmail(data.email);
    validateInput(data.password);
    if (!email.isEmail) {
      Notify("Verifique el correo", "warn");
      return;
    }
    if (email.isEmail && inputPass.isValid) {
      setLoading(true);
      User.PostUserLogin(data)
        .then((response) => {
          if (response.status >= 200 && response.status < 400) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            updateToken(response.data.token);
            updateUser(response.data.user);
            navigate("/");
          } else {
            Notify("Datos incorrectos", "error");
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error: ", err);
        });
    } else {
      Notify("Por favor llene los campos", "warn");
    }
  };

  if (authToken) {
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
            <h1 className="subtitle">Ingresa </h1>

            <div className="form">
              <Input
                type="email"
                placeholder="ejemplo@yopmail.com"
                label="Correo Electr??nico"
                autofocus={true}
                onchange={(value) => {
                  validateEmail(value);
                  setData({
                    ...data,
                    email: value,
                  });
                }}
              />
              {!email.isEmail && (
                <div className="from-msm4" style={{ color: "red" }}>
                  {email.message}
                </div>
              )}

              <Input
                type="password"
                placeholder="**************"
                label="Contrase??a"
                onchange={(value) => {
                  validateInput(value);
                  setData({
                    ...data,
                    password: value,
                  });
                }}
              />
              {!inputPass.isValid && (
                <div className="from-msm4" style={{ color: "red" }}>
                  {inputPass.message}
                </div>
              )}

              <div className="container-forgot-password">
                <Links text="Olvid?? mi clave" />
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

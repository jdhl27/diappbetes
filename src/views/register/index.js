import React, { useContext, useState } from "react";
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
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import styled from "@emotion/styled";
import { Notify } from "../../components/notify";
import UserContext from "../../contexts/user/userContext";
import { AuthContext } from "../../contexts/auth";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#2563eb",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const date = new Date();
const yearCurrent = date.getFullYear();

function Register() {
  // Context for user selected
  const { updateUser } = useContext(UserContext);
  const { authToken, updateToken } = useContext(AuthContext);

  const localStorage = window.localStorage;

  const navigate = useNavigate();
  const [data, setData] = useState({ isMedical: false });
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    const dataSend = {
      ...data,
      displayName: `${data?.firstName} ${data?.lastName}`,
    };

    const regexPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    const validation =
      data.firstName &&
      data.lastName &&
      data.phone &&
      data.email &&
      data.password &&
      data.passwordConfirm;
    const validationPass = data.password === data.passwordConfirm;
    // const validationPass2 = regexPass.test(data.password);
    const validationPass2 = true;

    if (validation && validationPass && validationPass2) {
      setLoading(true);
      delete dataSend["passwordConfirm"];
      console.log(dataSend);
      User.PostUserRegister(dataSend)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            localStorage.setItem("token", response.data.token);
            updateToken(response.data.token);
            updateUser(dataSend);
            navigate("/");
          } else {
            Notify("Ocurrió un error", "error");
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("error: ", err);
        });
    } else {
      if (!validation) {
        Notify("Por favor llene los campos");
        return;
      }
      if (!validationPass) {
        Notify("Las claves no coinciden");
        return;
      }
      if (!validationPass2) {
        Notify(`
        La clave debe contener lo siguiente: 
        - Minimo 8 caracteres
        - Maximo 15
        - Al menos una letra mayúscula
        - Al menos una letra minucula
        - Al menos un dígito
        - No espacios en blanco
        - Al menos 1 caracter especial
        
        `);
        return;
      }
    }
  };

  if (authToken) {
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
              <FormGroup>
                <FormControlLabel
                  control={
                    <MaterialUISwitch
                      sx={{ m: 1 }}
                      defaultChecked
                      checked={data.isMedical}
                      onChange={(event) => {
                        setData({
                          ...data,
                          isMedical: event.target.checked,
                        });
                      }}
                    />
                  }
                  label={data.isMedical ? "Soy Médico" : "Soy Paciente"}
                />
              </FormGroup>
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

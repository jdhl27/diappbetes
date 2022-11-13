import Login from "./views/login";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./views/register";
import Dashboard from "./views/dashboard";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";
import UserState from "../src/contexts/user/userState";
import { ToastContainer } from "react-toastify";
import RegisterGlucosa from "./views/registerGlucosa";
import AccountUser from "./views/account";
import Settings from "./views/settings";
import RegisterObservacion from "./views/registerObservacion";
import { registerChartJs } from "./utils/register-chart-js";

registerChartJs()


function App() {
  const token = window.localStorage.token;
  return (
    <UserState>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <ToastContainer />
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/login"
              element={token ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={token ? <Navigate to="/" replace /> : <Register />}
            />
            <Route
              path="/glucosa"
              element={ <RegisterGlucosa />}
            />
            <Route
              path="/cuenta"
              element={ <AccountUser />}
            />
            <Route
              path="/configuraciones"
              element={ <Settings />}
            />
            <Route
              path="/observaciones"
              element={ <RegisterObservacion />}
            />
          </Routes>
        </div>
      </ThemeProvider>
    </UserState>
  );
}

export default App;

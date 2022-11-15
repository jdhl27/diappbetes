import Login from "./views/login";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./views/register";
import Dashboard from "./views/dashboard";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import RegisterGlucosa from "./views/registerGlucosa";
import ListGlucosaMedical from "./views/listGlucosaMedical";
import AccountUser from "./views/account";
import Settings from "./views/settings";
import ListPatient from "./views/listPatient";
import RegisterObservacion from "./views/registerObservacion";
import { registerChartJs } from "./utils/register-chart-js";
import Page404 from "./views/404";
import AuthState from "./contexts/auth";
import { ProtectedRoutes } from "./components/protectedRoutes";
import { ValidateUser } from "./utils/validate-user";
import { useContext } from "react";
import UserContext from "./contexts/user/userContext";

registerChartJs();

function App() {
  const { user } = useContext(UserContext);

  return (
    <AuthState>
      <ValidateUser>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <ToastContainer />
            <Routes>
              <Route path="*" element={<Page404 />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="/"
                  element={user?.isMedical ? <ListPatient /> : <Dashboard />}
                />
                <Route path="/glucosa" element={<RegisterGlucosa />} />
                <Route
                  path="/pacientes/:userId"
                  element={<ListGlucosaMedical />}
                />
                <Route path="/cuenta" element={<AccountUser />} />
                <Route path="/configuraciones" element={<Settings />} />
                {/* <Route path="/pacientes" element={<ListPatient />} /> */}
                <Route
                  path="/observaciones"
                  element={<RegisterObservacion />}
                />
                <Route
                  path="/observaciones/:userId"
                  element={<RegisterObservacion />}
                />
              </Route>
            </Routes>
          </div>
        </ThemeProvider>
      </ValidateUser>
    </AuthState>
  );
}

export default App;

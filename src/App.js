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
import Page404 from "./views/404";
import AuthState from "./contexts/auth";
import { ProtectedRoutes } from "./components/protectedRoutes";
import { ValidateUser } from "./utils/validate-user";

registerChartJs();

function App() {
  return (
    <AuthState>
      <UserState>
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
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/glucosa" element={<RegisterGlucosa />} />
                  <Route path="/cuenta" element={<AccountUser />} />
                  <Route path="/configuraciones" element={<Settings />} />
                  <Route
                    path="/observaciones"
                    element={<RegisterObservacion />}
                  />
                </Route>
              </Routes>
            </div>
          </ThemeProvider>
        </ValidateUser>
      </UserState>
    </AuthState>
  );
}

export default App;

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
          </Routes>
        </div>
      </ThemeProvider>
    </UserState>
  );
}

export default App;

import Login from "./views/login";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./views/register";
import Dashboard from "./views/dashboard";

function App() {
  const token = window.localStorage.token;
  return (
    <div className="App">
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
  );
}

export default App;

import Login from "./views/login";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

const token = window.localStorage.token;

export const Home = () => <h1>Estas en el home</h1>;
export const Register = () => <h1>Estas en el register</h1>;

function App() {
  return (
    <div className="App">
      {token ? (
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

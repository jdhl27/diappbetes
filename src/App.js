import Login from "./views/login";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./views/register";

export const Home = () => {
  const token = window.localStorage.token;
  if (token) {
    return <h1>Estas en el home</h1>;
  }
  return <Navigate to="/login" replace={true} />;
};

function App() {
  const token = window.localStorage.token;
  return (
    <div className="App">
      <Routes>
        <Route
          path="*"
          element={<>NO EXISTE LA RUTA A LA QUE DESEAS ACCEDER</>}
        />
        <Route path="/" element={<Home />} />
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

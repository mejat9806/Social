import axios from "axios";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/ui/page/Home";
import Dashboard from "./components/ui/page/Dashboard";
import LoginPage from "./components/ui/page/LoginPage";
import { UserContextProvider } from "./context/userContext";
import RegisterPage from "./components/ui/page/RegisterPage";

axios.defaults.baseURL = "http://localhost:4000/api/v1/";
axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;

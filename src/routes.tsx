import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/Pages/Login";
import ForgotPassword from "../src/Pages/ForgotPassword";
import Home from "../src/Pages/Home";
import ComponentsPage from "../src/Pages/ComponentsPage";
import NotImplemented from "../src/Pages/NotImplemented"; // importa a página

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/components" element={<ComponentsPage />} />

        <Route path="/not-implemented" element={<NotImplemented />} />
        <Route path="*" element={<NotImplemented />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

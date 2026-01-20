import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/Pages/Login";
import ForgotPassword from "../src/Pages/ForgotPassword";
import ResetPassword from "../src/Pages/ResetPassword";
import Home from "../src/Pages/Home";
import ComponentsPage from "../src/Pages/ComponentsPage";
import NotImplemented from "../src/Pages/NotImplemented";
import NotFound from "../src/Pages/NotFound";
import CustomerRegistration from "Pages/CustomerRegistration";
import UserRegistration from "Pages/UserRegistration";
import TransactionRegistration from "Pages/TransactionRegistration";
import ProjectRegistration from "Pages/ProjectRegistration";
import TransactionDashboard from "Pages/TransactionDashboard";
import ClientsDashboard from "Pages/ClientsDashboard";
import "./resources/globals.scss";
import Navbar from "Components/Navbar";

const AppRoutes = () => {
  return (
    <main>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register/client" element={<CustomerRegistration />} />
          <Route path="/register/user" element={<UserRegistration />} />
          <Route
            path="/register/transaction"
            element={<TransactionRegistration />}
          />
          <Route path="/project-register" element={<ProjectRegistration />} />
          <Route path="/dashboard/clients" element={<ClientsDashboard />} />
          <Route path="/dashboard/transactions" element={<TransactionDashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />n
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/not-implemented" element={<NotImplemented />} />
          {/* Rota 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default AppRoutes;

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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/transaction" element={<TransactionDashboard />} />
        <Route path="/customer-register" element={<CustomerRegistration />} />
        <Route path="/user-register" element={<UserRegistration />} />
        <Route path="/transaction-register" element={<TransactionRegistration />} />
        <Route path="/project-register" element={<ProjectRegistration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />n
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/not-implemented" element={<NotImplemented />} />
        
        {/* Rota 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

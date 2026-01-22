import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Login from "../src/Pages/Login";
import ForgotPassword from "../src/Pages/ForgotPassword";
import ConfirmationCode from "../src/Pages/ConfirmationCode";
import ResetPassword from "../src/Pages/ResetPassword";
import Home from "../src/Pages/Home";
import ComponentsPage from "../src/Pages/ComponentsPage";
import NotImplemented from "../src/Pages/NotImplemented";
import NotFound from "../src/Pages/NotFound";
import ClientRegistration from "Pages/ClientRegistration";
import UserRegistration from "Pages/UserRegistration";
import TransactionRegistration from "Pages/TransactionRegistration";
import ProjectRegistration from "Pages/ProjectRegistration";
import TransactionDashboard from "Pages/TransactionDashboard";
import ClientsDashboard from "Pages/ClientsDashboard";
import ProjectsDashboard from "Pages/ProjectsDashboard";
import "./resources/globals.scss";
import Navbar from "Components/Navbar";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="content-with-header">
        <Outlet />
      </main>
    </>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-code" element={<ConfirmationCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
            <Route path="/register/client" element={<ClientRegistration />} />
            <Route path="/register/user" element={<UserRegistration />} />
            <Route
              path="/register/transaction"
              element={<TransactionRegistration />}
            />
            <Route path="/project-register" element={<ProjectRegistration />} />
            <Route path="/dashboard/clients" element={<ClientsDashboard />} />
            <Route path="/dashboard/projects" element={<ProjectsDashboard />} />
            <Route
              path="/dashboard/transactions"
              element={<TransactionDashboard />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/not-implemented" element={<NotImplemented />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
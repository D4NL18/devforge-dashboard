// src/pages/Login/index.tsx
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password) {
      navigate("/home");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.loginButton} onClick={handleLogin}>
          Entrar
        </button>
        <button
          className={styles.linkButton}
          onClick={() => navigate("/forgot-password")}
        >
          Esqueceu a senha?
        </button>
      </div>
    </div>
  );
};

export default Login;

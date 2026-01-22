import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Input from "Components/Input";
import { loginStore } from "./store";
import { FormEvent } from "react";

const Login = observer(() => {
  const navigate = useNavigate();

  const handleLogin = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (loginStore.email && loginStore.password) {
      const success = await loginStore.login();

      if (success) {
        navigate("/home");
      }
    }
  };

  return (
    <div className={styles.background}>
      <img src="/assets/DevForge-logo-removebg.png" alt="Logo" className={styles.logo} />
      <form className={styles.card} onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={loginStore.email}
          onChange={(e) => loginStore.setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={loginStore.password}
          onChange={(e) => loginStore.setPassword(e.target.value)}
        />
        
        {loginStore.error && (
          <span style={{ color: "red", fontSize: "14px", marginBottom: "10px", display: "block" }}>
            {loginStore.error}
          </span>
        )}
        <button
          type="submit"
          className={styles.loginButton}
          disabled={loginStore.isLoading}
        >
          {loginStore.isLoading ? "Carregando..." : "Entrar"}
        </button>

        <button
          type="button"
          className={styles.linkButton}
          onClick={() => navigate("/forgot-password")}
        >
          Recuperar Senha
        </button>
      </form>
      <div className={styles.inv}></div>
    </div>
  );
});

export default Login;
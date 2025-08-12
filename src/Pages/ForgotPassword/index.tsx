import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRecover = () => {
    if (email) {
      // Integrar API de recuperação de senha
      alert(`Se existir, enviaremos um link de recuperação para: ${email}`);
      navigate("/");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <h2>Recuperar Senha</h2>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          className={styles.loginButton}
          onClick={handleRecover}
        >
          Enviar Link
        </button>
        <button
          className={styles.linkButton}
          onClick={() => navigate("/")}
        >
          Voltar ao login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;

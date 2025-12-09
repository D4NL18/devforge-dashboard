import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "Components/Input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRecover = () => {
    if (email) {
      // Integrar API de recuperação de senha
      alert(`Se existir, enviaremos um link de recuperação para: ${email}`);
      navigate("/confirm-code");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <p>Insira seu email e lhe enviaremos um código de confirmação</p>
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          className={styles.loginButton}
          onClick={handleRecover}
        >
          Enviar Código
        </button>
        <button
          className={styles.linkButton}
          onClick={() => navigate("/")}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;

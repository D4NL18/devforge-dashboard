import styles from "./index.module.scss";
import { useNavigate, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { resetPasswordStore } from "../ForgotPassword/store";

const ConfirmationCode = observer(() => {
  const navigate = useNavigate();

  if (!resetPasswordStore.emailSentSuccess) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <h2>Email Enviado!</h2>
        <p style={{ margin: "20px 0", textAlign: "center", color: "#555" }}>
          Verifique sua caixa de entrada. Enviamos um link especial para você redefinir sua senha.
        </p>
        
        <p style={{ fontSize: "12px", color: "#999" }}>
          O link expira em 1 hora.
        </p>

        <button
          className={styles.loginButton}
          onClick={() => navigate("/")}
        >
          Voltar para Login
        </button>
      </div>
    </div>
  );
});

export default ConfirmationCode;
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "Components/Input";
import { observer } from "mobx-react-lite";
import { resetPasswordStore } from "./store";

const ForgotPassword = observer(() => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleRecover = async () => {
    if (email) {
      const success = await resetPasswordStore.sendEmail(email);
      
      if (success) {
        navigate("/confirm-code");
      }
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <p>Insira seu email e lhe enviaremos um link de recuperação</p>
        
        <Input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {/* Exibe erro da store se houver */}
        {resetPasswordStore.error && (
          <span style={{color: 'red', fontSize: '14px', marginBottom: '10px', display:'block'}}>
            {resetPasswordStore.error}
          </span>
        )}

        <button
          className={styles.loginButton}
          onClick={handleRecover}
          disabled={resetPasswordStore.isLoading}
        >
          {resetPasswordStore.isLoading ? "Enviando..." : "Enviar Link"}
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
});

export default ForgotPassword;
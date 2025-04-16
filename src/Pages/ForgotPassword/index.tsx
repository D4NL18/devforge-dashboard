import styles from "./index.module.scss";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleRecover = () => {
    alert(`Email de recuperação enviado para ${email}`);
  };

  return (
    <div className={styles.container}>
      <h2>Recuperar Senha</h2>
      <input placeholder="Digite seu email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={handleRecover}>Enviar</button>
    </div>
  );
};

export default ForgotPassword;

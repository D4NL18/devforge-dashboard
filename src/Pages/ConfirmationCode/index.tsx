import { useState } from "react";
import styles from "./index.module.scss";
import Input from "Components/Input";
import { useNavigate } from "react-router-dom";

const ConfirmationCode = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleRecover = () => {
    if (code) {
      navigate("/reset-password");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <p>Confirme o código recebido</p>
        <Input
          type="text"
          placeholder="Código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button className={styles.loginButton} onClick={handleRecover}>
          Enviar Código
        </button>
        <button className={styles.linkButton} onClick={() => navigate("/")}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default ConfirmationCode;

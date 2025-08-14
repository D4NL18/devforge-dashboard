import styles from "./index.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = () => {
    if (!newPassword || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }
    // Aqui entraria a integração com a API para redefinir a senha
    alert("Senha redefinida com sucesso!");
    navigate("/"); // redireciona para login
  };

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <h2>Redefinir Senha</h2>
        <input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirme a nova senha"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button
          className={styles.loginButton}
          onClick={handleReset}
        >
          Confirmar
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

export default ResetPassword;

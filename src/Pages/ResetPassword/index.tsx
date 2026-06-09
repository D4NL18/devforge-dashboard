import Input from "Components/Input";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Hook para ler URL query params
import { observer } from "mobx-react-lite";
import { resetPasswordStore } from "../ForgotPassword/store";

const ResetPassword = observer(() => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      alert("Link inválido ou ausente.");
      navigate("/");
    }
  }, [token, navigate]);

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (token) {
        const success = await resetPasswordStore.resetPassword(newPassword, token);
        
        if (success) {
            alert("Senha redefinida com sucesso!");
            navigate("/");
        }
    }
  };

  if (!token) return null;

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <p>Atualize sua senha</p>
        
        <Input
          type="password"
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirme a nova senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        {resetPasswordStore.error && (
             <span style={{color: 'red', fontSize: '14px', marginBottom: '10px', display:'block'}}>
             {resetPasswordStore.error}
           </span>
        )}

        <button 
            className={styles.loginButton} 
            onClick={handleReset}
            disabled={resetPasswordStore.isLoading}
        >
          {resetPasswordStore.isLoading ? "Confirmando..." : "Confirmar"}
        </button>
        
        <button className={styles.linkButton} onClick={() => navigate("/")}>
          Cancelar
        </button>
      </div>
    </div>
  );
});

export default ResetPassword;
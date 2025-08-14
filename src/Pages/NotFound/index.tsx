import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <h1>404</h1>
        <p>Página não encontrada.</p>
        <button onClick={() => navigate("/")}>
          Voltar para o início
        </button>
      </div>
    </div>
  );
};

export default NotFound;

import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const NotImplemented = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>🚧 Página não implementada ainda</h1>
      <p>Esta funcionalidade está em desenvolvimento.</p>
      <button
        className={styles.backButton}
        onClick={() => navigate(-1)} // volta para a página anterior
      >
        Voltar
      </button>
    </div>
  );
};

export default NotImplemented;

import styles from "./index.module.scss";
import Button from "Components/Button";

interface CRUDButtonsProps {
  onCancel: () => void;
}

export default function CRUDButtons({ onCancel }: CRUDButtonsProps) {
  
  return (
    <div className={styles.CRUDButtons}>
      <Button
        text="Cancelar"
        size="medium"
        onClick={onCancel}
        bgColor="#FFFFFF"
        color="#000000"
      />
      <Button
        text="Confirmar"
        size="medium"
        bgColor="#14870C"
        color="#FFFFFF"
        type="submit"
      />
    </div>
  );
}

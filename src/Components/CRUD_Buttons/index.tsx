import styles from "./index.module.scss";
import Button from "Components/Button";

export default function CRUDButtons() {
  return (
    <div className={styles.CRUDButtons}>
      <Button
        text="Cancelar"
        size="medium"
        onClick={() => console.log("clicked")}
        bgColor="#FFFFFF"
        color="#000000"
      />
      <Button
        text="Confirmar"
        size="medium"
        onClick={() => console.log("clicked")}
        bgColor="#14870C"
        color="#FFFFFF"
      />
    </div>
  );
}

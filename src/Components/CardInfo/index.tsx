import styles from "./index.module.scss";
import { IoIosWarning } from "react-icons/io";

interface CardInfoProps {
  title: string;
  value: string | number;
  hasWarning?: boolean;
}

export default function CardInfo({ title, value, hasWarning }: CardInfoProps) {
  return (
    <div className={styles.cardInfo}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
      {hasWarning ? <IoIosWarning className={styles.icon} />: null}
    </div>
  );
}

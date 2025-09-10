import styles from './index.module.scss';

interface CardInfoProps {
    title: string;
    value: string | number;
}

export default function CardInfo({title, value}: CardInfoProps) {
  return (
    <div className={styles.cardInfo}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}
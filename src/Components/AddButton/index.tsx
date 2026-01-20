import styles from "./index.module.scss";

interface AddButtonProps {
    onClick?: () => void;
}

export default function AddButton({onClick}: AddButtonProps) {
    return (
        <button className={styles.addButtonComponent} onClick={onClick}>
            <span>+</span>
        </button>
    )
}
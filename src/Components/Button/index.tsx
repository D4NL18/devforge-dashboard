import styles from "./index.module.scss";

interface ButtonProps {
    text: string;
    bgColor?: string;
    color?: string;
    size: "small" | "medium" | "large";
    onClick: () => void;
}

export default function Button({text, bgColor, color, size, onClick}: ButtonProps) {
    return (
        <button
            className={styles.buttonComponent}
            style={{
                backgroundColor: bgColor? bgColor : "transparent",
                color: color? color : "black",
                fontSize: size === "small" ? "0.75rem" : size === "medium" ? "1rem" : "1.25rem",
                padding: `0.75rem ${size === "small" ? "3.5rem" : size === "medium" ? "5rem" : "6rem"}`,
            }} 
            onClick={onClick}
            >
            <span>{text}</span>
        </button>
    )
}
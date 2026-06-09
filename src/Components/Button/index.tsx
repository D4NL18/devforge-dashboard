import styles from "./index.module.scss";

interface ButtonProps {
    text: string;
    bgColor?: string;
    color?: string;
    size: "small" | "medium" | "large";
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

export default function Button({text, bgColor, color, size, onClick, type}: ButtonProps) {
    return (
        <button
            className={styles.buttonComponent}
            style={{
                backgroundColor: bgColor? bgColor : "transparent",
                color: color? color : "black",
                fontSize: size === "small" ? "0.75rem" : size === "medium" ? "1rem" : "1.25rem",
                padding: `0.75rem ${size === "small" ? "3.5rem" : size === "medium" ? "5rem" : "6rem"}`,
                border: (!bgColor || bgColor === "transparent" || bgColor === "#FFFFFF" || bgColor === "#FFF" || bgColor === "white") ? "1px solid #000000" : "none",
            }} 
            onClick={onClick}
            type={type ? type : "button"}
            >
            <span>{text}</span>
        </button>
    )
}
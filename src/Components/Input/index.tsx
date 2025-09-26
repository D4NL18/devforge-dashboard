import React, { useRef } from "react";
import styles from "./index.module.scss";
import { FaRegCalendarAlt } from "react-icons/fa";

type InputProps = {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const Input = ({ type, placeholder, value, onChange, required }: InputProps) => {
  if (type === "date") {
    const dateInputRef = useRef<HTMLInputElement>(null);

    const handleWrapperClick = () => {
      dateInputRef.current?.showPicker();
    };

    const wrapperClassName = value
      ? styles.dateInputWrapper
      : `${styles.dateInputWrapper} ${styles.noValue}`;

    return (
      <div className={wrapperClassName} onClick={handleWrapperClick}>
        <input
          ref={dateInputRef}
          className={styles.input}
          type="date"
          value={value}
          onChange={onChange}
          required={required}
          onKeyDown={(e) => e.preventDefault()}
        />
        <span className={styles.placeholderText}>{placeholder}</span>
        <FaRegCalendarAlt className={styles.calendarIcon} />
      </div>
    );
  }
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;


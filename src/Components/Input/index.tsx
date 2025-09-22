import React, { useRef } from "react";
import styles from "./index.module.scss";
import { FaRegCalendarAlt } from "react-icons/fa";

type InputProps = {
  type: "text" | "date" | "number" | string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const Input = ({ type, placeholder, value, onChange, required }: InputProps) => {
  if (type === "date") {
    // Cria uma referência para o elemento input da data.
    const dateInputRef = useRef<HTMLInputElement>(null);

    // Esta função é chamada quando o contêiner (div) é clicado.
    const handleWrapperClick = () => {
      // Se a referência estiver conectada ao input, chama o método showPicker().
      // Este método abre o seletor de data nativo do navegador.
      dateInputRef.current?.showPicker();
    };

    // Uma classe é adicionada ao contêiner quando não há valor,
    // permitindo ao CSS mostrar o placeholder personalizado.
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
          // Impede que o usuário digite no campo de data.
          onKeyDown={(e) => e.preventDefault()}
        />
        {/* Este span atua como nosso placeholder personalizado */}
        <span className={styles.placeholderText}>{placeholder}</span>
        {/* Ícone importado da biblioteca react-icons */}
        <FaRegCalendarAlt className={styles.calendarIcon} />
      </div>
    );
  }

  /**
   * Para todos os outros tipos de input, renderiza um elemento input padrão.
   */
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


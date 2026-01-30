import styles from "./index.module.scss";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

type BaseProps = {
  placeholder?: string;
  hasSearch?: boolean;
  options: string[];
  selectAll?: boolean;
  onSubmit?: (values: string[]) => void;
};

type SingleSelectProps = BaseProps & {
  multiple?: false;
  defaultValue?: number;
};

type MultiSelectProps = BaseProps & {
  multiple: true;
  defaultValue?: number[];
};

type SelectProps = SingleSelectProps | MultiSelectProps;

const Select = ({
  placeholder,
  options,
  hasSearch,
  multiple,
  selectAll,
  onSubmit,
  defaultValue,
}: SelectProps) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  
  const isFirstRender = useRef(true);

  // Sincroniza valor inicial
  useEffect(() => {
    if (defaultValue !== undefined) {
      if (multiple) {
        const arr = (defaultValue as number[])
          .filter((i) => i >= 0 && i < options.length)
          .map((i) => options[i]);
        setSelected(arr);
      } else {
        const i = defaultValue as number;
        if (i >= 0 && i < options.length) {
          setSelected([options[i]]);
        }
      }
    }
  }, [defaultValue, multiple, options]);

  // Auto-Submit com Debounce de 1s
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onSubmit?.(selected);
      // Removido: setIsOpen(false) para manter o menu aberto
    }, 1000);

    return () => clearTimeout(timer);
  }, [selected, onSubmit]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  function handleCheckboxChange(option: string) {
    if (selectAllChecked) setSelectAllChecked(false);

    if (multiple) {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    } else {
      setSelected((prev) => (prev.includes(option) ? [] : [option]));
    }
  }

  function handleSelectAllChange() {
    const newState = !selectAllChecked;
    setSelectAllChecked(newState);
    setSelected(newState ? [...options] : []);
  }

  function getPlaceholderText() {
    if (!multiple && selected.length) {
      return selected[0];
    } else if (multiple && selected.length) {
      return `${selected.length} selecionado(s)`;
    } else if (placeholder) {
      return placeholder;
    } else {
      return multiple ? "Selecione opções" : "Selecione uma opção";
    }
  }

  return (
    <details
      className={styles.select}
      open={isOpen}
      onToggle={(e) => setIsOpen(e.currentTarget.open)}
    >
      <summary>
        {getPlaceholderText()}
        <FaChevronDown className={styles.arrowIcon} />
      </summary>
      <div className={styles.form}>
        {hasSearch && (
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Buscar..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <CiSearch className={styles.icon} />
          </div>
        )}
        <div className={styles.optionsContainer}>
          {selectAll && multiple && (
            <li className={styles.option}>
              <input
                type="checkbox"
                id="select-all"
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
              />
              <label htmlFor="select-all">Selecionar Todos</label>
            </li>
          )}
          {filteredOptions.map((option, index) => (
            <li className={styles.option} key={index}>
              <input
                type="checkbox"
                id={`option-${index}`}
                checked={selected.includes(option)}
                disabled={selectAllChecked}
                onChange={() => handleCheckboxChange(option)}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </li>
          ))}
        </div>
      </div>
    </details>
  );
};

export default Select;
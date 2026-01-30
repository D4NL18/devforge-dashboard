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
  const onSubmitRef = useRef(onSubmit);

  useEffect(() => {
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  useEffect(() => {
    if (defaultValue !== undefined) {
      const newSelected = multiple
        ? (defaultValue as number[]).map((i) => options[i]).filter(Boolean)
        : [options[defaultValue as number]].filter(Boolean);

      if (JSON.stringify(newSelected) !== JSON.stringify(selected)) {
        setSelected(newSelected);
      }
    }
  }, [defaultValue, multiple, options]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onSubmitRef.current?.(selected);
    }, 1500); 

    return () => clearTimeout(timer);
  }, [selected]);

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
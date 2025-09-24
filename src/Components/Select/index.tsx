import Input from "Components/Input";
import styles from "./index.module.scss";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

type SelectProps = {
  placeholder?: string;
  hasSearch?: boolean;
  options: string[];
  multiple?: boolean;
  selectAll?: boolean;
  onSubmit?: (values: string[]) => void;
};

const Select = ({
  placeholder,
  options,
  hasSearch,
  multiple,
  selectAll,
  onSubmit,
}: SelectProps) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(search.toLowerCase())
  );

  function handleCheckboxChange(option: string) {
    if (selectAllChecked) return;

    if (multiple) {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    } else {
      setSelected(
        (prev) => (prev.includes(option) ? [] : [option])
      );
    }
  }

  function handleSelectAllChange() {
    const newState = !selectAllChecked;
    setSelectAllChecked(newState);
    setSelected(newState ? [...options] : []);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit?.(selected);
    setIsOpen(false);
  }

  function getPlaceholderText() {
    if (!multiple && selected.length) {
      return selected[0];
    } else if (multiple && selected.length) {
      return `${selected.length} option(s) selected`;
    } else if (placeholder) {
      return placeholder;
    } else if (!multiple) {
      return "Select an option";
    } else {
      return "Select options";
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
      <form onSubmit={(e) => handleSubmit(e)}>
        <div
          className={styles.inputContainer}
          style={{ display: hasSearch ? "flex" : "none" }}
        >
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CiSearch className={styles.icon} />
        </div>
        <div className={styles.optionsContainer}>
          {selectAll && multiple && (
            <li className={styles.option}>
              <input
                type="checkbox"
                id="select-all"
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
              />
              <label htmlFor="select-all">Select All</label>
            </li>
          )}
          {filteredOptions.map((option, index) => (
            <li className={styles.option} key={index}>
              <input
                type="checkbox"
                id={`option-${index}`}
                checked={selected.includes(option)}
                disabled={
                  (!multiple &&
                    selected.length > 0 &&
                    !selected.includes(option)) ||
                  selectAllChecked
                }
                onChange={() => handleCheckboxChange(option)}
              />
              <label>{option}</label>
            </li>
          ))}
          <input type="submit" value="Submit" />
        </div>
      </form>
    </details>
  );
};

export default Select;

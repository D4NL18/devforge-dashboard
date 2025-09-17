import styles from "./index.module.scss";
import { IoIosSearch } from "react-icons/io";

type SearchbarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Searchbar = ({ placeholder, value, onChange }: SearchbarProps) => {
  return (
    <div className={styles.searchbarContainer}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <IoIosSearch className={styles.icon} />
    </div>
  );
};

export default Searchbar;

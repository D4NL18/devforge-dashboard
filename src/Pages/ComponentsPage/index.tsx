import styles from "./index.module.scss";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

import PaginatedTable from "../../Components/PaginatedTable";
import Button from "Components/Button";
import CRUDButtons from "Components/CRUD_Buttons";
import { useNavigate } from "react-router-dom";
import RangeInput from "Components/RangeInput";
import { useState } from "react";
import Input from "Components/Input";
import Searchbar from "Components/Searchbar";
import CardInfo from "Components/CardInfo";

const ComponentsPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(0);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Navbar />
      <h2>📦 Componentes</h2>

       
      <Footer />
    </div>
  );
};

export default ComponentsPage;

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
import Select from "Components/Select";

type User = {
  id: number;
  name: string;
  email: string;
  type: "in" | "out";
  bold?: boolean;
};

let options = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
  "Option 8",
  "Option 9",
  "Option 10 Option 10 Option 10 Option 10 Option 10 Option 10",
  "Option 11",
  "Option 12",
  "Option 13",
  "Option 14",
  "Option 15",
  "Option 16",
  "Option 17",
  "Option 18",
];

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
      <Select
        options={options}
        hasSearch
        multiple
        selectAll
        // placeholder="Placeholder teste"
        onSubmit={(values) => console.log("Selecionados:", values)}
      />
      {/* <Select options={options}/> */}

      <PaginatedTable
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Nome" },
          { key: "email", label: "Email" },
        ]}
        data={[
          { id: 1, name: "Alice", email: "alice@email.com", bold: true },
          { id: 2, name: "Bob", email: "bob@email.com" },
          { id: 3, name: "Carol", email: "carol@email.com" },
          { id: 4, name: "Dan", email: "dan@email.com" },
          { id: 5, name: "Eve", email: "eve@email.com" },
          { id: 6, name: "Frank", email: "frank@email.com", bold: true },
        ]}
        rowsPerPage={4}
      />
      <PaginatedTable<User>
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Nome" },
          { key: "email", label: "Email" },
        ]}
        data={[
          { id: 1, name: "Alice", email: "alice@email.com", type: "in" },
          {
            id: 2,
            name: "Bob",
            email: "bob@email.com",
            type: "out",
            bold: true,
          },
          { id: 3, name: "Carol", email: "carol@email.com", type: "in" },
          { id: 4, name: "Dan", email: "dan@email.com", type: "out" },
          {
            id: 5,
            name: "Eve",
            email: "eve@email.com",
            type: "in",
            bold: true,
          },
          { id: 6, name: "Frank", email: "frank@email.com", type: "out" },
        ]}
        rowsPerPage={4}
        edit
        onEdit={(user) => alert(`Editar usuário: ${user.name}`)}
        delete
        onDelete={(user) => alert(`Excluir usuário: ${user.name}`)}
        inOut
      />

      <Footer />
    </div>
  );
};

export default ComponentsPage;

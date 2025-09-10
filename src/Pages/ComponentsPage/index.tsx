import styles from "./index.module.scss";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

import PaginatedTable from "../../Components/PaginatedTable";
import Input from "Components/Input";
import Searchbar from "Components/Searchbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RangeInput from "Components/RangeInput";

const ComponentsPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Navbar />
      <h2>📦 Componentes</h2>

      <section>
        <h3>Tabela de Usuários</h3>
        <PaginatedTable
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "Nome" },
            { key: "email", label: "Email" },
          ]}
          data={[
            { id: 1, name: "Alice", email: "alice@email.com" },
            { id: 2, name: "Bob", email: "bob@email.com" },
            { id: 3, name: "Carol", email: "carol@email.com" },
            { id: 4, name: "Dan", email: "dan@email.com" },
            { id: 5, name: "Eve", email: "eve@email.com" },
            { id: 6, name: "Frank", email: "frank@email.com" },
          ]}
          rowsPerPage={4}
        />
      </section>
      <section className={styles.section}>
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Searchbar
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <RangeInput />
      </section>
      <Footer />
    </div>
  );
};

export default ComponentsPage;

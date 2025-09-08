import styles from "./index.module.scss";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

import PaginatedTable from "../../Components/PaginatedTable";

const ComponentsPage = () => {

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
            { key: "email", label: "Email" }
          ]}
          data={[
            { id: 1, name: "Alice", email: "alice@email.com" },
            { id: 2, name: "Bob", email: "bob@email.com" },
            { id: 3, name: "Carol", email: "carol@email.com" },
            { id: 4, name: "Dan", email: "dan@email.com" },
            { id: 5, name: "Eve", email: "eve@email.com" },
            { id: 6, name: "Frank", email: "frank@email.com" }
          ]}
          rowsPerPage={4}
        />
      </section>
      <Footer />
    </div>
  );
};

export default ComponentsPage;

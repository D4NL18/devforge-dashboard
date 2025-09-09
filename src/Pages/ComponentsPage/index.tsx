import styles from "./index.module.scss";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

import PaginatedTable from "../../Components/PaginatedTable";

type User = {
  id: number;
  name: string;
  email: string;
  type: "in" | "out";
};

const ComponentsPage = () => {

  return (
    <div className={styles.container}>
      <Navbar />
      <h2>📦 Componentes</h2>
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
      <PaginatedTable<User>
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Nome" },
          { key: "email", label: "Email" }
        ]}
        data={[
          { id: 1, name: "Alice", email: "alice@email.com", type: "in" },
          { id: 2, name: "Bob", email: "bob@email.com", type: "out" },
          { id: 3, name: "Carol", email: "carol@email.com", type: "in" },
          { id: 4, name: "Dan", email: "dan@email.com", type: "out" },
          { id: 5, name: "Eve", email: "eve@email.com", type: "in" },
          { id: 6, name: "Frank", email: "frank@email.com", type: "out" }
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

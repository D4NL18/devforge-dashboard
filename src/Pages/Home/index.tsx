import styles from "./index.module.scss";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Store } from "./store";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Button from "../../Components/Button";

const Home = observer(() => {
  const store = useLocalObservable(() => new Store());

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>
        <h1>Bem-vindo ao Dashboard</h1>
          Clique: {store.counter}
        <Button text="Confirmar" size="medium" onClick={() => store.increment()} bgColor="#14870C" color="#FFFFFF" />
        <Button text="Cancelar" size="medium" onClick={() => store.decrement()} bgColor="#FFF" color="#000" />
      </main>
      <Footer />
    </div>
  );
});

export default Home;

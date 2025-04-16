import styles from "./index.module.scss";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Store } from "./store";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const Home = observer(() => {
  const store = useLocalObservable(() => new Store());

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.content}>
        <h1>Bem-vindo ao Dashboard</h1>
        <button onClick={() => store.increment()}>
          Clique: {store.counter}
        </button>
      </main>
      <Footer />
    </div>
  );
});

export default Home;

import styles from "./index.scss";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Store } from "./store";

const Home = observer(() => {
  const store = useLocalObservable(() => new Store());

  return (
    <div className={styles.container}>
      <h1>Bem-vindo ao Dashboard</h1>
      <button onClick={() => store.increment()}>
        Clique: {store.counter}
      </button>
    </div>
  );
});

export default Home;

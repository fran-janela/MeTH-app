import { Footer } from "../components/footer";
import styles from "../styles/Home.module.css";
import { Toolbar } from "../components/toolbar";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Toolbar />
      <main className={styles.main}></main>
      <Footer />
    </div>
  );
};

export default Home;

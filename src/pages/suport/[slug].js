import { Footer } from "../../components/footer";
import styles from "../../styles/Suport.module.css";
import { Toolbar } from "../../components/toolbar";

export const Suport = ({ slug }) => {
  return (
    <>
      <div className={styles.container}>
        <Toolbar />
        <main className={styles.main}></main>
        <Footer />
      </div>
    </>
  );
};

export default Suport;

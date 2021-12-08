import { Footer } from "../../components/footer";
import { Toolbar } from "../../components/toolbar";
import styles from "../../styles/Suport.module.css";
import { useRouter } from "next/router";
import { EmailForm } from "../../components/emailForm";

export const Suport = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <div className={styles.container}>
        <Toolbar />
        <main className={styles.main}>
          <EmailForm />
          <div className={styles.changeSuport}>
            <button
              className={`${styles.btn} ${styles.btnChangeSlug}`}
              onClick={() => router.push("/suport/chat")}
            >
              CHAT
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Suport;

import { Footer } from "../../components/footer";
import styles from "../../styles/Suport.module.css";
import { Toolbar } from "../../components/toolbar";
import { useRouter } from "next/router";
import { EmailForm } from "../../components/emailForm";

export const Suport = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (slug === "chat") {
    return (
      <>
        <div className={styles.container}>
          <Toolbar />
          <main className={styles.main}>
            <p>Lugar para o CHAT!</p>
            <div className={styles.changeSuport}>
              <button
                className={`${styles.btn} ${styles.btnChangeSlug}`}
                onClick={() => router.push("/suport/email")}
              >
                EMAIL
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }
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

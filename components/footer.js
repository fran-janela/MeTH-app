import Image from "next/image";
import styles from "../styles/components/Footer.module.css";

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <a
          href="https://pt.wikipedia.org/wiki/E_(constante_matem%C3%A1tica)"
          target="_blank"
          rel="noopener noreferrer"
        >
          Meth app{" "}
          <span className={styles.logo}>
            <Image src="/logo.svg" alt="Vercel Logo" width={20} height={20} />
          </span>
        </a>
      </footer>
    </>
  );
};

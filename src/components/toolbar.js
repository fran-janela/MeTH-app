import { useRouter } from "next/router";
import styles from "../styles/components/Toolbar.module.css";

export const Toolbar = () => {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div onClick={() => router.push("/")}>Home</div>
      <div onClick={() => router.push("/suport/email")}>Suport</div>
      <div onClick={() => router.push("/credits")}>Credits</div>
    </div>
  );
};

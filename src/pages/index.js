import { Footer } from "../components/footer";
import styles from "../styles/Home.module.css";
import { Toolbar } from "../components/toolbar";
import { useState } from "react";
import Head from "next/head";

export const Home = () => {
  const [currentOperand, setCurrentOperand] = useState("");
  const [previousOperand, setPreviousOperand] = useState("");
  const [operation, setOperation] = useState("");

  async function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) {
      console.log("NOP");
    } else {
      const newNumber = currentOperand + number.toString();
      setCurrentOperand(newNumber);
    }
  }

  async function deleteNumber() {
    setCurrentOperand(currentOperand.toString().slice(0, -1));
  }

  async function clearAll() {
    setCurrentOperand("");
    setPreviousOperand("");
    setOperation("");
  }

  async function invertCurrent() {
    if (currentOperand.includes("-")) {
      if (currentOperand.length > 1) {
        setCurrentOperand(
          currentOperand.toString().slice(1, currentOperand.length)
        );
      } else {
        setCurrentOperand("");
      }
    } else {
      setCurrentOperand("-" + currentOperand.toString());
    }
  }

  async function chooseOperation(operant) {
    if (currentOperand === "" && previousOperand === "") {
      return;
    }
    if (previousOperand === "") {
      setOperation(" " + operant);
      setPreviousOperand(currentOperand);
    } else if (previousOperand != "" && currentOperand === "") {
      setOperation(" " + operant);
    } else if (previousOperand != "" && currentOperand != "") {
      const result = compute();
      setOperation(" " + operant);
      setPreviousOperand(result);
    }
    setCurrentOperand("");
  }

  function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    // console.log(current, prev, operation, "ENTRADA");
    if (operation.includes("+")) {
      computation = prev + current;
    } else if (operation.includes("-")) {
      computation = prev - current;
    } else if (operation.includes("*")) {
      computation = prev * current;
    } else if (operation.includes("÷")) {
      computation = prev / current;
    } else {
      return;
    }
    // console.log(computation, "OUTPUT");
    setCurrentOperand(computation.toString());
    setOperation("");
    setPreviousOperand("");
    return computation;
  }

  return (
    <>
      <Head>
        <title>MeTH</title>
        <meta name="description" content="math app with e from euler" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <div className={styles.container}>
        <Toolbar />
        <main className={styles.main}>
          <div className={styles.calculatorGrid}>
            <div className={styles.output}>
              <div className={styles.previousOperand}>
                {previousOperand + operation}
              </div>
              <div className={styles.currentOperand}>{currentOperand}</div>
            </div>
            <button
              className={`${styles.btn} ${styles.btnDisplayFunctions}`}
              onClick={() => clearAll()}
            >
              AC
            </button>
            <button
              className={`${styles.btn} ${styles.btnDisplayFunctions}`}
              onClick={() => invertCurrent()}
            >
              ±
            </button>
            <button
              className={`${styles.btn} ${styles.btnDisplayFunctions}`}
              onClick={() => deleteNumber()}
            >
              DEL
            </button>
            <button
              className={`${styles.btn} ${styles.btnOperations}`}
              onClick={() => chooseOperation("÷")}
            >
              ÷
            </button>
            <button className={styles.btn} onClick={() => appendNumber(1)}>
              1
            </button>
            <button className={styles.btn} onClick={() => appendNumber(2)}>
              2
            </button>
            <button className={styles.btn} onClick={() => appendNumber(3)}>
              3
            </button>
            <button
              className={`${styles.btn} ${styles.btnOperations}`}
              onClick={() => chooseOperation("*")}
            >
              *
            </button>
            <button className={styles.btn} onClick={() => appendNumber(4)}>
              4
            </button>
            <button className={styles.btn} onClick={() => appendNumber(5)}>
              5
            </button>
            <button className={styles.btn} onClick={() => appendNumber(6)}>
              6
            </button>
            <button
              className={`${styles.btn} ${styles.btnOperations}`}
              onClick={() => chooseOperation("+")}
            >
              +
            </button>
            <button className={styles.btn} onClick={() => appendNumber(7)}>
              7
            </button>
            <button className={styles.btn} onClick={() => appendNumber(8)}>
              8
            </button>
            <button className={styles.btn} onClick={() => appendNumber(9)}>
              9
            </button>
            <button
              className={`${styles.btn} ${styles.btnOperations}`}
              onClick={() => chooseOperation("-")}
            >
              -
            </button>
            <button
              className={`${styles.btn} ${styles.spanTwo}`}
              onClick={() => appendNumber(0)}
            >
              0
            </button>
            <button className={styles.btn} onClick={() => appendNumber(".")}>
              .
            </button>
            <button
              onClick={() => compute()}
              className={`${styles.btn} ${styles.btnOperations}`}
            >
              =
            </button>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/components/EmailForm.module.css";

export const EmailForm = () => {
  const router = useRouter();
  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target[0].value);    Subject
    // console.log(event.target[1].value);    Body
    const myApiResponse = await axios
      .post(
        `http://ec2-3-137-191-178.us-east-2.compute.amazonaws.com/email/send/`,
        {
          subject: event.target[0].value,
          body: event.target[1].value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data)
      .then((e) => console.log(e))
      .catch(() => null);
    router.push("/");
  }

  return (
    <>
      <div className={styles.emailFormContainer}>
        <form className={styles.emailForm} onSubmit={handleSubmit}>
          <div className={styles.subjectContainer}>
            <label>Subject</label>
            <input className={styles.subjectInput} name="subject"></input>
          </div>
          <div className={styles.bodyContainer}>
            <label>Body</label>
            <textarea className={styles.bodyTextArea} name="body"></textarea>
          </div>
          <div className={styles.buttonContainer}>
            <button
              onClick={() => router.push("/")}
              className={`${styles.btn} ${styles.cancel}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.btn} ${styles.submitForm}`}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

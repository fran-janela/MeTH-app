/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { Footer } from "../../components/footer";
import { Toolbar } from "../../components/toolbar";
import styles from "../../styles/Admin.module.css";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../sevices/api";
import { signin } from "../../contexts/AuthContext";
import Image from "next/image";
import blue_check from "../../../public/check_blue.png";
import black_check from "../../../public/check_black.png";

const DELAY = 3;

export default function Admin() {
  const { "api.accessToken": accessToken } = parseCookies();
  const token = accessToken;
  const { register, handleSubmit } = useForm();
  const [reload, setReload] = useState();

  // login
  const [error, setError] = useState(null);

  async function handleSignIn(data) {
    const response = await signin(data);
    if (response) setError(response.data);
  }

  //

  function is_read(info) {
    if (info) {
      return (
        <div className={styles.CheckContainer}>
          <Image alt="Covisiion Logo" src={blue_check} height={10} width={10} />
          <Image alt="Covisiion Logo" src={blue_check} height={10} width={10} />
        </div>
      );
    } else {
      return (
        <div className={styles.CheckContainer}>
          <Image
            alt="Covisiion Logo"
            src={black_check}
            height={10}
            width={10}
          />
        </div>
      );
    }
  }
  const [user, setUser] = useState();
  useEffect(() => {
    async function loadUser() {
      try {
        const response = await api.get(`/auth/users/me`);

        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (token) loadUser();
  }, [token]);

  const [clients, setClients] = useState([]);
  const [click, setClick] = useState(false);
  useEffect(() => {
    async function loadClients() {
      try {
        const response = await api.get(`/auth/users/`);

        setClients(response.data);
        setReload(true);
      } catch (error) {
        console.log(error);
      }
    }
    if (token) loadClients();
  }, [token, click]);

  // chat
  const [clientId, setClientId] = useState();
  const [clientUsername, setClientUsername] = useState();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function loadMsgs(clientId) {
      try {
        const { data: response } = await api.get(
          `/messages/${user.id}/${clientId}/`
        );
        setMessages(response);
        for (let i in clients) {
          if (clients[i].id.toString() === clientId) {
            setClientUsername(clients[i].username);
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (token && user) loadMsgs(clientId);
    setReload(false);
  }, [reload]);

  async function sendMsg(data) {
    try {
      const userName = user.username;
      const { data: response } = await api.post(`/messages/send/`, {
        sender: userName,
        receiver: clientUsername,
        message: data["msg"],
      });
      setReload(true);
    } catch (error) {
      console.log(error);
    }
  }

  function chatLayout(msg, i) {
    if (msg.receiver === user.username) {
      return (
        <div key={i} className={styles.leftChatBubble}>
          <p className={styles.content}>{msg.message}</p>
          <div className={styles.leftInfos}>
            <p className={styles.leftMsgTime}>{msg.timestamp.split("T")[0]}</p>
          </div>
        </div>
      );
    }
    return (
      <div key={i} className={styles.rightChatBubble}>
        <p className={styles.content}>{msg.message}</p>
        <div className={styles.rightInfos}>
          <p className={styles.rightMsgTime}>{msg.timestamp.split("T")[0]}</p>
          <div className={styles.rightMsgSeen}>{is_read(msg.is_read)}</div>
        </div>
      </div>
    );
  }

  var cnt = 0;
  useEffect(() => {
    if (cnt === 0) {
      const intervalId = setInterval(() => setReload(true), 1000 * DELAY);
      return () => clearInterval(intervalId);
    }
    cnt++;
  }, []);

  // ----

  if (!user)
    return (
      <>
        <Head>
          <title>LogIn</title>
          <meta name="description" content="Admin login form" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toolbar />
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
            <p>Sign In</p>
            <input
              {...register("email")}
              type="email"
              name="email"
              placeholder="E-mail"
              required
            />
            <input
              {...register("password")}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            {error && (
              <div className={styles.errorBox}>
                {Object.values(error).map((e, i) => (
                  <p key={`error_${i}`}>{e[0]}</p>
                ))}
              </div>
            )}
            <button type="submit">Sign In</button>
          </form>
        </div>
        <Footer />
      </>
    );
  else
    return (
      <>
        <Head>
          <title>Admin Chat</title>
          <meta name="description" content="Chat" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toolbar />
        <div className={styles.selectContainer}>
          <select
            className={styles.select}
            name="client_id"
            id="client_id"
            onClick={() => {
              setClick(!click);
            }}
            onChange={(e) => {
              setClientId(e.target.value);
              setReload(true);
            }}
          >
            <option selected="selected">Select a user</option>
            {clients.map((a, i) => {
              return (
                <option key={i} value={a.id}>
                  {a.username}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.chatContainer}>
          {messages.map((m, i) => {
            return chatLayout(m, i);
          })}
        </div>
        <form className={styles.sendMsg} onSubmit={handleSubmit(sendMsg)}>
          <input
            className={styles.inputMsg}
            type="text"
            {...register("msg")}
            id="msg"
            name="msg"
            placeholder="Message"
          />
          <button
            type="submit"
            onClick={() => (document.getElementById("msg").value = "")}
          >
            Send
          </button>
        </form>
        <Footer />
      </>
    );
}

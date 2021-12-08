/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { Footer } from "../../components/footer";
import { Toolbar } from "../../components/toolbar";
import styles from "../../styles/Chat.module.css";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { logOut, signin, signUp } from "../../contexts/AuthContext";
import { api } from "../../sevices/api";

const DELAY = 3;

export default function Chat() {
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

    async function handleSignUp(data) {
        const response = await signUp(data);
        if (response) setError(response.data);
    }

    //


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
        if (token)
            loadUser();
    }, [token]);


    // chat
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        async function loadMsgs() {
            try {
                const { data: response } = await api.get(`/messages/${user.id}/1/`);
                setMessages(response);
            } catch (error) {
                console.log(error);
            }
        }
        if (token && user)
            loadMsgs();
        setReload(false);
    }, [reload]);


    async function sendMsg(data) {
        try {
            const userName = user.username;
            const { data: response } = await api.post(`/messages/send/`, {
                "sender": userName,
                "receiver": 'admin',
                "message": data['msg']
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
                        <p className={styles.leftMsgTime}>{msg.timestamp}</p>
                    </div>
                </div>
            )
        }
        return (
            <div key={i} className={styles.rightChatBubble}>
                <p className={styles.content}>{msg.message}</p>
                <div className={styles.rightInfos}>
                    <p className={styles.rightMsgTime}>{msg.timestamp}</p>
                    <p className={styles.rightMsgSeen}>Seen - {msg.is_read.toString()}</p>
                </div>
            </div>
        )
    }

    var cnt = 0;
    useEffect(() => {
        if (cnt === 0) {
            const intervalId = setInterval(() => setReload(true), 1000 * DELAY)
            return () => clearInterval(intervalId);
        }
        cnt++;
    }, [])

    // ----

    const [togle, setTogle] = useState(false);

    if (!user)
        return (
            <>
                <Head>
                    <title>Registration</title>
                    <meta name="description" content="Registration" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Toolbar />
                <div className={styles.container}>
                    {togle && (
                        <>
                            <form className={styles.form} onSubmit={handleSubmit(handleSignUp)}>
                                <p>Sign Up</p>
                                <input
                                    {...register("username")}
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    required
                                />
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
                                <button type="submit">Sign Up</button>
                            </form>
                        </>
                    )}
                    {!togle && (
                        <>
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
                        </>
                    )}
                    <div className={styles.toggle}>
                        <button onClick={() => setTogle(!togle)}>Toggle</button>
                    </div>
                </div>
                <Footer />
            </>
        )
    else
        return (
            <>
                <Head>
                    <title>Chat</title>
                    <meta name="description" content="Chat" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Toolbar />
                <div className={styles.chatContainer} id="bottom">
                    {messages.map((m, i) => {
                        return chatLayout(m, i);
                    })}
                </div>
                <form className={styles.sendMsg} onSubmit={handleSubmit(sendMsg)}>
                    <input className={styles.inputMsg} type='text' {...register('msg')} id='msg' name='msg' placeholder='Message' />
                    <button type="submit" onClick={() => { document.getElementById("msg").value = ""; document.getElementById('bottom').scrollIntoView(); }}>Send</button>
                </form>
                <Footer />
            </>
        )
}

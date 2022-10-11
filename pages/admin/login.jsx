import Head from "next/head";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import { useAdmin } from "../../lib/context/admin";
import { toastConfig } from "../../lib/helper/toast";
import styles from "../../styles/admin_login.module.scss";

const Home = () => {
  const { isAuthenticated, login, loading, errorMessage } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    login({ username, password });
  };

  useEffect(() => {
    if (!!errorMessage){
      toast.error(errorMessage, toastConfig)
    }
  }, [errorMessage])

  useEffect(() => {
    if (!loading && isAuthenticated) {
      window.location = '/admin'
    }
  }, [isAuthenticated])

  if (loading) {
    return <p>Loading... 🙏🏻</p>
  }
  
  return (
    <>
      <ToastContainer />
      <Head>
        <title>Login Admin</title>
      </Head>
      <div id={styles.main}>
        <section id={styles.hero}>
          <h1 className={styles.title}>Pemilihan Ketua RW 12</h1>
          <h2>
            Official website pemilihan ketua RW 12 Alam Hijau Lestari 2022
          </h2>
        </section>
        <section id={styles.content}>
          <div className={styles.inputBox}>
            <h1>Login Admin</h1>
            <h4>Masukkan Username dan Password Anda</h4>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick} disabled={loading}>
              {loading ? "Mohon Tunggu ..." : "Masuk"}
            </button>
          </div>
        </section>
        <section id={styles.footer}>
          <p>Made with ❤️ by Ibrahimsyah Zairussalam</p>
        </section>
      </div>
    </>
  );
};

export default Home;

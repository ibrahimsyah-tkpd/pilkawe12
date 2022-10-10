import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/home.module.scss'

const Home = () => {
  const handleClick = () =>  {
    console.log("Masuk pakk")
  }

  return (
    <div id={styles.main}>
      <section id={styles.hero}>
        <h1 className={styles.title}>Pemilihan Ketua RW 12</h1>
        <h2>Official website pemilihan ketua RW 12 Alam Hijau Lestari 2022</h2>
      </section>
      <section id={styles.content}>
        <div className={styles.inputBox}>
          <h1>Mulai Memilih</h1>
          <h4>Masukkan Nomor Induk Kependudukan Anda untuk Memulai</h4>
          <input type="number" placeholder='NIK / Nomor KTP'/>
          <button onClick={handleClick}>Periksa data</button>
        </div>
      </section>
      <section id={styles.footer}>
        <p>Made with ❤️ by Ibrahimsyah Zairussalam</p>
      </section>
    </div>
  )
}

export default Home

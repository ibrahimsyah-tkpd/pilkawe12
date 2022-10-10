import {useState } from 'react'
import Modal from '../../components/modal'
import { MODAL_TYPE_ADMIN, MODAL_TYPE_CANDIDATE, MODAL_TYPE_VOTER } from '../../components/modal/config'
import styles from '../../styles/admin.module.scss'

const AdminPage = () => {
    const [showedModalType, setShowedModalType] = useState("")
    
    const onFormSubmit = () => {

    }

    return (
        <>
            <>
                <nav id={styles.navbar}>
                    <h1>Admin Panel</h1>
                </nav>
                <section id={styles.main}>
                    <div className={styles.resultContainer}>
                        <div className={styles.box}>
                            <p className={styles.title}>
                                Hasil Pengambilan Suara
                            </p>
                        </div>
                        <div className={styles.box}>
                            <p className={styles.title}>Rincian Pemilih</p>
                        </div>
                    </div>

                    <div className={styles.controlPanel}>
                        <div className={styles.box}>
                            <div className={styles.header}>
                                <p className={styles.title}>Daftar Kandidat</p>
                                <button onClick={() => setShowedModalType(MODAL_TYPE_CANDIDATE)}>Tambah</button>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.header}>
                                <p className={styles.title}>Daftar Pemilih</p>
                                <button onClick={() => setShowedModalType(MODAL_TYPE_VOTER)} >Tambah</button>
                            </div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.header}>
                                <p className={styles.title}>Daftar Admin</p>
                                <button onClick={() => setShowedModalType(MODAL_TYPE_ADMIN)}>Tambah</button>
                            </div>
                        </div>
                    </div >
                </section >
            </>

            {!!showedModalType && <Modal onSubmit={onFormSubmit} onClose={() => setShowedModalType("")} type={showedModalType} />}
        </>
    )
}

export default AdminPage
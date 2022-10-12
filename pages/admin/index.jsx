import Head from "next/head";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { toastConfig } from "../../lib/helper/toast";
import Modal from "../../components/modal";
import {
  MODAL_TYPE_ADMIN,
  MODAL_TYPE_CANDIDATE,
  MODAL_TYPE_VOTER,
} from "../../components/modal/config";
import styles from "../../styles/admin.module.scss";
import { useAdmin } from "../../lib/context/admin";
import api from "../../lib/helper/api";

const AdminPage = () => {
  const { isAuthenticated } = useAdmin();
  const [showedModalType, setShowedModalType] = useState("");
  const [adminList, setAdminList] = useState([]);
  const [candidateList, setCandidateList] = useState([])
  const [voterList, setVoterList] = useState([])

  const onFormSubmit = async (formData, modalType) => {
    if (modalType === MODAL_TYPE_ADMIN) {
      try {
        await api.post("/admin", formData);
        setShowedModalType("");
        populateAdminList();
        toast.success("Berhasil Menambah Admin", toastConfig)
      } catch (err) {
        toast.error(err.response.data.error, toastConfig);
      }
    }

    if (modalType === MODAL_TYPE_VOTER) {
      try {
        await api.post("/voter", formData);
        setShowedModalType("");
        populateVoterList();
        toast.success("Berhasil Menambah Pemilih", toastConfig)
      } catch (err) {
        toast.error(err.response.data.error, toastConfig);
      }
    }

    if (modalType === MODAL_TYPE_CANDIDATE) {
      try {
        await api.post("/candidate", formData);
        setShowedModalType("");
        populateCandidateList();
        toast.success("Berhasil Menambah Kandidat", toastConfig)
      } catch (err) {
        toast.error(err.response.data.error, toastConfig);
      }
    }
  };

  const populateAdminList = async () => {
    const { data } = await api.get("/admin");
    setAdminList(data);
  };

  const populateVoterList = async () => {
    const { data } = await api.get('/voter')
    setVoterList(data)
  }

  const populateCandidateList = async () => {
    const {data} = await api.get("/candidate")
    setCandidateList(data)
  }

  useEffect(() => {
    populateAdminList();
    populateVoterList()
  }, []);

  if (!isAuthenticated) {
    window.location = "/admin/login";
    return
  }
    
  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <ToastContainer />
      <>
        <nav id={styles.navbar}>
          <h1>Admin Panel</h1>
        </nav>
        <section id={styles.main}>
          <div className={styles.resultContainer}>
            <div className={styles.box}>
              <p className={styles.title}>Hasil Pengambilan Suara</p>
            </div>
            <div className={styles.box}>
              <p className={styles.title}>Rincian Pemilih</p>
            </div>
          </div>

          <div className={styles.controlPanel}>
            <div className={styles.box}>
              <div className={styles.header}>
                <p className={styles.title}>Daftar Kandidat</p>
                <button
                  onClick={() => setShowedModalType(MODAL_TYPE_CANDIDATE)}
                >
                  Tambah
                </button>
              </div>
              {candidateList.map((candidate) => (
                <p key={candidate.id}>{candidate.name}</p>
              ))}
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <p className={styles.title}>Daftar Pemilih</p>
                <button onClick={() => setShowedModalType(MODAL_TYPE_VOTER)}>
                  Tambah
                </button>
              </div>
              {voterList.map((voter) => (
                <p key={voter.id}>{voter.name}</p>
              ))}
            </div>
            <div className={styles.box}>
              <div className={styles.header}>
                <p className={styles.title}>Daftar Admin</p>
                <button onClick={() => setShowedModalType(MODAL_TYPE_ADMIN)}>
                  Tambah
                </button>
              </div>
              {adminList.map((admin) => (
                <p key={admin.id}>{admin.name}</p>
              ))}
            </div>
          </div>
        </section>
      </>

      {!!showedModalType && (
        <Modal
          onSubmit={onFormSubmit}
          onClose={() => setShowedModalType("")}
          type={showedModalType}
        />
      )}
    </>
  );
};

export default AdminPage;

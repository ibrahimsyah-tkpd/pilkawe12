import styles from "./modal.module.scss";
import { useMemo, useRef, useState } from "react";
import { formConfigMap, formStringMap } from "./config";
import Image from "next/image";
import api from "../../lib/helper/api";

const Modal = ({ type, onClose }) => {
  const formRef = useRef()
  const formConfig = useMemo(() => formConfigMap[type], [type]);
  const [imagePreview, setImagePreview] = useState("/img/profile_placeholder.png")

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    return api.post('/upp', formData)
  }

  const onFormSubmit = async () => {
    if (!formRef && !formRef.current) return
    
    const formData = {}
    for (let i = 0; i < formConfig.fields.length; i++){
      const formField = formConfig.fields[i]
      const field = formRef.current[i]
      if (formStringMap[field.type]){
        if (field.value === ""){
          alert("Data Belum Lengkap.")
          continue
        }

        formData[formField.id] = field.value
        continue
      }

      // upload file if exists
      if (field.value){
        const file = field.files[0]
        const {file: fileURL } = await uploadFile(file)
       
        formData[formField.id] = fileURL
      }
    }
  }

  const onImageChange = e => {
    if (formStringMap[e.target.type]) return
    
    const file = e.target.files[0]
    if(file.size >= 200*1000){ // 200 KB
      alert("Foto tidak boleh melebihi 200KB")
      return
    }
    
    const url = URL.createObjectURL(file)
    setImagePreview(url)
  }
  return (
    <>
      <div className={styles.modal}>
        <div className={styles.container}>
          <p className={styles.title}>{formConfig.title}</p>
          <form className={styles.form} ref={formRef} autoComplete="off" autoCorrect="off">
            {formConfig.fields.map((field, index) => (
              <div key={index} className={styles.field}>
                <input
                  id={index}
                  type={field.type}
                  onChange={onImageChange}
                  accept={field.type==="file" ? "image/*" : "*"}
                  placeholder={field.label}
                />
                {field.type === "file" && (
                  <label htmlFor={index} className={styles.imgPlaceholder}>
                    <Image
                      width={150}
                      height={150}
                      objectFit="cover"
                      src={imagePreview}
                    />
                  </label>
                )}
              </div>
            ))}
          </form>
          <div className={styles.footer}>
            <button className={styles.save} onClick={onFormSubmit}>Simpan</button>
            <button className={styles.cancel} onClick={onClose}>
              Keluar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

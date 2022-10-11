const MODAL_TYPE_CANDIDATE = "CANDIDATE";
const MODAL_TYPE_VOTER = "VOTER";
const MODAL_TYPE_ADMIN = "ADMIN";

const formStringMap = {
  text: true,
  number: true,
  password: true
};

const formConfigMap = {
  [MODAL_TYPE_CANDIDATE]: {
    title: "Tambah Kandidat",
    fields: [
      {
        id: "name",
        label: "Nama Lengkap",
        type: "text",
      },
      {
        id: "rt",
        label: "RT",
        type: "number",
      },
      {
        id: "photo",
        label: "Foto",
        type: "file",
      },
    ],
  },
  [MODAL_TYPE_ADMIN]: {
    title: "Tambah Admin",
    fields: [
      {
        id: "name",
        label: "Nama",
        type: "text",
      },
      {
        id: "username",
        label: "Username",
        type: "text",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
      },
    ],
  },
  [MODAL_TYPE_VOTER]: {
    title: "Tambah Pemilih",
    fields: [
      {
        id: "name",
        label: "Nama Lengkap",
        type: "text",
      },
      {
        id: "nik",
        label: "NIK",
        type: "number",
      },
      {
        id: "rt",
        label: "RT",
        type: "number",
      },
    ],
  },
};

export {
  formStringMap,
  formConfigMap,
  MODAL_TYPE_ADMIN,
  MODAL_TYPE_CANDIDATE,
  MODAL_TYPE_VOTER,
};

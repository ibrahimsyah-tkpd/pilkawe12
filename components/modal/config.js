const MODAL_TYPE_CANDIDATE= "CANDIDATE";
const MODAL_TYPE_VOTER = "VOTER";
const MODAL_TYPE_ADMIN = "ADMIN";

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
        type: "text",
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
    ]
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
        type: "text",
      },
      {
        id: "rt",
        label: "RT",
        type: "text",
      },
      {
        id: "rw",
        label: "RW",
        type: "text",
      },
    ],
  },
};

export { 
  formConfigMap,
  MODAL_TYPE_ADMIN,
  MODAL_TYPE_CANDIDATE,
  MODAL_TYPE_VOTER
};

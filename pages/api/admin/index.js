import nextConnect from "next-connect";
import bcrypt from "bcryptjs";

import db from "../../../lib/db";
import middleware from "../../../lib/middleware";
import validator from "../../../lib/helper/validator";

const route = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

route.use(middleware.tokenMiddleware, middleware.adminMiddleware);
route.get(async (req, res) => {
  const {
    query: { id },
  } = req;

  const query = db("mst_admin");
  if (id) {
    query.where({ id }).first();
  }

  const result = await query.select("id", "name", "username");
  res.json(result ? result : null);
});

route.post(async (req, res) => {
  const { name, username, password } = req.body;
  if (validator.isFieldsEmpty(name, username, password)) {
    return res.status(400).json({ error: "data belum lengkap." });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password);
    await db("mst_admin").insert({
      name,
      username,
      password: hashedPassword,
      created_by: 1,
    });
    res.status(201).json({ success: true });
  } catch (err) {
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ error: `${username} Sudah Terdaftar, Gunakan Username Lain` });
    }

    res
      .status(500)
      .json({ error: "Ada kesalahan sistem, hubungi ibrahim", detail: err });
  }
});

export default route;

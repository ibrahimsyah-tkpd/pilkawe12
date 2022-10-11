import nextConnect from "next-connect";
import db from "../../../lib/db";
import validator from "../../../lib/helper/validator";
import middleware from "../../../lib/middleware";

const route = nextConnect();

route.get(middleware.tokenMiddleware, async (req, res) => {
  const {
    query: { id },
  } = req;
  const query = db("mst_voter").orderBy("name");
  if (id) {
    query.where({ id }).first();
  }
  const result = await query.select("id", "name", "nik", "rt");
  res.json(result);
});

route.post(middleware.tokenMiddleware, middleware.adminMiddleware, async (req, res) => {
  const {
    body: { name, nik, rt },
    payload: { id },
  } = req;
  if (validator.isFieldsEmpty(name, nik, rt)) {
    return res.status(400).json({ error: "data belum lengkap." });
  }

  await db("mst_voter").insert({ name, nik, rt, created_by: id });
  res.status(201).json({ success: true });
});

export default route;

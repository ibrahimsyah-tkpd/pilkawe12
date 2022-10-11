import db from "../../../lib/db";
import validator from "../../../lib/helper/validator";

export default async (req, res) => {
  const {
    query: { nik },
  } = req;
  if (validator.isFieldsEmpty(nik)) {
    return res.status(400).json({ error: "data belum lengkap." });
  }

  const result = await db("mst_voter").where({ nik }).first();
  return res.json({ found: !!result });
};

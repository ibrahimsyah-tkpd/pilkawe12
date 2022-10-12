import nextConnect from "next-connect";
import db from "../../../lib/db";
import validator from "../../../lib/helper/validator";
import middleware from "../../../lib/middleware";

const route = nextConnect();

route.get(async (_, res) => {
  const result = await db("mst_candidate").select(
    "id",
    "name",
    "rt",
    "photo_path"
  );
  return res.json(result);
});

route.post(
  middleware.tokenMiddleware,
  middleware.adminMiddleware,
  async (req, res) => {
    const {
      body: { name, rt, photo },
      payload: { id: createdBy },
    } = req;
    if (validator.isFieldsEmpty(name, rt, photo)) {
      return res.status(400).json({ error: "data belum lengkap." });
    }

    await db("mst_candidate").insert({
      name,
      rt,
      photo_path: photo,
      created_by: createdBy,
    });
    return res.status(201).json({ success: true });
  }
);

export default route;

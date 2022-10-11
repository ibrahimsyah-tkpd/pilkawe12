import nextConnect from "next-connect";
import db from "../../../lib/db";
import middleware from "../../../lib/middleware";

const route = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

route.use(middleware.tokenMiddleware, middleware.adminMiddleware);
route.get(async(req, res) => {
    const {payload: {id}} = req
    const user = await db("mst_admin").select("id", "name", "username").where({id}).first()

    return res.json(user)
})


export default route
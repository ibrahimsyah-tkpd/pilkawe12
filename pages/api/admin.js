import nextConnect from "next-connect"
import db from "../../lib/db"
import middleware from "../../lib/middleware";

const route = nextConnect({
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
      }, 
})

route.use(middleware.tokenMiddleware, middleware.adminMiddleware)
route.get(async (req, res) => {
    const {query: {id}} = req
    
    const query =  db("mst_admin")
    if (id){
        query.where({id}).first()
    }

    const result = await query.select("id", "name", "username")
    res.json(result ? result : null)
})

export default route
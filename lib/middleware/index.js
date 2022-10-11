import auth from '../../lib/helper/auth'
import db from '../db'

const tokenMiddleware = (req, res, next) => {
    const token = auth.getBearerToken(req)
    if (!token) {
        res.status(403).json({error: "Tidak boleh masuk"})
        return
    }

    // TODO: Verify the token, store the id to request.payload

    req.payload = {
        id: 1 // Placeholder
    }
    next()
}

const adminMiddleware = async (req, res, next) => {
    const {payload: {id}} = req

    const admin = await db("mst_admin").where({id}).select("id")
    if (!!!admin) {
        res.status(403).json({error: "Akses ditolak"})
    }
    next()
}

export default {
    tokenMiddleware, 
    adminMiddleware
}
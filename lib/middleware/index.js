import auth from '../../lib/helper/auth'
import tokenizer from '../../lib/helper/tokenizer'
import db from '../db'

const tokenMiddleware = async (req, res, next) => {
    const token = auth.getBearerToken(req)
    if (!token) {
        res.status(403).json({error: "Tidak boleh masuk"})
        return
    }

    const isTokenVerified = tokenizer.verifyToken(token)
    if (!isTokenVerified){
        res.status(403).json({error: "Akses ditolak"})
        return
    }

    const payload = await tokenizer.decodeToken(token)
    req.payload = payload
    
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
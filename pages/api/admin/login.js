import db from "../../../lib/db";
import validator from "../../../lib/helper/validator";
import tokenizer from "../../../lib/helper/tokenizer";
import bcrypt from "bcryptjs";

export default async (req, res) => {
    const {username, password} = req.body
    if (validator.isFieldsEmpty(username, password)){
        return res.status(400).json({ error: "data belum lengkap." });
    }

    const user = await db("mst_admin").where({username}).first()
    if(!user) {
        return res.status(401).json({error: "User Tidak Ditemukan"})
    }

    const isPasswordEqual = bcrypt.compareSync(password, user.password)
    if (!isPasswordEqual){
        return res.status(401).json({error: "Password salah"})
    }

    const payload = {
        id: user.id
    }
    const token = tokenizer.generateToken(payload)
    res.status(200).json({token})
}
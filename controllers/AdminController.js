import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import Admin from "../models/AdminModal.js"

dotenv.config()

const SECRET = process.env.SECRET

export const AdminRegister = async (req, res) => {
    const { username, password, email, phone } = req.body
    try {
        const haspassword = await bcrypt.hash(req.body.password, 10)
        const newAdmin = await Admin.create({
            username,
            password: haspassword,
            email,
            phone
        })
        // savedUser.password = undefined
        res.status(201).json({ message: "User created successfully", data: newAdmin })
    } catch (error) {
        console.error("User registration error:", error.message)
        res.status(500).json({ message: 'Internal server error' })
    }

}


export const AdminLogin = async (req, res) => {
    try {
        const foundAdmin = await Admin.findOne({ username: req.body.username })
        if (!foundAdmin) {
            return res.status(401).json({ message: 'Authentication failed, Invalid username/password' })
        }

        const isPassEqual = await bcrypt.compare(req.body.password, foundAdmin.password)
        if (!isPassEqual) {
            return res.status(401).json({ message: 'Authentication failed, Invalid username/password' })
        }

        const tokenObject = {
            _id: foundAdmin._id,
            username: foundAdmin.username
        }

        const jwtToken = jwt.sign(tokenObject, SECRET, { expiresIn: '4h' })
        return res.status(200).json({ jwtToken })
    } catch (error) {
        console.error("User login error:", error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

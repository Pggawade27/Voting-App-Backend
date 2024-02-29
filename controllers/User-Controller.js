import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const SECRET = process.env.SECRET

export const UserRegister = async (req, res) => {
    const { username, password, email, phone } = req.body
    // const newUser = new User(req.body)
    try {
        const haspassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({
            username,
            password: haspassword,
            email,
            phone
        })
        // savedUser.password = undefined
        res.status(201).json({ message: "User created successfully", data: newUser })
    } catch (error) {
        console.error("User registration error:", error.message)
        res.status(500).json({ message: 'Internal server error' })
    }

}

export const UserLogin = async (req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username })
        if (!foundUser) {
            return res.status(401).json({ message: 'Authentication failed, Invalid username/password' })
        }

        const isPassEqual = await bcrypt.compare(req.body.password, foundUser.password)
        if (!isPassEqual) {
            return res.status(401).json({ message: 'Authentication failed, Invalid username/password' })
        }

        const userData = await User.findById(foundUser._id).select('-password')

        const tokenObject = {
            _id: foundUser._id,
            username: foundUser.username
        }

        const jwtToken = jwt.sign(tokenObject, SECRET, { expiresIn: '4h' })

        return res.status(200).json({ jwtToken, userData })
    } catch (error) {
        console.error("User login error:", error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}


export const getUser = async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).json({ data: users })
    }
    catch (error) {
        console.error('Error fetching candidate:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
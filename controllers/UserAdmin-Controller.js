import candidate from "../models/CandidateModal.js"
import UserAdmin from "../models/UserAdminModel.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const SECRET = process.env.SECRET

export const registerUserAdmin = async (req, res) => {
    const { username, password, email, phone, isAdmin } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUserAdmin = await UserAdmin.create({
            username,
            password: hashedPassword,
            email,
            phone,
            isAdmin
        })
        res.status(201).json({ message: "User created successfully", data: newUserAdmin })
    } catch (error) {
        console.error("User registration error:", error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const loginUserAdmin = async (req, res) => {
    try {
        const { username, password } = req.body
        const foundUserAdmin = await UserAdmin.findOne({ username })

        if (!foundUserAdmin || !(await bcrypt.compare(password, foundUserAdmin.password))) {
            return res.status(401).json({ message: 'Authentication failed, Invalid username/password' })
        }

        const token = jwt.sign({ userId: foundUserAdmin._id }, SECRET, { expiresIn: '4h' })
        res.status(200).json({ token, userAdmin: foundUserAdmin })
    } catch (error) {
        console.error("User login error:", error)
        res.status(500).json({ message: 'Internal server error' })
    }
}



export const addCandidate = async (req, res) => {
    const { candidate_name } = req.body
    try {
        const newCandidate = await candidate.create({ candidate_name })
        res.status(201).json({ message: "Candidate created successfully", data: newCandidate })
    } catch (error) {
        console.error("Candidate add error:", error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const editCandidate = async (req, res) => {
    const { candidate_name, candidate_id } = req.body
    try {
        const foundCandidate = await candidate.findById(candidate_id)
        if (!foundCandidate) {
            return res.status(404).json({ message: "Candidate not found" })
        }

        foundCandidate.candidate_name = candidate_name
        const savedCandidate = await foundCandidate.save()

        res.status(200).json({ message: "Candidate updated", data: savedCandidate })
    } catch (error) {
        console.error("Error editing candidate:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteCandidate = async (req, res) => {
    const { candidate_id } = req.body
    try {
        await candidate.deleteOne({ _id: candidate_id })
        res.status(201).json({ message: "Candidate deleted" })
    } catch (error) {
        console.error("Error deleting candidate:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}


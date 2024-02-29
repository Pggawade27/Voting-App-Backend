import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const Password = process.env.PASSWORD
console.log(Password)

const DBConnect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://prasadgawade249:${Password}@cluster0.ijsi8rn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("database connected")
    } catch (error) {
        console.log("error while connecting databse", error)
    }
}

export default DBConnect
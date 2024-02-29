import express from "express"
import routes from "./routes/Router.js"
import bodyParser from "body-parser"
import DBConnect from "./config/DB.js"
import cors from "cors"

const app = express()
app.use(cors())
app.use(bodyParser.json())
DBConnect() 
app.use('/api/v1', routes)
const PORT = 8080
app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
})


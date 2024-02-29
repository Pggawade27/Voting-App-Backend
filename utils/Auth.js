import jwt from "jsonwebtoken"

export const ensureAuthenticated = async (req, res, next) => {
    const SECRET = process.env.SECRET

    if (!req.headers['authorization']) {
        return res.status(403).json({ message: "Token is required" })
    }

    try {
        const token = req.headers['authorization'].split(' ')[1] 
        const verify = jwt.verify(token, SECRET)
        console.log("Token found and verified:", verify)
        next()
    } catch (error) {
        console.error("Error verifying token:", error)
        return res.status(403).json({ message: "Token is not valid, or it's expired" })
    }
}

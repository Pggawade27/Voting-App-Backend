import Joi from 'joi'

export const ValidateRegister = async (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        password: Joi.string().min(4).alphanum().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required()
    })

    const {error, value} = schema.validate(req.body)
    if(error) {
        res.status(400).json({message: "Bad Request", error})
    }

    next()
}

export const ValidateLogin = async (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        password: Joi.string().min(4).alphanum().required()
    })

    const {error, value} = schema.validate(req.body)
    if(error) {
        res.status(400).json({message: "Bad Request", error})
    }

    next()
}
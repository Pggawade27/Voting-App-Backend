import mongoose, { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    isVoted: {
        type: Boolean
    },
    votedCandidate: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate' 
    }
})

const user = mongoose.model('user', userSchema)

export default user
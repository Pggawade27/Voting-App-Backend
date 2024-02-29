import mongoose, { Schema } from 'mongoose'

const userAdminSchema = new mongoose.Schema({
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
    isAdmin: {
        type: Boolean,
        default: false // Default value for isAdmin
    },
    isVoted: {
        type: Boolean
    },
    votedCandidate: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    }
})

const UserAdmin = mongoose.model('UserAdmin', userAdminSchema)

export default UserAdmin

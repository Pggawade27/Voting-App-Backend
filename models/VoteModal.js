import mongoose from 'mongoose'

const voteSchema = new mongoose.Schema({
    candidate: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
})

const Vote = mongoose.model('Vote', voteSchema)

export default Vote

import mongoose from 'mongoose'

const condidateSchema = new mongoose.Schema({
    candidate_name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
})

const candidate = mongoose.model('candidate', condidateSchema)

export default candidate

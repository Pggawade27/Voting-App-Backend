import Vote from "../models/VoteModal.js"

export const getCandidateVoteCounts = async (req, res) => {
    try {
        const votes = await Vote.find({})
        return res.status(200).json({ data: votes })
    }
    catch (error) {
        console.error('Error fetching candidate vote counts:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

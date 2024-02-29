import candidate from "../models/CandidateModal.js"

export const submitVote = async (req, res) => {
    const { candidate_name } = req.body

    try {
        let vote = await candidate.findOne({ candidate_name })

        if (!vote) {
            vote = new candidate({ candidate_name, count: 1 })
        } else {
            vote.count++
        }

        await candidate.save()

        res.status(201).json({ message: 'Vote submitted successfully', vote })
    } catch (error) {
        console.error('Error submitting vote:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

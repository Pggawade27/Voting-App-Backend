import candidate from "../models/CandidateModal.js"
import UserAdmin from "../models/UserAdminModel.js"
// import UserAdmin from "../models/UserModel.js"

export const AddCandidate = async (req, res) => {
    const { candidate_name } = req.body
    try {
        const newCandidate = await candidate.create({
            candidate_name
        })
        res.status(201).json({ message: "Candidate created successfully", data: newCandidate })
        console.log(newCandidate)

    } catch (error) {
        console.error("Candidate add error:", error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const getCandidate = async (req, res) => {
    try {
        const candidates = await candidate.find({})
        return res.status(200).json({ data: candidates })
    }
    catch (error) {
        console.error('Error fetching candidate:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const submitVote = async (req, res) => {
    const { candidate_name } = req.body
    const userId = req.body._id

    try {
        let vote = await candidate.findOne({ candidate_name })

        if (!vote) {
            vote = new candidate({ candidate_name, count: 1 })
        } else {
            vote.count++
        }

        const user = await UserAdmin.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'UserAdmin not found' })
        }

        user.isVoted = true
        user.votedCandidate = vote._id 
        await user.save()

        await vote.save()

        res.status(201).json({ message: 'Vote submitted successfully', vote })
    } catch (error) {
        console.error('Error submitting vote:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}


export const editCandidate = async (req, res) => {
    const { candidate_name, candidate_id } = req.body
    try {
        const foundCandidate = await candidate.findById(candidate_id)
        if (!foundCandidate) {
            return res.status(404).json({ message: "Candidate not found" })
        }

        foundCandidate.candidate_name = candidate_name
        const savedCandidate = await foundCandidate.save()

        res.status(200).json({ message: "Candidate updated", data: savedCandidate })
    } catch (error) {
        console.error("Error editing candidate:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteCandidate = async (req, res) => {
    const { candidate_id } = req.body
    try {
        await candidate.deleteOne({ _id: candidate_id })
        res.status(201).json({ message: "Candidate deleted" })
    } catch (error) {
        console.error("Error deleting candidate:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const votedUser = async (req, res) => {
    try {
        const votedUsers = await UserAdmin.find({ isVoted: true }).select('username')
        res.status(200).json({ votedUsers })
    } catch (error) {
        console.error('Error retrieving voted users:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}


export const getVoter = async (req, res) => {
    const { id } = req.body
    console.log(id)

    try {
        const voter = await UserAdmin.find({ votedCandidate: id, isVoted: true }).select('username')

        if (!voter) {
            return res.status(404).json({ message: 'No voter found for the specified candidate' })
        }

        res.status(200).json({ voter })
    } catch (error) {
        console.error('Error retrieving voted user:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}


export const testAPI = (req, res) => {
    try {
    res.status(200).json({message: "got data"})
    } catch (error) {
        res.status(500).json({message: "internal serve error"})
    }
}











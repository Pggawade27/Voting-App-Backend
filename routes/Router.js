import express from 'express'
import { ValidateRegister, ValidateLogin } from '../utils/ValidateUser.js'
import { UserLogin, UserRegister, getUser } from '../controllers/User-Controller.js'
import { AdminLogin, AdminRegister } from '../controllers/AdminController.js'
// import { submitVote } from '../controllers/Vote-Controller.js'
import { getCandidateVoteCounts } from '../controllers/Vote-Count-Controller.js'
import { ensureAuthenticated } from '../utils/Auth.js'
import { AddCandidate, deleteCandidate, editCandidate, getCandidate, getVoter, submitVote, testAPI, votedUser } from '../controllers/Candidate-Controller.js'
import { loginUserAdmin, registerUserAdmin } from '../controllers/UserAdmin-Controller.js'

const routes = express.Router()

// routes.post('/register', ValidateRegister, UserRegister)
// routes.post('/login', ValidateLogin, UserLogin)

routes.post('/register', UserRegister)
routes.post('/login', UserLogin)

routes.post('/admin/register', AdminRegister)
routes.post('/admin/login', AdminLogin)

routes.post('/vote', submitVote)   //ensureAuthenticated

routes.get('/candidate_vote_counts', getCandidateVoteCounts)

//candidate
routes.post('/add_candidate', AddCandidate)
routes.get('/get_candidate', ensureAuthenticated, getCandidate)
routes.post('/edit_candidate', editCandidate)
routes.post('/delete_candidate', deleteCandidate)
routes.get('/voted_user', votedUser)

//user
routes.get('/get_user', getUser)

//user admin
routes.post('/user/admin/register', registerUserAdmin)
routes.post('/user/admin/login', loginUserAdmin)

//get voter
routes.post('/get_voter', getVoter )


export default routes
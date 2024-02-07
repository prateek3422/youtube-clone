import {asyncHandler} from '../utils/asyncHandler.js'


const createUser = asyncHandler(async (req, res) =>{

    // first get user
    // check user email alredy exist or not
    // if user email exist retun without register in database
    // if user not exist then check password and email vlidated or not
    // after checking validation save the user in database

    const {username, fullname, email, password} = req.body

    console.log(email)
}) 


export {createUser}
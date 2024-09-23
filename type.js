const zod = require('zod');


const Signup = zod.object({
    username : zod.string().email(),
    password : zod.string().min(8),
    firstName : zod.string(),
    lastName : zod.string()
})

const Signin = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

const Update = zod.object({
    password : zod.string().min(8).optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

module.exports = {
    Signup,
    Signin,
    Update
}
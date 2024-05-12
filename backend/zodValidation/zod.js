const zod = require('zod');

const signupInputValidation = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string().min(3),
    lastName: zod.string().min(3)
})

const signinInputValidation = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

const updateInputValidation = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().min(3).optional(),
    lastName: zod.string().min(3).optional()
})

module.exports = {
    signupInputValidation,
    signinInputValidation,
    updateInputValidation
}
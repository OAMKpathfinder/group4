const Joi = require('@hapi/joi')

async function userValidate(req, res, next) {
    try {
        const schema = Joi.object({
            full_name: Joi.string()
                .min(3)
                .max(60)
                .required(),

            username: Joi.string()
                .min(3)
                .required(),

            email: Joi.string()
                .email({ minDomainSegments: 2 })
                .required(),

            password: Joi.string()
                .pattern(/^[a-zA-Z0-9]{8,30}$/)
                .required(),
        })

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    userValidate,
}

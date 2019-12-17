const Joi = require('@hapi/joi')

async function adminsValidate(req, res, next) {
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

            role: Joi.string()
                .valid('user', 'admin')
                .required(),
        })

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    adminsValidate,
}

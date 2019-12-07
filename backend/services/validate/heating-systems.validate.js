const Joi = require('@hapi/joi')

async function heatingSystemsValidate(req, res, next) {
    try {
        const schema = Joi.object({
            type: Joi.string().required(),
        })

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    heatingSystemsValidate,
}

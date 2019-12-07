const Joi = require('@hapi/joi')

async function locationsValidate(req, res, next) {
    try {
        const schema = Joi.object({
            country: Joi.string().required(),
        })

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    locationsValidate,
}

const Joi = require('@hapi/joi')

async function housePartsValidate(req, res, next) {
    try {
        const schema = Joi.object({
            part: Joi.string().required(),
        })

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    housePartsValidate,
}

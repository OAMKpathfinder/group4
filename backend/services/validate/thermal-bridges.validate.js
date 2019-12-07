const Joi = require('@hapi/joi')

async function thermalBridgesValidate(req, res, next) {
    const arr = req.body
    arr.forEach(async element => {
        try {
            const schema = Joi.object({
                bridge_length: Joi.number().required(),

                HouseDetailsId: Joi.number()
                    .integer()
                    .min(0)
                    .required(),
            })

            await schema.validateAsync(element)
        } catch (err) {
            return res.status(500).send(err.details[0].message)
        }
    })
    next()
}

module.exports = {
    thermalBridgesValidate,
}

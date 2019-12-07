const Joi = require('@hapi/joi')

async function partTypesValidate(req, res, next) {
    try {
        const schema = Joi.object({
            PartId: Joi.number()
                .integer()
                .required(),

            name: Joi.string().required(),

            producer: Joi.string().required(),

            serial: Joi.string().required(),

            price: Joi.number()
                .min(0)
                .required(),

            U_value: Joi.number()
                .min(0)
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
    partTypesValidate,
}

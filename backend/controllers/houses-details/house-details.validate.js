const Joi = require('@hapi/joi')

async function houseDetailsValidate(req, res, next) {
    try {
        const schema = Joi.object({
            surface: Joi.number().required(),

            U_value: Joi.number().required(),

            hjoht: Joi.number().required(),

            HousesId: Joi.number()
                .integer()
                .min(0)
                .required(),

            HousePartsId: Joi.number()
                .integer()
                .min(0)
                .required(),

            MaterialsId: Joi.number()
                .integer()
                .min(0)
                .required(),
        })

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports = {
    houseDetailsValidate,
}

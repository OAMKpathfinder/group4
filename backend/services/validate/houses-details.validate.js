const Joi = require('@hapi/joi')

async function houseDetailsValidate(req, res, next) {
    const arr = req.body
    arr.forEach(async element => {
        try {
            const schema = Joi.object({
                surface: Joi.number().required(),

                U_value: Joi.number().required(),

                hjoht: Joi.number().min(0),

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
            await schema.validateAsync(element)
        } catch (err) {
            return res.status(500).send(err.details[0].message)
        }
    })
    next()
}

module.exports = {
    houseDetailsValidate,
}

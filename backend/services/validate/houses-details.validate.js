const Joi = require('@hapi/joi')

async function houseDetailsValidate(req, res, next) {
    const arr = req.body
    try {
        arr.forEach(async element => {
            const schema = Joi.object({
                surface: Joi.number().required(),

                U_value: Joi.number(),

                hjoht: Joi.number().min(0),

                HousesId: Joi.number()
                    .integer()
                    .min(0)
                    .required(),

                HousePartsId: Joi.number()
                    .integer()
                    .min(0)
                    .required(),
                MaterialsId: Joi.array()
                    .items(Joi.number().integer())
                    .required(),
            })
            await schema.validateAsync(element)
        })
        next()
    } catch (err) {
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    houseDetailsValidate,
}

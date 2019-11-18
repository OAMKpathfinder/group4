const Joi = require('@hapi/joi')

async function housesValidate(req, res, next) {
    try {
        const date = await new Date()
        const currentYear = await date.getFullYear()
        console.log(currentYear)
        const schema = Joi.object({
            decade: Joi.number()
                .integer()
                .max(currentYear)
                .required(),

            levels: Joi.number()
                .integer()
                .min(1)
                .required(),

            heating_per_year: Joi.number().required(),

            warm_water_pipe: Joi.boolean().required(),

            UsersId: Joi.number()
                .integer()
                .min(0)
                .required(),

            LocationsId: Joi.number()
                .integer()
                .min(0)
                .required(),

            HeatingSystemsId: Joi.number()
                .integer()
                .min(0)
                .required(),
        })

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

module.exports = {
    housesValidate,
}

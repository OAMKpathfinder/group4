const Joi = require('@hapi/joi')

async function materialsValidate(req, res, next) {
    let arr = []
    if (!(req.body instanceof Array)) {
        arr.push(req.body)
    } else {
        arr = req.body
    }
    try {
        arr.forEach(async element => {
            const schema = Joi.object({
                name: Joi.string().required(),

                type: Joi.string().required(),

                thermal_conductivity: Joi.number()
                    .min(0)
                    .required(),
                thickness: Joi.number()
                    .min(0)
                    .required(),
                description: Joi.string().required(),
            })

            await schema.validateAsync(element)
        })
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    materialsValidate,
}

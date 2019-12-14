const Joi = require('@hapi/joi')

async function housePartsValidate(req, res, next) {
    let arr = []
    if (!(req.body instanceof Array)) {
        arr.push(req.body)
    } else {
        arr = req.body
    }
    try {
        arr.forEach(async element => {
            const schema = Joi.object({
                part: Joi.string().required(),
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
    housePartsValidate,
}

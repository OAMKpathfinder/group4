const Joi = require('@hapi/joi')

async function pagesValidate(req, res, next) {
    try {
        const schema = Joi.object({
            title: Joi.string().required(),

            slug: Joi.string().required(),

            excerpt: Joi.string().required(),

            image: Joi.string().required(),

            body: Joi.string().required(),
        })

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

module.exports = {
    pagesValidate,
}

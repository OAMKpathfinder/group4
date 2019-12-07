const Joi = require('@hapi/joi')

async function usersValidate(req, res, next) {
    try {
        const schema = Joi.object({
            full_name: Joi.string()
                .min(3)
                .max(60)
                .required(),

            username: Joi.string()
                .min(3)
                .required(),

            email: Joi.string()
                .email({ minDomainSegments: 2 })
                .required(),

            password: Joi.string()
                .pattern(/^[a-zA-Z0-9]{8,30}$/)
                .required(),

            role: Joi.string()
                .valid('user', 'admin')
                .required(),
        })

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

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
        return res.status(500).send(err.details[0].message)
    }
}

async function materialsValidate(req, res, next) {
    try {
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

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

async function locationsValidate(req, res, next) {
    try {
        const schema = Joi.object({
            country: Joi.string().required(),
        })

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        return res.status(500).send(err.details[0].message)
    }
}

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

async function heatingSystemsValidate(req, res, next) {
    try {
        const schema = Joi.object({
            type: Joi.string().required(),
        })

        await schema.validateAsync(req.body)
        next()
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.details[0].message)
    }
}

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

// async function defaultsValidate(req, res, next) {
//     console.log(req.body)
//     try {
//         const schema = Joi.object({
//             decade: Joi.number()
//                 .integer()
//                 .required(),
//             houseImage: Joi.string().required(),
//             description: Joi.string().required(),
//         })

//         await schema.validateAsync(req.body)
//         next()
//     } catch (err) {
//         console.log(err)
//         return res.status(500).send(err)
//     }
// }

module.exports = {
    usersValidate,
    thermalBridgesValidate,
    houseDetailsValidate,
    housesValidate,
    materialsValidate,
    locationsValidate,
    housePartsValidate,
    heatingSystemsValidate,
    partTypesValidate,
    // defaultsValidate,
}

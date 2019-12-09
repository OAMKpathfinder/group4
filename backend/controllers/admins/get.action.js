require('module-alias/register')
const db = require('@models')

const models = [
    {
        name: 'Users',
        path: 'users',
        attributes: {
            username: 'text',
            password: 'password',
            full_name: 'text',
            email: 'email',
            role: 'text',
        },
    },
    {
        name: 'Houses',
        path: 'houses',
        attributes: {
            decade: 'number',
            levels: 'number',
            heating_per_year: 'double',
            warm_water_pipe: 'boolean',
            UsersId: 'number',
            LocationsId: 'number',
            HeatingSystemsId: 'number',
        },
    },
    {
        name: 'House Details',
        path: 'house-details',
        attributes: {
            surface: 'double',
            U_value: 'double',
            hjoht: 'double',
            HousesId: 'number',
            HousePartsId: 'number',
            MaterialsId: 'number',
        },
    },
    {
        name: 'House Parts',
        path: 'house-parts',
        attributes: {
            part: 'text',
        },
    },
    {
        name: 'Heating Systems',
        path: 'heating-systems',
        attributes: {
            type: 'text',
        },
    },
    {
        name: 'Locations',
        path: 'locations',
        attributes: {
            country: 'text',
        },
    },
    {
        name: 'Thermal Bridges',
        path: 'thermal-bridges',
        attributes: {
            bridge_length: 'double',
            HouseDetailsId1: 'number',
            HouseDetailsId2: 'number',
        },
    },
    {
        name: 'Materials',
        path: 'materials',
        attributes: {
            name: 'text',
            type: 'text',
            description: 'text',
        },
    },
]

async function getModels(req, res) {
    try {
        console.log(req.hostname)
        res.status(200).send(models)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getAttributes(req, res) {
    try {
        res.status(200).json(await db.Users.describe())
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = {
    getAttributes,
    getModels,
}

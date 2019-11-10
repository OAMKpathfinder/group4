const db = require('../../models')

const models = [
    {
        name: 'Users',
        path: 'users',
        attributes: {
            username: 'text',
            password: 'password',
            full_name: 'text',
            email: 'email',
            role: 'text'
        }
    },
    {
        name: 'Houses',
        path: 'houses',
        attributes: {
            decade: 'number',
            levels: 'number',
            heating_per_year: 'double',
            warm_water_pipe: 'boolean',
            owner_id: 'number',
            location_id: 'number',
            heating_system_id: 'number'
        }
    },
    {
        name: 'House Details',
        path: 'house-details',
        attributes: {
            surface: 'double',
            U_value: 'double',
            hjoht: 'double',
            house_id: 'number',
            type_id: 'number',
            material_id: 'number'
        }
    },
    {
        name: 'House Parts',
        path: 'house-parts',
        attributes: {
            part: 'text'
        }
    },
    {
        name: 'Heating Systems',
        path: 'heating-systems',
        attributes: {
            type: 'text'
        }
    },
    {
        name: 'Locations',
        path: 'locations',
        attributes: {
            country: 'text'
        }
    },
    {
        name: 'Thermal Bridges',
        path: 'thermal-bridges',
        attributes: {
            bridge_length: 'double',
            connection1_id: 'number',
            connection2_id: 'number'
        }
    },
    {
        name: 'Materials',
        path: 'materials',
        attributes: {
            name: 'text',
            type: 'text',
            description: 'text'
        }
    }
]

async function getModels(req, res){
    try{
        // res.status(200).send(Object.keys(db).slice(0, -2));
        res.status(200).send(models);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getAttributes(req, res){
    try{
        const name = req.params.name;
        console.log(db[name])
        res.status(200).send(db[name].tableAttributes)
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    getAttributes,
    getModels
}
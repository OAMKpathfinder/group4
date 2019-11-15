const { Houses } = require('../../../models')
const { housesValidate } = require('./admins.validate')

async function get(req, res) {
    try {
        const rows = await Houses.findAll()
        res.status(200).send(rows)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function create(req, res) {
    const UsersId = req.body.UsersId
    const LocationsId = req.body.LocationsId
    const HeatingSystemsId = req.body.HeatingSystemsId
    try {
        const house = await Houses.build({
            decade: req.body.decade,
            levels: req.body.levels,
            heating_per_year: req.body.heating_per_year,
            warm_water_pipe: req.body.warm_water_pipe,
        })

        house.setUsers(UsersId)
        house.setLocations(LocationsId)
        house.setHeating_Systems(HeatingSystemsId)
        await house.save()

        return res.status(200).send(house)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function update(req, res) {
    try {
        const updated = await Houses.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function remove(req, res) {
    try {
        await Houses.destroy({ where: { id: req.params.id } })
        res.status(200).send(true)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    '/': {
        get: {
            action: get,
            level: 'public',
        },
        post: {
            action: create,
            middlewares: housesValidate,
            level: 'public',
        },
    },
    '/:id': {
        put: {
            action: update,
            level: 'public',
        },
        delete: {
            action: remove,
            level: 'public',
        },
    },
}

const { Heating_Systems } = require('../../../models')
const { heatingSystemsValidate } = require('./admins.validate')

async function get(req, res) {
    try {
        const rows = await Heating_Systems.findAll();
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function create(req, res) {
    try {
        const row = await Heating_Systems.create({
            type: req.body.type,
        })
        return res.status(200).send(row);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function update(req, res) {
    try{
        const updated = await Heating_Systems.update(req.body, {
            where: {id: req.params.id},
            fields: Object.keys(req.body)
        })
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err);
    }
}

async function remove(req, res) {
    try {
        await Heating_Systems.destroy({where: {id: req.params.id}});
        res.status(200).send(true);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    '/': {
        get: {
            action: get,
            level: 'public'
        },
        post: {
            action: create,
            middlewares: heatingSystemsValidate,
            level: 'public'
        }
    },
    '/:id': {
        put: {
            action: update,
            level: 'public'
        },
        delete: {
            action: remove,
            level: 'public'
        },
    },
}
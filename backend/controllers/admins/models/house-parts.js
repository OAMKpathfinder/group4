const { HouseParts } = require('../../../models')

async function get(req, res) {
    try {
        const rows = await HouseParts.findAll();
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function create(req, res) {
    try {
        const row = await HouseParts.create({
            part: req.body.part,
        })
        return res.status(200).send(row);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function update(req, res) {
    try{
        const updated = await HouseParts.update(req.body, {
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
        await HouseParts.destroy({where: {id: req.params.id}});
        res.status(200);
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
const { Houses } = require('../../../models')

async function get(req, res) {
    try {
        const rows = await Houses.findAll();
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function create(req, res) {
    try {
        const row = await Houses.create({
            decade: req.body.decade,
            levels: req.body.levels,
            heating_per_year: req.body.heating_per_year,
            warm_water_pipe: req.body.warm_water_pipe,
        })
        return res.status(200).send(row);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function update(req, res) {
    try{
        const updated = await Houses.update(req.body, {
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
        await Houses.destroy({where: {id: req.params.id}});
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
const { Thermal_Bridges, House_Details } = require('../../../models')

async function get(req, res) {
    try {
        const rows = await Thermal_Bridges.findAll({attributes: {exclude:['HouseDetailId']}});
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function create(req, res) {
    const connection1Id = req.body.connection1Id;
    const connection2Id = req.body.connection2Id;
    try {
        const row = await Thermal_Bridges.build({
            bridge_length: req.body.bridge_length
        })

        row.setHouse_Details1(connection1Id)
        row.setHouse_Details2(connection2Id)
        await row.save()
        return res.status(200).send(row);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function update(req, res) {
    try{
        const updated = await Thermal_Bridges.update(req.body, {
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
        await Thermal_Bridges.destroy({where: {id: req.params.id}});
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
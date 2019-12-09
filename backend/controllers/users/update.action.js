require('module-alias/register')
const { Users } = require('@models')

async function updateUser(req, res) {
    try {
        const updated = await Users.update(req.body, {
            where: { id: req.params.id },
            fields: Object.keys(req.body),
        })
        return res.status(200).send(updated)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    updateUser,
}

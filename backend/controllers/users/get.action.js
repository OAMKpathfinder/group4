const { Users } = require('../../models')

async function getUserById(req, res) {
    try {
        const user = await Users.findByPk(req.params.id);
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    getUserById,
}
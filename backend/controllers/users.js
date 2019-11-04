const { User } = require('../models')

async function getUsers(req, res) {
    try {
        const users = await User.findAll()
        res.status(200).send(users)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    '/': {
        get: {
            action: getUsers,
        }
    }
}
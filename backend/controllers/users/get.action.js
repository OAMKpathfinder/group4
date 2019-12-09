require('module-alias/register')
const { Users } = require('@models')
const jwt = require('jsonwebtoken')

async function getUser(req, res) {
    const token = req.header('x-access-token')
    const user = jwt.decode(token)
    try {
        const data = await Users.findByPk(user.id)
        res.status(200).send({
            username: data.username,
            full_name: data.full_name,
            email: data.email,
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getUser,
}

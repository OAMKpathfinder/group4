const { Users } = require('../../models')
const jwt = require('jsonwebtoken');

async function getAllUsers(req, res, next) {
    try {
        const users = await Users.findAll();
        res.status(200).send(users);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllUsers
};
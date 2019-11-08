const { Users } = require('../../models')

async function getUserById(req, res) {
    try {
        const { user_id } = jwt.decode(req.header('x-access-token'));
        const user = await User.findByPk(user_id);
        res.status(200).send(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    '/': {
        get: {
            action: getUserById,
        }
    }
}
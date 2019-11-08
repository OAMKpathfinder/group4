const { Users } = require('../../models')
const bcrypt = require('bcrypt');

async function deleteUser(req, res, next) {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    deleteUser,
};
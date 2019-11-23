const jwt = require('jsonwebtoken');
const { Users } = require('../models')

const levelFcts = {
    public: (req, res, next) => next(),

    user: (req, res, next) => {
        const token = req.header('x-access-token');

        try {
            jwt.verify(token, process.env.JWT_SECRET);

            const decoded = jwt.decode(token);
            const user = await Users.findByPk(decoded.userId);

            user.role === 'user' ? next() : res.status(401).send('Not authorized')
        } catch (error) {
            return res.status(401).send(error);
        }
    },

    admin: (req, res, next) => {
        const token = req.header('x-access-token');

        try {
            jwt.verify(token, process.env.JWT_SECRET);

            const decoded = jwt.decode(token);
            const user = await Users.findByPk(decoded.userId);

            user.role === 'admin' ? next() : res.status(401).send('Not authorized')
        } catch (error) {
            return res.status(401).send(error);
        }
    }
};

module.exports = level => (req, res, next) => levelFcts[level](req, res, next);

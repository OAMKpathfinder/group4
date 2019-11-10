const jwt = require('jsonwebtoken');
const { Users } = require('../../../models')

const levelFcts = {
    public: (req, res, next) => next(),
    member: (req, res, next) => {
        const token = req.header('x-access-token');
        try {
            const verifyToken = jwt.verify(token, process.env.JWT_KEY);
            const decodeToken = await jwt.decode(token);
            const user = await Users.findByPk(decodeToken.userId);
            if(user.role === 'user'){
                next();
            }
            else return res.status(401);
        } catch (error) {
            return res
                .status(401)
                .json({ message: 'Auth failed!', error: error });
        }
    },
    admin: (req, res, next) => {
        const token = req.header('x-access-token');
        try {
            const verifyToken = await jwt.verify(token, process.env.JWT_KEY);
            const decodeToken = await jwt.decode(token);
            const user = await Users.findByPk(decodeToken.userId);
            if (user.role === 'admin'){
                next();
            }
            else return res.status(401);
        } catch (error) {
            return res
                .status(401)
                .json({ message: 'Auth failed!', error: error });
        }
    }
};
module.exports = level => (req, res, next) => levelFcts[level](req, res, next);
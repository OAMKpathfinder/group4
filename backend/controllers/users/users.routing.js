const { signUp, login } = require('./post.action');
const { getUserById } = require('./get.action');

module.exports = {
    '/auth': {
        post: {
            action: signUp,
            level: user
        },
        get: {
            action: login,
            level: user
        }
    },

    '/:id': {
        get: {
            action: getUserById,
            level: user
        }
    }
}
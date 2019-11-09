const { signUp, login } = require('./post.action');
const { getUserById } = require('./get.action');

module.exports = {
    '/auth': {
        post: {
            action: signUp,
            level: 'public'
        },
        get: {
            action: login,
            level: 'public'
        }
    },

    '/:id': {
        get: {
            action: getUserById,
            level: 'public'
        }
    }
}
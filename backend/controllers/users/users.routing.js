const { signUp, login } = require('./post.action');
const { getUserById } = require('./get.action');

module.exports = {
    '/auth/signup': {
        post: {
            action: signUp,
            level: 'public'
        },
    },
    '/auth/login':{
        post: {
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
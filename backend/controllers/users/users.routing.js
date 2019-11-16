const { signUp, login } = require('./post.action')
const { getUserById } = require('./get.action')
const { userValidate } = require('./users.validate')
const { redirectUser, regenerateCode } = require('./confirmation.action')

module.exports = {
    '/auth/signup': {
        post: {
            action: signUp,
            middlewares: userValidate,
            level: 'public',
        },
    },
    '/auth/login': {
        post: {
            action: login,
            level: 'public',
        },
    },

    '/:id': {
        get: {
            action: getUserById,
            level: 'public',
        },
    },
    '/confirm/:verificationCode': {
        get: {
            action: redirectUser,
            level: 'public',
        },
    },
    '/regenerateCode/:UsersId': {
        get: {
            action: regenerateCode,
            level: 'public',
        },
    },
}

const { signUp, login } = require('./post.action')
const { getUser } = require('./get.action')
const { userValidate } = require('./users.validate')
const { redirectUser, regenerateCode } = require('./confirmation.action')

module.exports = {
    '': {
        get: {
            action: getUser,
            level: 'user',
        },
    },

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

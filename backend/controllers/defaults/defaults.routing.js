const { getDefaults, getImage } = require('./get.action')

module.exports = {
    '/': {
        get: {
            action: getDefaults,
            level: 'user',
        },
    },
    '/:decade': {
        get: {
            action: getImage,
            level: 'public',
        },
    },
}

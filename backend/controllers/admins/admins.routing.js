const { getAttributes, getModels } = require('./get.action')

module.exports = {
    '/models/more': {
        get: {
            action: getAttributes,
            level: 'public',
        },
    },
    '/models': {
        get: {
            action: getModels,
            level: 'admin',
        },
    },
}

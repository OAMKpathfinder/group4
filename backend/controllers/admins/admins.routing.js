const { getAttributes, getModels } = require('./get.action')

module.exports = {
    '/models/:name/attrs': {
        get: {
            action: getAttributes,
            level: 'admin',
        },
    },
    '/models': {
        get: {
            action: getModels,
            level: 'admin',
        },
    },
}

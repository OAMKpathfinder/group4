const { getModels } = require('./get.action')

module.exports = {
    '/models': {
        get: {
            action: getModels,
            level: 'admin',
        },
    },
}

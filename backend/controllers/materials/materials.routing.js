const { getMaterials } = require('./get.action')

module.exports = {
    '/': {
        get: {
            action: getMaterials,
            level: 'user',
        },
    },
}

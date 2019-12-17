const { getLocations } = require('./get.action')

module.exports = {
    '/': {
        get: {
            action: getLocations,
            level: 'user',
        },
    },
}

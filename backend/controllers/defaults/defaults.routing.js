const { getDefaults } = require('./get.action')

module.exports = {
    '/': {
        get: {
            action: getDefaults,
            level: 'user',
        },
    },
}

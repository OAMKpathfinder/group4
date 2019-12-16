const { getSuggestions, upgradeHouse } = require('./get.action')

module.exports = {
    '/:id': {
        get: {
            action: getSuggestions,
            level: 'user',
        },
    },
    '/upgrade/:id': {
        get: {
            action: upgradeHouse,
            level: 'public',
        },
    },
}

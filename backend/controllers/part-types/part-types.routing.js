const {
    getSuggestions,
    upgradeHouse,
    getPotentialHouseCost,
} = require('./get.action')

module.exports = {
    '/:id': {
        get: {
            action: getSuggestions,
            level: 'user',
        },
    },
    '/:id/upgrade': {
        get: {
            action: upgradeHouse,
            level: 'public',
        },
    },
    '/:id/cost': {
        get: {
            action: getPotentialHouseCost,
            level: 'public',
        },
    },
}

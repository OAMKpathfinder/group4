const { getSuggestions } = require('./get.action')

module.exports = {
    '/:id': {
        get: {
            action: getSuggestions,
            level: 'user',
        },
    },
}

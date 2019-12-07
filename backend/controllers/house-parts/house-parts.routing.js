const { getHouseParts } = require('./get.action')

module.exports = {
    '/': {
        get: {
            action: getHouseParts,
            level: 'admin',
        },
    },
}

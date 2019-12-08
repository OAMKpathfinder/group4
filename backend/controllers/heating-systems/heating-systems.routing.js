const { getHeatingSystems } = require('./get.action')

module.exports = {
    '/': {
        get: {
            action: getHeatingSystems,
            level: 'user',
        },
    },
}

const { getAllUsersThermalBridges } = require('./get.action')
const { updateThermalBridges } = require('./update.action')
const { deleteThermalBridges } = require('./delete.action')
const { createThermalBridges } = require('./post.action')
const { thermalBridgesValidate } = require('./thermal-bridges.validate')

module.exports = {
    '/:id': {
        get: {
            action: getAllUsersThermalBridges,
            level: 'user',
        },
        post: {
            action: createThermalBridges,
            middlewares: thermalBridgesValidate,
            level: 'user',
        },
        put: {
            action: updateThermalBridges,
            level: 'user',
        },
        delete: {
            action: deleteThermalBridges,
            level: 'user',
        },
    },
}

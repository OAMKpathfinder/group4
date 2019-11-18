const { getAllUsersThermalBridges } = require('./get.action')
const { updateThermalBridges } = require('./update.action')
const { deleteThermalBridges } = require('./delete.action')
const { createThermalBridges } = require('./post.action')
const { thermalBridgesValidate } = require('./thermal-bridges.validate')

module.exports = {
    '/:id': {
        get: {
            action: getAllUsersThermalBridges,
            level: 'public',
        },
        post: {
            action: createThermalBridges,
            middlewares: thermalBridgesValidate,
            level: 'public',
        },
        put: {
            action: updateThermalBridges,
            level: 'public',
        },
        delete: {
            action: deleteThermalBridges,
            level: 'public',
        },
    },
}

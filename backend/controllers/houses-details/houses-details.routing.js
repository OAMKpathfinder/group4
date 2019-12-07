const { addHouseDetail } = require('./post.action')
const { removeHouseDetail } = require('./delete.action')
const { updateHouseDetail } = require('./update.action')
const { getAllHouseDetails } = require('./get.action')
const { houseDetailsValidate } = require('../../services/validate')

module.exports = {
    '/': {
        post: {
            action: addHouseDetail,
            middleware: houseDetailsValidate,
            level: 'user',
        },
    },
    '/:id': {
        get: {
            action: getAllHouseDetails,
            level: 'user',
        },
        delete: {
            action: removeHouseDetail,
            level: 'user',
        },
        patch: {
            action: updateHouseDetail,
            level: 'user',
        },
    },
}

const { addHouse } = require('./post.action')
const { removeHouse } = require('./delete.action')
const { updateHouse } = require('./update.action')
const { getHouseDetails, getAllUsersHouses } = require('./get.action')
const { housesValidate } = require('@validation')

module.exports = {
    '/': {
        post: {
            action: addHouse,
            middlewares: housesValidate,
            level: 'public',
        },
    },
    '/user': {
        get: {
            action: getAllUsersHouses,
            level: 'user',
        },
    },
    '/:id': {
        get: {
            action: getHouseDetails,
            level: 'user',
        },
        delete: {
            action: removeHouse,
            level: 'user',
        },
        patch: {
            action: updateHouse,
            level: 'user',
        },
    },
}

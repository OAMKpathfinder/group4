const { addHouse } = require('./post.action')
const { removeHouse } = require('./delete.action')
const { updateHouse } = require('./update.action')
const { getHouseDetails, getAllUsersHouses } = require('./get.action')
const { housesValidate } = require('./houses.validate')

module.exports = {
    '/': {
        post: {
            action: addHouse,
            middlewares: housesValidate,
            level: 'public',
        },
        get: {
            action: getHouseDetails,
            level: 'public',
        },
    },
    '/:id': {
        delete: {
            action: removeHouse,
            level: 'public',
        },
        patch: {
            action: updateHouse,
            level: 'public',
        },
    },
    '/user/:id': {
        get: {
            action: getAllUsersHouses,
            level: 'public',
        },
    },
}

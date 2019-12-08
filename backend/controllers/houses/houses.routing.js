require('module-alias/register')
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
    '/user/:id': {
        get: {
            action: getAllUsersHouses,
            level: 'user',
        },
    },
}

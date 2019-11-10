const { addHouse } = require('./post.action');
const { removeHouse } = require('./delete.action');
const { updateHouse } = require('./update.action');
const { getAllUserHouses, getUserHouse } = require('./get.action');

module.exports = {
    '/:ownerId':{
        post: {
            action: addHouse,
            level: 'public'
        },
        get: {
            action: getAllUserHouses,
            level: 'public'
        }
    },
    '/:ownerId':{
        delete: {
            action: removeHouse,
            level: 'public'
        },
        patch: {
            action :updateHouse,
            level: 'public'
        },
        get: {
            action: getUserHouse,
            level: 'public'
        }
    }
}
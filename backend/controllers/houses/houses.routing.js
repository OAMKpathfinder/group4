const { addHouse } = require('./post.action');
const { removeHouse } = require('./delete.action');
const { updateHouse } = require('./update.action');
const { getHouseDetails, getAllUsersHouses } = require('./get.action');

module.exports = {
    '/:id':{
        post: {
            action: addHouse,
            level: 'public'
        },
        get: {
            action: getHouseDetails,
            level: 'public'
        },
        delete: {
            action: removeHouse,
            level: 'public'
        },
        patch: {
            action :updateHouse,
            level: 'public'
        },    
    },
    '/user/:id': {
        get:{
            action: getAllUsersHouses,
            level: 'public'
        }
    }
}
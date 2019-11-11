const { addHouseDetail } = require('./post.action');
const { removeHouseDetail } = require('./delete.action');
const { updateHouseDetail } = require('./update.action');
const { getAllHouseDetails } = require('./get.action');

module.exports = {
    '/:id':{
        post: {
            action: addHouseDetail,
            level: 'public'
        },
        get: {
            action: getAllHouseDetails,
            level: 'public'
        },
        delete: {
            action: removeHouseDetail,
            level: 'public'
        },
        patch: {
            action :updateHouseDetail,
            level: 'public'
        },    
    }
}
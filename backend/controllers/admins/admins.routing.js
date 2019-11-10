const { getAttributes, getModels } = require('./get.action');


module.exports = {
    '/models/:name/attrs':{
        get: {
            action: getAttributes,
            level: 'public'
        }
    },
    '/models':{
        get: {
            action: getModels,
            level: 'public'
        }
    }
}
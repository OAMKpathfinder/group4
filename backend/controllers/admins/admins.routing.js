const { getAttributes } = require('./get.action');


module.exports = {
    '/models/:name/attrs':{
        get: {
            action: getAttributes,
            level: 'public'
        }
    },
}
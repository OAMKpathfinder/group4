const fs = require('fs')
const path = require('path')

const store = {
    set(key, value) {
        store[key] = value
    },
    get(key) {
        return store[key]
    },
}

function loadFiles() {
    const directoryPath = path.join('./data/')

    fs.readdir(directoryPath, function(err, files) {
        let arr = []
        if (err) {
            console.error('Error getting directory.', directoryPath)
        }
        for (const file of files) {
            arr.push(file)
        }
        store.set('files', arr)
    })
}

module.exports = {
    store,
    loadFiles,
}

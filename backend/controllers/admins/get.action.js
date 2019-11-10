const db = require('../../models')

async function getModels(req, res){
    try{
        res.status(200).send(Object.keys(db).slice(0, -2));
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getAttributes(req, res){
    try{
        const name = req.params.name;
        console.log(db[name])
        res.status(200).send(db[name].tableAttributes)
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    getAttributes,
    getModels
}
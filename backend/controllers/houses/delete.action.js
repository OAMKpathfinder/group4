const { Houses } = require('../../models')

async function removeHouse(req, res) {
    try {
        await Houses.destroy({ where: { id: req.params.id } })
        res.status(200)
    } catch (err) {
        res.status(500).send(err)
    }
}

// async function removeHouseWithDetails(req, res){
//     try{

//     } catch (err) {
//         res.status(500).send(err)
//     }
// }

module.exports = {
    removeHouse,
}

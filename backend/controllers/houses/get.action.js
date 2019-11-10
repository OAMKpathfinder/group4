const {Users, Houses, House_Details, Thermal_Bridges } = require('../../models')

async function getAllUserHouses(req, res) {
    const ownerId = req.params.ownerId;
    try {
        const rows = await Houses.findAll({where: {ownerId: ownerId}});
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send(err);
    }
}

async function  getUserHouse(req, res){
    try{
        const house = await Houses.findAll({include: [{all: true, nested:true}]}
            // {
            //     include: [{
            //         model: Houses,
            //         as: 'Houses',
            //         // include: [{
            //         //     model: House_Details,
            //         //     as: 'House_Details'
            //         // }]
            //     }]
            // }
            );
        return res.status(200).send(house)
    } catch(err){
        console.log(err)
        res. status(500).send(err);
    }
}

module.exports = {
    getAllUserHouses,
    getUserHouse
}
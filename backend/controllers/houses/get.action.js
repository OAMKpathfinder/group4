const {Users, Houses, House_Details, Thermal_Bridges, Locations, House_Parts, Materials, Heating_Systems } = require('../../models')

async function getHouseDetails(req, res) {
    try {
        const house = await Houses.findByPk(req.params.id, {
            include: [{
                    model: Users,
                    as: 'Users',
                }, {
                    model: Locations,
                    as: 'Locations'
                }, {
                    model: Heating_Systems,
                    as: 'Heating_Systems'
                },
                {
                model: House_Details,
                as: 'House_Details',
                include: [{
                    model: House_Parts,
                    as: 'House_Parts'
                }, {
                    model: Materials,
                    as: 'Materials'
                }],
                attributes: {exclude: ['HouseDetailsId']}
            }]
            });
        return res.status(200).send(house)
    } catch(err){
        console.log(err)
        res. status(500).send(err);
    }
}

module.exports = {
    getHouseDetails,
    
}
const { Houses, Users, Locations, Heating_Systems } = require('../../models')

async function addHouse(req, res) {
    const ownerId = req.params.ownerId;
    const locationId = req.body.locationId;
    const heatingSystemId = req.body.heatingSystemId;
    try {
        const house = await Houses.build({
            decade: req.body.decade,
            levels: req.body.levels,
            heating_per_year: req.body.heating_per_year,
            warm_water_pipe: req.body.warm_water_pipe,
        })
        
        house.setUsers(ownerId)
        house.setLocations(locationId)
        house.setHeating_Systems(heatingSystemId)
        await house.save()

        return res.status(200).send(house);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    addHouse
}
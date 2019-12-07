const { Houses } = require('../../models')

async function addHouse(req, res) {
    const UsersId = req.body.UsersId
    const LocationsId = req.body.LocationsId
    const HeatingSystemsId = req.body.HeatingSystemsId
    try {
        const house = await Houses.build({
            decade: req.body.decade,
            levels: req.body.levels,
            heating_per_year: req.body.heating_per_year,
            warm_water_pipe: req.body.warm_water_pipe,
            UsersId: UsersId,
            LocationsId: LocationsId,
            HeatingSystemsId: HeatingSystemsId,
        })

        await house.save()

        return res.status(200).send(house)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    addHouse,
}

const {
    Houses,
    House_Details,
    Locations,
    House_Parts,
    Materials,
    Heating_Systems,
    Thermal_Bridges,
    Part_Materials,
} = require('@models')

const jwt = require('jsonwebtoken')

async function getAllUsersHouses(req, res) {
    const token = req.header('x-access-token')
    const user = jwt.decode(token)

    try {
        const houses = await Houses.findAll({
            where: { UsersId: user.id },
        })

        return res.status(200).send(houses)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getHouseDetails(req, res) {
    try {
        const house = await Houses.findByPk(req.params.id, {
            include: [
                {
                    model: Locations,
                    as: 'Locations',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
                },
                {
                    model: Heating_Systems,
                    as: 'Heating_Systems',
                    attributes: { exclude: ['createdAt', 'updatedAt', 'id'] },
                },
                {
                    model: House_Details,
                    as: 'House_Details',
                    include: [
                        {
                            model: House_Parts,
                            as: 'House_Parts',
                            attributes: {
                                exclude: ['createdAt', 'updatedAt', 'id'],
                            },
                        },
                        {
                            model: Part_Materials,
                            as: 'Part_Materials',
                            include: [
                                {
                                    model: Materials,
                                    as: 'Materials',
                                    attributes: {
                                        exclude: ['createdAt', 'updatedAt'],
                                    },
                                },
                            ],
                            attributes: {
                                exclude: [
                                    'createdAt',
                                    'updatedAt',
                                    'HouseDetailsId',
                                    'MaterialsId',
                                ],
                            },
                        },
                        {
                            model: Thermal_Bridges,
                            as: 'Thermal_Bridges',
                            attributes: {
                                exclude: [
                                    'HouseDetailId',
                                    'createdAt',
                                    'updatedAt',
                                    'id',
                                ],
                            },
                        },
                    ],
                    attributes: {
                        exclude: [
                            'id',
                            'HousePartsId',
                            'HouseDetailsId',
                            'createdAt',
                            'updatedAt',
                            'HousesId',
                        ],
                    },
                },
            ],
            attributes: {
                exclude: [
                    'createdAt',
                    'updatedAt',
                    'HeatingSystemsId',
                    'UsersId',
                    'LocationsId',
                ],
            },
        })
        return res.status(200).send(house)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports = {
    getHouseDetails,
    getAllUsersHouses,
}

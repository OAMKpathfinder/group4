const {
    Houses,
    House_Details,
    Part_Materials,
    Thermal_Bridges,
    Materials,
} = require('@models')

function calculateUValue(detail) {
    return new Promise((resolve, reject) => {
        Part_Materials.findAll({
            where: { HouseDetailsId: detail.id },
            attributes: ['MaterialsId'],
        })
            .then(arr => {
                let thermalConductivity = 0
                let thickness = 0
                arr.forEach(element => {
                    Materials.findByPk(element.MaterialsId)
                        .then(material => {
                            thermalConductivity += material.thermal_conductivity
                            thickness += material.thickness
                            House_Details.update(
                                {
                                    U_value: (
                                        thermalConductivity / thickness
                                    ).toFixed(3),
                                },
                                {
                                    where: { id: detail.id },
                                }
                            )
                                .then(() => {
                                    return resolve(true)
                                })
                                .catch(err => {
                                    return reject(err)
                                })
                        })
                        .catch(err => {
                            return reject(err)
                        })
                })
            })
            .catch(err => {
                return reject(err)
            })
    })
}

function calculateHjoht(HouseDetailsId) {
    return new Promise((resolve, reject) => {
        House_Details.findOne({
            where: { id: HouseDetailsId },
            attributes: { exclude: ['HouseDetailsId'] },
        })
            .then(result => {
                Thermal_Bridges.findAll({
                    where: { HouseDetailsId: result.id },
                    attributes: { exclude: ['HouseDetailId'] },
                })
                    .then(thermalArr => {
                        let sum = 0
                        if (thermalArr) {
                            thermalArr.forEach(element => {
                                sum += element.bridge_length
                            })
                        }
                        const newHjoht = (
                            result.U_value * result.surface +
                            sum
                        ).toFixed(3)
                        House_Details.update(
                            { hjoht: newHjoht },
                            { where: { id: result.id } }
                        )
                            .then(() => {
                                return resolve(true)
                            })
                            .catch(err => {
                                return reject(err)
                            })
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
            .catch(err => {
                return reject(err)
            })
    })
}

function calculateTotalHjoht(HouseId) {
    return new Promise((resolve, reject) => {
        House_Details.findAll({
            where: { HousesId: HouseId },
            attributes: { exclude: ['HouseDetailsId'] },
        })
            .then(arr => {
                let totalHjoht = 0
                arr.forEach(element => {
                    totalHjoht += element.hjoht
                })
                Houses.update({ hjoht: totalHjoht }, { where: { id: HouseId } })
                    .then(() => {
                        return resolve(true)
                    })
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}

function totalCost(houseDetail, price) {
    return new Promise((resolve, reject) => {
        Houses.findOne({ where: { id: houseDetail.HousesId } })
            .then(result => {
                Houses.update(
                    { price: result.price + price },
                    { where: { id: result.id } }
                )
                    .then(() => {
                        return resolve(true)
                    })
                    .catch(err => {
                        return reject(err)
                    })
            })
            .catch(err => {
                return reject(err)
            })
    })
}

module.exports = {
    calculateUValue,
    calculateHjoht,
    calculateTotalHjoht,
    totalCost,
}

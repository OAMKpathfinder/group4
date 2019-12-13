const {
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
                    // console.log(element.MaterialsId)
                    Materials.findByPk(element.MaterialsId)
                        .then(material => {
                            thermalConductivity += material.thermal_conductivity
                            // console.log(material)
                            thickness += material.thickness
                            House_Details.update(
                                {
                                    U_value: (
                                        thermalConductivity / thickness
                                    ).toFixed(3),
                                },
                                { where: { id: detail.id } }
                            )
                        })
                        .then(() => {
                            return resolve(true)
                        })
                })
            })
            .catch(err => {
                reject(err)
            })
    })
}

async function calculateHjoht(HouseDetailsId) {
    try {
        const detail = await House_Details.findOne({
            where: { id: HouseDetailsId },
            attributes: { exclude: ['HouseDetailsId'] },
        })
        const thermalBridge = await Thermal_Bridges.findAll({
            where: { HouseDetailsId: detail.id },
            attributes: { exclude: ['HouseDetailId'] },
        })
        let sum = 0
        if (thermalBridge) {
            // length = thermalBridge.bridge_length
            thermalBridge.forEach(async element => {
                sum += element.bridge_length
            })
        }

        const newHjoht = (detail.U_value * detail.surface + sum).toFixed(2)

        await House_Details.update(
            { hjoht: newHjoht },
            { where: { id: detail.id } }
        )
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    calculateUValue,
    calculateHjoht,
}

const { House_Details, Materials, Thermal_Bridges } = require('../models')

async function calculateUValue(detail, materialId) {
    try {
        const material = await Materials.findOne({ where: { id: materialId } })
        await House_Details.update(
            {
                U_value: (
                    material.thickness / material.thermal_conductivity
                ).toFixed(2),
            },
            { where: { id: detail.id } }
        )
    } catch (err) {
        console.log(err)
    }
}

async function calculateHjoht(id) {
    try {
        const detail = await House_Details.findOne({
            where: { id: id },
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

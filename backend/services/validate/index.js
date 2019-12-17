const { adminsValidate } = require('./admins.validate')
const { heatingSystemsValidate } = require('./heating-systems.validate')
const { housePartsValidate } = require('./house-parts.validate')
const { houseDetailsValidate } = require('./houses-details.validate')
const { housesValidate } = require('./houses.validate')
const { locationsValidate } = require('./locations.validate')
const { materialsValidate } = require('./materials.validate')
const { partTypesValidate } = require('./part-types.validate')
const { userValidate } = require('./user.validate')

module.exports = {
    adminsValidate,
    heatingSystemsValidate,
    housePartsValidate,
    houseDetailsValidate,
    housesValidate,
    locationsValidate,
    materialsValidate,
    partTypesValidate,
    userValidate,
}

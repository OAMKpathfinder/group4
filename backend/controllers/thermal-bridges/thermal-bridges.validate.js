const Joi = require('@hapi/joi');

async function thermalBridgesValidate(req, res, next){
    try{
        const schema = Joi.object({
            bridge_length: Joi.number().required(),

            HouseDetailsId1: Joi.number().integer().min(0).required(),

            HouseDetailsId2: Joi.number().integer().min(0).required()
        });

        const value = await schema.validateAsync(req.body);
        next();
    }catch(err){
        return res.status(500).send(err);
    }
}

module.exports = {
    thermalBridgesValidate
}
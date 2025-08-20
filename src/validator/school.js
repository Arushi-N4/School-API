const Joi = require('joi');

exports.addSchoolSchema = Joi.object({
    name: Joi.string().trim().min(1).required(),
    address: Joi.string().trim().min(1).required(),
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required(),
});

exports.listSchoolsSchema = Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required(),
});
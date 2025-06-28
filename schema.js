// schema for ur ss (server side) validation
// joi -> powerful server schema descriptive lang
const Joi = require('joi')

const productSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.string().min(0).required(),
    description: Joi.string().required()

})

const reviewSchema = Joi.object({
    rating: Joi.string().min(0).max(5).required(),
    description: Joi.string().required()

})

module.exports = {productSchema, reviewSchema}
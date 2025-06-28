
const {productSchema, reviewSchema} = require('./schema')

const validateProduct = (req,res,next)=>{
    const {name,img,price,description}= req.body
    const {error} = productSchema.validate({name,img,price,description})
    if(error){
        return res.render('error')
    }
    next()
}

const validateReview = (req,res,next)=>{
    const {rating, comment}= req.body
    const {error} = productSchema.validate({rating, comment})
    if(error){
        return res.render('error')
    }
    next()
}

module.exports = {validateProduct, validateReview}
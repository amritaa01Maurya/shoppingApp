const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router()
const {validateReview} = require('../middleware')


router.post('/products/:id/review',validateReview,async(req,res)=>{
    let {id}=req.params;
    let {rating,comment}=req.body;
    const product = await Product.findById(id)
    const review = new Review({rating,comment})

    product.reviews.push(review) // its js method
    await review.save() // so we have to save the data
    await product.save()

    res.redirect(`/products/${id}`)
    

})

module.exports = router
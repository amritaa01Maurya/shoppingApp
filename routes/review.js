const express = require('express');
const router = express.Router()
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateReview} = require('../middleware')
// my this line of code is giving error

router.post('/products/:id/review',validateReview,async(req,res)=>{
    let {id}=req.params;
    let {rating,comment}=req.body;
    const product = await Product.findById(id)
    const review = new Review({rating,comment})

    product.reviews.push(review) // its js method
    await review.save() // so we have to save the data
    await product.save()
    // flash msg for adding review 
    // req.flash('msg','Review added successfully')
    req.flash('success','Review added successfully')
    // to show a particular product
    res.redirect(`/products/${id}`) // here flash will be show to we have to add it in there
    

})

module.exports = router
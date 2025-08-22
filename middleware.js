
const Product = require('./models/Product')
const {productSchema, reviewSchema} = require('./schema')
const passport = require('passport')

const validateProduct = (req,res,next)=>{
    const {name,img,price,description,quantity}= req.body
    const {error} = productSchema.validate({name,img,price,description,quantity})
    if(error){
        return res.render('error')
    }
    next()
}

const validateReview = (req,res,next)=>{
    const {rating, comment}= req.body
    const {error} = reviewSchema.validate({rating, comment})
    if(error){
        return res.render('error')
    }
    next()
}

// if user is logged in 
const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','please login first')
        return res.redirect('/login')
    }
    next()
}

const isSeller = (req,res,next)=>{
    // if a user do not have role field then he can't do this
    if(!req.user.role){
        req.flash('error','You do not have the permission to do this!')
        return res.redirect('/products')
    }else if(req.user.role !== 'seller'){
        req.flash('error','You do not have the permission to do this!')
        return res.redirect('/products')
    }
    next()
}


const isProductAuthor = async(req,res,next)=>{
    const {id} = req.params;  // to get product id
    let product = await Product.findById(id) // entire product // if we are working with db then there will be wait to it will be asyns await
    // when u compare 2 obj ids then u use method equals not ===
    if(!product.author.equals(req.user._id)){
        req.flash('error','You are not the authorised user !')
        return res.redirect('/products')
    }
    next()
}

module.exports = {isLoggedIn, validateReview, validateProduct, isSeller, isProductAuthor}
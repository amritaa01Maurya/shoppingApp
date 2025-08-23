
const express = require('express')
const Product = require('../models/Product')// load the database/schema of products
const Review = require('../models/Review')
const router = express.Router()// mini instance
const {validateProduct, isLoggedIn, isSeller, isProductAuthor} = require('../middleware')


// to show all the products
router.get('/products', async(req,res)=>{
    try{
        let products = await Product.find({})
        res.render('products/index',{products})
    }
    catch(e){
        res.status(404).render('error',{err: e.message})
    }
    
})

// to show the form of the new products
router.get('/product/new',isLoggedIn, (req,res)=>{
    try{
        res.render('product/new')
    }
    catch(e){
        res.status(404).render('error',{err: e.message})
    }
})

//to actually add the products  after valid pro   it goes to it
router.post('/products', validateProduct, isLoggedIn, isSeller, async(req,res)=>{
    try{
        let {name,img,price,description, quantity} = req.body;
        await Product.create({name,img,price,description,quantity, author:req.user._id}) // here author is not coming from req body; it is coming from login(user)
        req.flash('success','Product added successfully')
        res.redirect('/products')
    }
    catch(e){
        res.status(404).render('error',{err: e.message})
    }
})

// to show a particular product
router.get('/products/:id', isLoggedIn, async(req,res)=>{
    try{
        let {id} = req.params
        let foundProduct = await Product.findById(id).populate('reviews') // populate with reviews when we are showing a particular product
        res.render('products/show',{foundProduct, msg:req.flash('msg')}) //now go to show page 
    }
    catch(e){
        res.status(404).render('error',{err: e.message})
    }
})

// form to edit the product data
router.get('/products/:id/edit', isLoggedIn,isProductAuthor, async(req,res)=>{
    try{

        let {id} = req.params
        let foundProduct = await Product.findById(id)
        res.render('products/edit',{foundProduct})
    }
    catch(e){
        res.status(404).render('error',{err: e.message})
    }
})

// to actually edit the data in db
router.patch('/products/:id',validateProduct, isLoggedIn,isProductAuthor, async(req,res)=>{
    try{
        let {id} = req.params
        let {name,img,price,description,quantity} = req.body;
        await Product.findByIdAndUpdate(id, {name,img,price,description,quantity})
        req.flash('success','Product edited successfully')
        res.redirect(`/products/${id}`)
    }
    catch(e){
        res.status(404).render('error',{err: e.message})
    }
})

// to delete a product with reviews
router.delete('/products/:id', isLoggedIn, isProductAuthor, async(req,res)=>{
    try{
        let {id} = req.params
        const product = await Product.findById(id)
        
        // to delete the reviews of a particular product
    // for (let id of product.reviews) {
    //   await Review.findByIdAndDelete(id)
    // }

        await Product.findByIdAndDelete(id)
        req.flash('success','Product deleted successfully')
        res.redirect(`/products`)
    }
    catch(e){
        res.status(404).render('error',{err: e.message})
    }  
})

module.exports = router
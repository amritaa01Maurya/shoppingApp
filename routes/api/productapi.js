// api = returns the data to be manipulated
// routes=> retrun the entire response ejs file

const express = require('express');
const router = express.Router();
let {isLoggedIn} = require('../../middleware')
const User = require('../../models/User');

router.post('/product/:productId/like' , isLoggedIn , async(req,res)=>{
    let {productId} = req.params;
    let user = req.user;
    let isLiked = user.wishList.includes(productId);

    // if(isLiked){
    //     User.findByIdAndUpdate(req.user._id , {$pull:{wishList:productId}})
    // }else{
    //     User.findByIdAndUpdate(req.user._id , {$addToSet:{wishList:productId}})
    // }
// or 
// addtoset=> if the val is not in the array then add it
// pull=> if the val is in the array then remove it
    const option = isLiked? '$pull' : '$addToSet';
    //the below code can be done by else if as well
    req.user = await User.findByIdAndUpdate(req.user._id , {[option]:{wishList:productId}} , {new:true} )
    res.send('like done api');
})


module.exports = router;
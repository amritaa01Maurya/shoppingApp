const { ref } = require('joi')
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required: true
    },
    role:{
        type:String,
        // trim:true,
        required: true
    },
    wishList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    cart:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

// during authentication password and username save automatecally on db

userSchema.plugin(passportLocalMongoose)

 
let User = mongoose.model('User', userSchema)
module.exports = User
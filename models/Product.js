const mongoose = require("mongoose");
const Review = require("./Review");
const { required } = require("joi");

const productSchema= new mongoose.Schema({
    name: {
        type:String,
      trim:true,
        required: true
    },
    img: {
        type:String,
        trim:true,
        // default:
    },
    price:{
        type:Number,
        min: 0,
        required: true
    } ,
    description: {
        type:String,
        trim:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    avgRating:{
        type: Number,
        default: 0
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
            ref:'User'
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    }
})

// middleware jo BTS mongodb operations karwane par use hota hai and iske ander pre and post middleware hote hai which are basically used over the schema and before the model is js class
// Mongoose middleware function to delete all the associated reviews on a product

productSchema.post('findOneAndDelete',async function(product) {
    if(product.reviews.length > 0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})

let Product = mongoose.model('Product',productSchema)

module.exports = Product;
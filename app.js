
const express = require('express')
const app = express() // we can not exports the app because they the instances of the application
const path = require('path')
const mongoose = require('mongoose');
const seedDB = require('./seed')
const productRoutes = require('./routes/product')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')


mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log("DB disconnected");
        console.log(err);
    });


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')// sirf ejs ki file dekh
app.set('views', path.join(__dirname, 'views'))// views folder
app.use(express.static(path.join(__dirname, 'public'))) // public folder
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


// seeding databases
// seedDB()  // when we use nodemon files runs continuosly which create many seeded DB so we run one time and then comment it
// how to delete the db
//  db.products.deleteMany({})


app.use(productRoutes)//so that har incoming request ke liye path chack kiya jaye

app.listen(8080, () => {
    console.log("server conected at port 8080");
})




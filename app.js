
const express = require('express')
const app = express() // we can not exports the app because they the instances of the application
const path = require('path')
const mongoose = require('mongoose');

const seedDB = require('./seed')

const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
// require the userschema from model
const User = require('./models/User')


// routes
const productRoutes = require('./routes/product')
const reviewRoutes = require('./routes/review')
const authRoutes = require('./routes/auth')



mongoose.connect('mongodb://127.0.0.1:27017/shopping-app')
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) => {
        console.log("DB disconnected");
        console.log(err);
    });

// for session
let configSession = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
//   cookie: { secure: true }
  cookie: { 
    httpOnly: true,
    expires: Date.now() +  24 * 7 * 60 * 60 * 1000,
    maxAge: 24 * 7 * 60 * 60 * 1000
    
   }
}


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')// sirf ejs ki file dekh
app.set('views', path.join(__dirname, 'views'))// views folder
app.use(express.static(path.join(__dirname, 'public'))) // public folder
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
// for session
app.use(session(configSession))

// for passport init
app.use(passport.initialize())
app.use(passport.session())
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash 
app.use(flash())
// store in locals to access from anywhere
app.use((req,res,next)=>{
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

// PASSPORT
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));


// seeding databases
// seedDB()  // when we use nodemon files runs continuosly which create many seeded DB so we run one time and then comment it
// how to delete the db
//  db.products.deleteMany({})


app.use(productRoutes)//so that har incoming request ke liye path chack kiya jaye
app.use(reviewRoutes)//so that har incoming request ke liye path chack kiya jaye
app.use(authRoutes)//so that har incoming request ke liye path chack kiya jaye


app.listen(8080, () => {
    console.log("server conected at port 8080");
})




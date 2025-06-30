const express = require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router()

// to show the form of signup
router.get('/register', (req,res)=>{
    res.render('auth/signup')
})

// actually want to register a user in my db
router.post('/register',async(req,res)=>{
    try{
    let {email, password, username} =  req.body
    const user = new User({email, username})
    const newUser = await User.register(user, password)
    // res.send(newUser)
    // res.redirect('/login')
    req.login(newUser, function (err) {
        if(err){
            return next(err)
        }
        req.flash('success','welcome, you are registered successfully')
        return res.redirect('/products')
        })
    }
    catch(e){
        req.flash('error',e.message)
        return res.redirect('/signup')
    }
})

// to get login form
router.get('/login', (req,res)=>{
    res.render('auth/login')
})


// to acraully login via the db
router.post('/login', 
    passport.authenticate('local', { 
        failureRedirect: '/login', 
        failureMessage: true 
    }),
    (req,res)=>{
        // console.log(req.user);
        req.flash('success', 'Welcome Back')
        res.redirect('/products')
})

// logout
router.get('/logout', (req,res)=>{
    ()=>{
        req.logout()
    }
    req.flash('success', 'Goodbye! see you again')
    res.redirect('/login')
})

// static method
// authenticate()-> Generates a function that is used in Passport's LocalStrategy
// serializeUser()-> Generates a function that is used by Passport to serialize users into the session
// deserializeUser()-> Generates a function that is used by Passport to deserialize users into the session
// register(user, password, cb)-> Convenience method to register a new user instance with a given password. Checks if username is unique. See login example.
// findByUsername()-> Convenience method to find a user instance by it's unique username.
// createStrategy()-> Creates a configured passport-local LocalStrategy instance that can be used in passport.

module.exports = router
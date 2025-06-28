const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// app.use(cookieParser())
app.use(cookieParser('youneedabwttersecret'))

app.get('/',(req,res)=>{
    // console.log("root ");
    // res.send('root connected')
    console.log(req.signedCookies);
    // res.send(req.cookies)  // all easy cookies
    res.send(req.signedCookies)  // all signed cookies
})


// app.get('/setcookie',(req,res)=>{
//     res.cookie('mode','dark')
//     res.cookie('location','gorakhpur')
//     res.cookie('username','amrita')
//     res.send('server sent u cookies')
// })


// signed cookie
app.get('/getsignedcookies',(req,res)=>{
    res.cookie('bindaas','sachin', {signed:true})
    res.send('cookies send successfully')
})

// app.get('/getcookies',(req,res)=>{
//     let {mode, location, username} = req.cookies;
//     res.send(`name is ${username}, live in ${location} and there computer theme is ${mode}`)
// })

app.listen(8080, ()=>{
    console.log('server connected at 8080');
})
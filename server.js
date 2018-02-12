const express = require('express');
const hbs= require('hbs');
const fs = require('fs');
//make new app
var app = express();

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');

//middleware teaches express what it doesnt know
app.use((req,res,next) =>{
    var now= new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log' , log + '\n', (err)=>{
        if (err){
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
//
// });

app.use(express.static(__dirname + '/public'));

//helps the partials
hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})
//set handler
app.get('/', (req,res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to home page'
})
});

app.get('/about', (req,res) =>{
   res.render('about.hbs', {
       pageTitle: 'About page',
});
});

app.get('/bad', (req,res)=>{
   res.send({
    errorMessage: 'Unable to send data'
    });
});
app.listen(3000, () =>{
    console.log('server is up on port 3000');
});
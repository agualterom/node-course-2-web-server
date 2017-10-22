const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

// we create an app calling express method
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//middleware

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    // logger
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) { console.log('Failed trying to append server.log'); }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs',{pageTitle:'Maintenance'})
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//route root
app.get('/',(req, res) => {
    // res.send('<h1>Hello Express! :0 chan chan chan</h1>');
    // res.send({
    //     name: 'Andrea',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my home page'
    });
});

//route about
app.get('/about', (req, res) => {
    // res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

// /bad - send back json with errorMessage

app.get('/bad', (req, res) => {
    res.send({
        errorMessage:'Unable to handle request'
    });
});

//app stars listening
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});
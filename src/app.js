const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');

const app = express();

//Define paths for express config
//path.join aponta para o path onde se encontra o html que se pretende utilizar
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// setup the handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); //views location
hbs.registerPartials(partialsPath); //registra os partials

//permite que o express faca o uso do public path directory
app.use(express.static(publicDirectoryPath));

//to render in the index 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Valter Moore'
    })
});

//to render in the about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Valter Moore'
    })
})

//to render in help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helpText: 'This is some helpful text',
        name: 'Valter Moore'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Valter Moore',
        notFoundMessage: 'Help article not found!'
    });
});

//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        });
    };

    geoCode(req.query.address, (error, { location }) => {


        if (error) {
            return res.send(error)
        }

        foreCast(location, (error, forecastData) => {
            if (error) {
                return res.send(error);
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    });
});

//404 not found page
app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        notFoundMessage: 'Page not found!',
        name: 'Valter Moore'
    })
})

//Connecta a app no server
app.listen(3000, () => {
    console.log('Listening on port 3000')
});
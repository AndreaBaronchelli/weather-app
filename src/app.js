// Dependencies
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utilities/geocode');
const forecast = require('./utilities/forecast');

// Init express
const app = express();

// Define paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars
app.set('view engine', 'hbs');

// Setup views location
app.set('views', viewsPath);

// Setup partials location
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicPath));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrea Baronchelli',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrea Baronchelli',
    });
});

app.get('/help', (req, res) => {
    res.render('about', {
        title: 'Help',
        name: 'Andrea Baronchelli',
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Ops!',
        text: 'Article not found',
        name: 'Andrea Baronchelli',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.render('404', {
            title: 'Ops!',
            text: 'You must provide an address',
            name: 'Andrea Baronchelli',
        });
    }
    geocode(
        req.query.search,
        (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send(error);
            }
            forecast(
                longitude,
                latitude,
                (error, { description, temperature, humidity } = {}) => {
                    if (error) {
                        return res.send(error);
                    } else {
                        res.send({
                            address: req.query.search,
                            location,
                            temperature,
                            description,
                            humidity,
                        });
                    }
                }
            );
        }
    );
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Ops!',
        text: 'Page not found',
        name: 'Andrea Baronchelli',
    });
});

app.listen(3000, (req, res) => {
    console.log('Server on port 3000');
});

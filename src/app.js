const path = require('path')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Defines paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Seungyoun App',
        name: 'Dear',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dear',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'Help page',
        name: 'Dear',
    })
})

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Weather',
        msg: 'Weather page',
        name: 'Dear',
    })
})

app.get('/weathers', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode(req.query.address, (error, {lat, long} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            forecast(lat, long, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }

                res.send({
                    forecast: forecastData.forecast,
                    location: forecastData.location,
                    address: req.query.address,
                })
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dear',
        msg: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dear',
        msg: 'My 404 page',
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode.js')
const forecast = require('../src/utils/forecast.js')

// Define and setup express server on port 3000
const app = express()
const port = process.env.PORT || 3000 // Set port equal to env port on Heroku or locally

// Define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // Tell settings where to look for template folder in dynamic templating
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Justin Beausoleil'
    }) // (Name of View, Object)
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Justin Beausoleil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Justin Beausoleil'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, ({latitude, longitude, placeName} = {}, error) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (forecastData, error) => {
            res.send({
                forecast: forecastData,
                location: placeName,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errorMessage: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res, next) => {
    res.status(404);
    res.render('404', {
        title: '404',
        name: 'Justin Beausoleil',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.status(404);
    res.render('404', {
        title: '404',
        name: 'Justin Beausoleil',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    if (port === 3000) {
        return console.log(`Example app listening at http://localhost:${port}.`)
    }
    console.log(`Application listening at port: ${port}.`)
})
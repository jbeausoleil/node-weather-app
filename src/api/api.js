const axios = require('axios')

const geoInstance = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    method: 'get',
    params: {
        access_token: 'pk.eyJ1IjoiamJlYXVzb2xlaWwiLCJhIjoiY2toNDcydXJ5MDJibzJxcHF3Z3Vhcjc5diJ9.quO8xfGiXZ7nIGqU0q_erA',
    },
})

const puzzleInstance = axios.create({
    baseURL: 'http://puzzle.mead.io/puzzle',
    method: 'get'
})

module.exports = {
    geoInstance,
    puzzleInstance
}
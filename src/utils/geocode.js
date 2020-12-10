const api = require('../api/api.js')
const chalk = require('chalk')

const geocode = (address, callback) => {

    api.geoInstance.get(`/${encodeURIComponent(address)}.json`)
        .then(response => {
            if (response.data.features.length === 0) {
                callback(undefined, 'Unable to find location.  Try another search.')
            } else {
                callback({
                    longitude: response.data.features[0].center[0],
                    latitude: response.data.features[0].center[1],
                    placeName: response.data.features[0].place_name
                }, undefined)
            }
        })
        .catch(error => { // System level errors (like internet connectivity)
                if (error.response) {
                    callback(`${chalk.red('Response Error')} code: ${error.response.status}, info: ${error.response.statusText}`)
                } else
                    callback(`${chalk.red('Request Error')} code: ${error.code}`)
            }
        );
};

module.exports = geocode
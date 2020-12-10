const axios = require('axios')

const forecast = (latitude, longitude, callback) => {

    axios({
        baseURL: 'http://api.weatherstack.com',
        url: '/forecast',
        method: 'get',
        params: {
            access_key: 'e145f2dc6b48b054d78eb4ad76c0b733',
            query: `${latitude},${longitude}`,
            units: 'f'
        }
    })
        .then(response => {
            if (!response.data.error) {
                const weatherApiResponse = response.data;
                callback(`${weatherApiResponse.current.temperature} degF.`, undefined);
            } else {
                callback(undefined, `Response error: code: ${response.data.error.code}, info: ${response.data.error.info}`)
            }
        }).catch(error => {
            callback("An error occurred: ", error);
        }
    )
};

module.exports = forecast

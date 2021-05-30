const request = require('request')

const forecast = (lat, long, callback) => {
    const token = "f9a15cb5430f63bbfc05eeca11891195"
    const url = `http://api.weatherstack.com/current?access_key=${token}&query=${lat},${long}`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (response.body.error) {
            callback('Can\'t find location')
        } else {
            const data = response.body
            const location = response.body.location.country + ', ' + response.body.location.region
            
            callback(undefined, {
                forecast: location + ', It currently ' + data.current.temperature + ' degrees out. It feels like ' + data.current.feelslike + ' degrees out.',
                location: location
            })
        }
    })
}

module.exports = forecast
const request = require('request')

const geoCode = (address, callback) => {
    let lat = 0
    let long = 0
    const geocodeToken = "pk.eyJ1IjoiZHJ0aGl0aSIsImEiOiJja3A1NzNubnYyNnM4MnVxd213Ync4b2xsIn0.Cbk3G0Tx_Re5q5M0vVz2-A"
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${geocodeToken}`

    request({ url: geocodeUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined)
        } 
        else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                place_name: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
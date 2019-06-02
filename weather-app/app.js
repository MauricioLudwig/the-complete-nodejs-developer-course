require('dotenv').config();
const request = require('request');

const { LOCATION_API_KEY, WEATHER_API_KEY } = process.env;

const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${LOCATION_API_KEY}&limit=1`;
const weatherUrl = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/37.8267,-122.4233?units=si`;

request({
    url: weatherUrl,
    json: true
}, (error, response) => {
    if (error) {
        console.log('Unable to connect to weather service');
    } else if (response.body.error) {
        console.log('Unable to find location');
    } else {
        const {
            currently: {
                temperature,
                precipProbability
            },
            daily: {
                data
            }
        } = response.body;
        console.log(`${data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability} chance of rain.`);
    }
});

request({
    url: locationUrl,
    json: true
}, (error, response) => {
    if (error) {
        console.log('Unable to connect to location services');
    } else if (response.body.message || response.body.features.length === 0) {
        console.log('Unable to find geo position');
    } else {
        const { center } = response.body.features[0];
        console.log(`lat: ${center[1]}, long: ${center[0]}`);
    }
});

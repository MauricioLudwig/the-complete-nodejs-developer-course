const request = require('request');

const { WEATHER_API_KEY } = process.env;

const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${latitude},${longitude}?units=si`;

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to retrieve weather', undefined);
        } else {
            const {
                currently: {
                    temperature,
                    precipProbability
                },
                daily: {
                    data
                }
            } = body;
            callback(undefined, `${data[0].summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`);
        }
    });

};

module.exports = forecast;

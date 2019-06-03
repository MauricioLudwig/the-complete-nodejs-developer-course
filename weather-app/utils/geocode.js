const request = require('request');

const { LOCATION_API_KEY } = process.env;

const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${LOCATION_API_KEY}&limit=1`;

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.message || body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            const { center, place_name } = body.features[0];
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            });
        }
    })
};

module.exports = geocode;

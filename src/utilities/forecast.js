const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2771ebbdde202d79556bb26203bb9b33&query=${longitude},${latitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect!', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                description: body.current.weather_descriptions[0],
            });
        }
    });
};

module.exports = forecast;

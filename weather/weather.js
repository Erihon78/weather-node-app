const request = require('request'),
	api = 'eed6a4b83dbf2f8d481c1f5d7dec7c4f';

const returnWeather = (lat, lng, callback) => {
	request({
		url: `https://api.darksky.net/forecast/${api}/${lat},${lng}`,
		json: true
	}, (error, responce, body) => {
		if (!error && responce.statusCode === 200) {
			const convertToCelsius = (temperature) => {
				return `${Math.round(((temperature - 32) * 5 / 9))} °C`;
			}

			callback(undefined, {
				temperature: convertToCelsius(body.currently.temperature),
				apparentTemperature: convertToCelsius(body.currently.apparentTemperature)
			});
		} else {
			callback('Unable to fetch the weather.');
		}
	});
}

module.exports = {
	returnWeather
}
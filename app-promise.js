const yargs = require('yargs'),
	axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Adress to get Longitude and Latitude',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

let address = encodeURIComponent(argv.address),
	apiGeocode = 'AIzaSyCDCRwGJ7_Q3RlknvGrYX8qHNotOXu4uug',
	urlGeo = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiGeocode}`;

axios.get(urlGeo).then((responce) => {
	if (responce.data.status === 'ZERO_RESULTS') {
		throw new Error('Unable to find that data.');
	}

	let apiWeather = 'eed6a4b83dbf2f8d481c1f5d7dec7c4f',
		lng = responce.data.results[0].geometry.location.lng,
		lat = responce.data.results[0].geometry.location.lat,
		urlWeather = `https://api.darksky.net/forecast/${apiWeather}/${lat},${lng}`;

	let address = responce.data.results[0].formatted_address;

	return axios.get(urlWeather, {
		params: {
			address
		}
	});
}).then((responce) => {	
	const convertToCelsius = (temperature) => {
		return `${Math.round(((temperature - 32) * 5 / 9))} °C`;
	};

	let weatherResults = responce.data.currently,
		address = responce.config.params.address;
	
	console.log(`In the ${address} weather is ${convertToCelsius(weatherResults.temperature)}, feels like ${convertToCelsius(weatherResults.apparentTemperature)};`);
}).catch((error) => {
	if (error.code === "ENOTFOUND") {
		console.log('Unable to connect to API servers.');
	} else {
		console.log(error.message);
	}
});
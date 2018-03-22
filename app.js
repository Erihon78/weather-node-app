const yargs = require('yargs'),
	geocode = require('./geocode/geocode.js'),
	weather = require('./weather/weather.js');

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

geocode.returnAddress(argv.address, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {		
		weather.returnWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
			if (errorMessage) {
				console.log(errorMessage);
			} else {
				console.log(`In the ${results.address} weather is ${weatherResults.temperature}, feels like ${weatherResults.apparentTemperature};`);
			}
		});
	}
});

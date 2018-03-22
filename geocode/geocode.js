const request = require('request'),
	apiNewsKey = 'AIzaSyCDCRwGJ7_Q3RlknvGrYX8qHNotOXu4uug';

const returnAddress = (address, callback) => {
	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiNewsKey}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('Unable to connect to Google servers');
		} else if (body.status === 'ZERO_RESULTS') {
			callback('Unable to find this address');
		} else if (body.results.length > 0) {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});			
		}
	});
}

module.exports = {
	returnAddress
};
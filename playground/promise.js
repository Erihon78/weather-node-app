const request = require('request'),
	apiNewsKey = 'AIzaSyCDCRwGJ7_Q3RlknvGrYX8qHNotOXu4uug';


var getGeo = (address) => {
	return new Promise((resolve, reject) => {
		request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiNewsKey}`,
		json: true
	}, (error, response, body) => {
		if (error) {
			reject('Unable to connect to Google servers');
		} else if (body.status === 'ZERO_RESULTS') {
			reject('Unable to find this address');
		} else if (body.results.length > 0) {
			resolve({
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});			
		}
	});
	});
};

getGeo('Москва').then(location => {
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
	console.log(errorMessage);
});
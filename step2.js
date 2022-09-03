const fs = require('fs');
const axios = require('axios');

function cat(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log('Error reading the following file------->', err);
			process.kill(0);
		}
		console.log(data);
		// return data;
	});
}
// cat(process.argv[2]);

async function webCat(url) {
	const google = await axios.get(url);
	console.log(google.data);
}

path = process.argv[2];

if (path.slice(0, 4) == 'http') {
	webCat(process.argv[2]);
} else {
	cat(process.argv[2]);
}

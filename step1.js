const fs = require('fs');

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
cat(process.argv[2]);

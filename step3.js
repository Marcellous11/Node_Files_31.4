const fs = require('fs');
const axios = require('axios');

console.log(process.argv);

function addContentTo(text, out) {
	if (out) {
		fs.writeFile(out, text, 'utf8', (err) => {
			if (err) {
				console.log(`Could not add ${out}: ${err}`);
				process.kill(1);
			}
			console.log('Content has been loaded!');
		});
	} else {
		console.log(text);
	}
}

function cat(path, out) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.log('Error reading the following file------->', err);
			process.kill(0);
		} else {
			addContentTo(data, out);
		}
	});
}
// cat(process.argv[2]);

async function webCat(url, content) {
	try {
		let data = await axios.get(url);
		addContentTo(data.data, out);
	} catch (err) {
		console.error(`Error fetching ${url}: ${err}`);
	}
}

let path;
let out;

if (process.argv[2] == '--out') {
	out = process.argv[3]; // print out data to

	path = process.argv[4]; //get data from
} else {
	path = process.argv[2]; // read file
}

if (path.slice(0, 4) == 'http') {
	webCat(path, out);
} else {
	cat(path, out);
}

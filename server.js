'use strict';

//boilerplate code for accepting POST requests
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const API_PORT = 8080;

const router = express.Router();
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Recieve our POST data and then send back a randomly chose "type"
router.post('/processPage', function(req, res) {
	const types = ['red', 'green', 'blue', 'orange'];
	res.json({
		type: types[Math.floor(Math.random() * types.length) + 1  ]
	});
});

//Recieve our POST data and send back 'some string value'ß
router.post('/messages', function(req, res) {
	res.json({
		message: 'some string value'
	});
});

//Set our endpoints to be under the 'api' directory
app.use('/api', router);

//serve our public data when requested
app.use(express.static('public/'))
//if path is unrecognizable, respond with index
app.get('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

//Run server, on port 8080
app.listen(API_PORT, () => console.log('LISTENING ON PORT ' + API_PORT));

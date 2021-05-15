const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const img_to_char = require('./src/evaluate_img').img_to_char
const speech_to_text = require('./src/speechtotext').speech_to_text

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.listen(3000, () => {
	console.log('App listening on port 3000')
})
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const img_to_char = require('./src/evaluate_img').img_to_char
const speech_to_text = require('./src/speechtotext').speech_to_text

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/img_to_char', async (req, res) => {
    try {
        const r = req.body;
        

    } catch (error) {
        
    }
})

app.post('/speech_to_text', async (req, res) => {
    try {
        const r = req.body;
        

    } catch (error) {
        
    }
})

app.post('/video_to_text', async (req, res) => {
    try {
        const r = req.body;
        

    } catch (error) {
        
    }
})


app.listen(3000, () => {
	console.log('App listening on port 3000')
})
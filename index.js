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
        var imgData = r.image;
        var base64Data = imgData.replace(/^data:image\/png;base64,/, "");

        fs.writeFile("out.png", base64Data, 'base64',
            function(err, data) {
                if (err) {
                    console.log('err', err);
                }
                console.log('success');

            });

        let c = await img_to_char("out.png");

        res.send({ char: c })


    } catch (error) {
        res.send({ char: ''})
    }
})

app.post('/speech_to_sl', async (req, res) => {
    try {
        const r = req.body;
        let text = await speech_to_text(r.mp3);

    } catch (error) {
        
    }
})


app.listen(3000, () => {
	console.log('App listening on port 3000')
})
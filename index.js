const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const img_to_char = require('./src/evaluate_img').img_to_char
const speech_to_text = require('./src/speechtotext').speech_to_text
const spawn = require("child_process").spawn;


const app = express();

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/img_to_char', async (req, res) => {
    try {
        console.log('recieved')
        const r = req.body;
        var imgData = r.image;
        var base64Data = imgData.replace(/^data:image\/png;base64,/, "");


        fs.writeFile("out.jpg", base64Data, 'base64', 
            function(err, data) {
                if (err) {
                    console.log('err', err);
                }
            });
        
        
        const pythonProcess = spawn('python', ["./Model Training/evaluate.py", 'out.jpg']);
             
        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
          });

        pythonProcess.stdout.on('data', (c) => {
            console.log(c.toString());
            res.send({ char: c.toString().charAt(0) });
            
        });


    } catch (error) {
        console.log(error)
        res.send({ char: ''})
    }
})

app.post('/speech_to_sl', async (req, res) => {
    try {
        console.log('received');
        const r = req.body;
        let text = await speech_to_text(r.mp3);

        res.send({text: text});

    } catch (error) {
        console.log(error);
        res.send({text: 'error'});
        
    }
})




app.listen(3000, () => {
	console.log('App listening on port 3000')
})


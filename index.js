const bodyParser = require('body-parser');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const DB_URI = require('./config').DB_URI;
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => {
        /*https.createServer({
            key: fs.readFileSync('server.key'),
            cert: fs.readFileSync('server.cert')
          }, app)
          .listen(3000, function() {
            console.log('App listening on port 3000')
          })*/
        app.listen(3000, () => {
            console.log('App listening on port 3000')
        })
    })
    .catch((err) => {
        console.log(err);
    });

app.use(cors())

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



app.post('/login', cors(corsOptions), async (req, res) => {
    try {
        
        
    } catch (error) {
    
    }
})

app.post('/register', cors(corsOptions), async (req, res) => {
    try {
        

    } catch (error) {
        
    }
})


module.exports = {

}
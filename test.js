const axios = require('axios');
const fs = require('fs');


fs.readFile('./test.mp3', 'base64', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    else {
        axios.post('http://localhost:3000/speech_to_sl', {
            image:  data
          })
          .then((response) => {
            console.log(response.data);
          }, (error) => {
            console.log(error);
          });
    }
    
  })



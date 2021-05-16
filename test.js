const axios = require('axios');
const fs = require('fs');


fs.readFile('./ctest.jpg', 'base64', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    else {
        axios.post('http://167.99.119.124:3000/img_to_char', {
            image:  data
          })
          .then((response) => {
            console.log(response.data);
          }, (error) => {
            console.log('a')
            //console.log(error);
          });
    }
    
  })



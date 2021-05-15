const axios = require('axios');

axios.post('/img_to_char', {
    firstName: 'Finn',
    lastName: 'Williams'
  })
  .then((response) => {
    console.log(response);
  }, (error) => {
    console.log(error);
  });
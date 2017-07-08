// Example usage for apiss
//Usage with node
var axios = require('axios')
axios.get('https://api.github.com/users/codeheaven-io');

//// Performing a GET request
axios.get('https://api.github.com/users/' + username)
  .then(function(response){
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
  });

// Performing a POST request
axios.post('/save', { firstName: 'Marlon', lastName: 'Bernardes' })
  .then(function(response){
    console.log('saved successfully')
  });

  // Requests will be executed in parallel...
axios.all([
    axios.get('https://api.github.com/users/codeheaven-io');
    axios.get('https://api.github.com/users/codeheaven-io/repos')
  ])
  .then(axios.spread(function (userResponse, reposResponse) {
    //... but this callback will be executed only when both requests are complete.
    console.log('User', userResponse.data);
    console.log('Repositories', reposResponse.data);
  }));

  var config = {
  headers: {'X-My-Custom-Header': 'Header-Value'}
};

axios.get('https://api.github.com/users/codeheaven-io', config);
axios.post('/save', { firstName: 'Marlon' }, config);

//Conneting to sotori:
// install it with node: install satori-rtm-sdk
var RTM = require('satori-rtm-sdk');

var endpoint = 'YOUR_ENDPOINT';
var appkey = 'YOUR_APPKEY';

var client = new RTM(endpoint, appkey);

client.on('enter-connected', function () {
  console.log('Connected to Satori RTM!');
});

client.on('error', function (error) {
  console.log('Failed to connect', error);
});

client.start();

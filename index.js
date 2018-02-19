const request = require('request');

const apikey = "RGAPI-a2b77bf9-8835-4b0b-8e75-0c5fa5be87f4";

var riotAPIRequest = {
    url: "",
    headers: {
      "X-Riot-Token": apikey
    }
  }

request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
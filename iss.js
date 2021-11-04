/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const fetchMyIP = function(callback) {
  let err;
  let IP;
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) err = error;

    else if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    } else
      IP = JSON.parse(body).ip;

    callback(err, IP);
  });


};
// fetchMyIP();

module.exports = { fetchMyIP };

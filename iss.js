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

const fetchCoordsByIP = (ip, callback) => {
  request('https://freegeoip.app/json/' + ip, (error, response, body) => {
    if (error) {
      callback(null, error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = {};
    data.latitude = JSON.parse(body).latitude;
    data.longitude = JSON.parse(body).longitude;
    callback(null, data);

  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  const location = coords;
  
  request(`https://iss-pass.herokuapp.com/json/?lat=${location.latitude}&lon=${location.longitude}`, (error, response, data) => {
    if (error) {
      callback(null, error);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    data = JSON.parse(data).response;
    callback(null, data);
 
  });
};




module.exports = { fetchMyIP, fetchCoordsByIP , fetchISSFlyOverTimes };

var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  //grab the token from the headers, we extract the token from the header
  //remove the Bearer term 
  const token = req.headers["authorization"].replace(/^Bearer\s/, "");
  //if there is no token
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    //if there is a token => verify it
    jwt.verify(token, supersecret, function (err, decoded) {
      if (err) res.status(401).send({ message: err.message });
      else {
        //everything is awesome
        //user_id will be added to the req object
        req.user_id = decoded.user_id;
        next(); // let the request to move on to the next step
      }
    });
  }
}
/* when the client asks server to get access to the profile page, cause it wants some info e.g.
Since it's sth that will be repeated, we create a function that can be reused  
It's a middleware function 

Bearer: .replace(/^Bearer\s/, ""): This is a regular expression that removes the string "Bearer " (with a space after it) 
from the beginning of the authorization header value. The "^Bearer\s" part of the regular expression matches the string "Bearer " at 
the start of the header value, and replace() is used to replace it with an empty string, effectively removing i

This is the nº 5 in the login process, the server receives the tokn from client and checks it */ 
module.exports = userShouldBeLoggedIn;
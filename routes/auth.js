var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken"); /* we use this library to create the token  */
var db = require("../model/helper");
require("dotenv").config(); /* to use the .env file we need the library dotenv  */
var bcrypt = require("bcrypt");  /* to hash the password we use a library called bcrypt */
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn") 
const saltRounds = 10;  /* 10 is a good number , not too big to be expensive and timeconsuming */

const supersecret = process.env.SUPER_SECRET;    /* after installing the dotenv library we can access using process the secret key   */

router.post("/register", async (req, res) => {       /* in the auth.js file we have some end-points for register, for loggin etc */
  //extract username and password from the req body
  const { username, password } = req.body;  /* i can test it in postman since it is backend,at 4000, so in the req.body we post the object with the info, and insert them in the DB. BUT it is not secure to add there the password , so we create a hashed version  */
console.log(req.body)
  try {
    //keep the hashed version of the password here
    const hash = await bcrypt.hash(password, saltRounds); /* in order to encrypt or hash it, we use a library called bcrypt. Salting is adding a unique value to the password before hashing it. Because of this unique salt , even two equal passowrds of two users will be different.
    the higher it is  the safer, but it takes more time to generate it, it's an expensive calculation. 10 is good. The process is IRREVERSIBLE. You CANNOT get the password from the hashed version    */
// we use the await cause it takes time to generate 

    await db(
      `INSERT INTO users (username, password) VALUES ("${username}", "${hash}")`  /* so I put the hash version in the database */
    );

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

/* endpoint router.post("/login", async (req, res) => { ... }) listens for POST requests sent to the /login route. */
router.post("/login", async (req, res) => {
  const { username, password } = req.body; /* extracting username and password from the request body */

  try {
    //find the user in the database based on the username
    const results = await db(
      `SELECT * FROM users WHERE username = "${username}"`  /* !!!!SELECT always returns an array  */
    );
    //store it in a variable
    const user = results.data[0];

    if (user) {
      const user_id = user.id;

      //check if the password is correct => compare the hashed version of the passwords
      // returns a boolean => if they are the same => true / else => false
      const correctPassword = await bcrypt.compare(password, user.password); /* the first is the password received from client. The second the one in database */

      //if the password is incorrect throw an Error (go to the catch black)
      if (!correctPassword) throw new Error("Incorrect password");  /*  when you throw an Error , it´s like the return. Nothing else happens after  */

      //if the password is correct, create a JWT
      var token = jwt.sign({ user_id }, supersecret);  /* I want to keep the user_id inside my token. The first part so is the info you wanna hide. 
      The second is the secret key. We added the supersecret in the .env file    */
      res.send({ message: "Login successful, here is your token", token }); /* the token is stored in the var token, and then we send it to the client   */
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

/* when the client asks server to get access to the profile page, cause it wants some info e.g.
Since it's sth that will be repeated, we create a function that can be reused  
It's a middleware function */ 
router.get("/profile",userShouldBeLoggedIn ,(req, res) => {
  res.send({
    message: "Here is the PROTECTED data for user " + req.user_id,
  });
}); 
 
/* so we'll be able to use the userShoulsdbeLoggedIn function again whenever we want inside any other api with any endpoint  */



// get all the users   ask Zoe!!!!!!!!!
/* router.get("/users", async function (req,res) {
  try {
    const result = await db("SELECT * FROM users");
    const users= result.data;
    res.send(users);
  }catch (err) {
    res.status(500)
.send({error:err.message });
  }
}) */

module.exports = router;





var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET users listing. */

/* This code sets up a basic route that responds with the text 'respond with a resource' when the root URL of the server is accessed via a GET request. */
router.get('/', function(req, res, next) {   /* router.get('/'): This sets up a route for handling HTTP GET requests to the root path '/' of the server.  
when a user navigates to the root URL of your server (e.g., http://example.com/), this route will be triggered.*/
  res.send('respond with a resource');  /* This line sends a response back to the client that made the request. */
});

// Add a bookarmk to the database   
router.post("/bookmarks", (req, res) => {
  const { name, country, temperature, description } = req.body;
  
  const query = `INSERT INTO bookmarks (name, country, temperature, description) VALUES (${name},${country},${temperature},${description})`;
  
  db.query(query, [name, country, temperature, description], (err, results) => {
    if (err) {
      console.error("Error adding bookmark to the database: ", err);
      res.status(500).json({ error: "Failed to add bookmark" });
    } else {
      console.log("Bookmark added to the database");
      res.status(200).json({ message: "Bookmark added successfully" });
    }
  });
}); 

// retrieve all bookmarks from the database
router.get("/bookmarks", (req, res) => {
   
  const query = `SELECT * FROM bookmarks`;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving bookmarks from the database: ", err);
      res.status(500).json({ error: "Failed to retrieve bookmarks" });
    } else {
      console.log("Bookmarks retrieved from the database");
      res.status(200).json(results);
    }
  });
});

// 
// /api/bookmarks
router.post("/", async(req, res) => {
  // add a bookmark to  the database
  let {name, country, temperature, description} = req.body;  /* req.body represents the body of an HTTP request. 
  if req.body has a property called name, the value of name will be set to the value of req.body.name */

  //Create SQL INSERT statement
  let sql = `INSERT INTO bookmarks (name, country, temperature, description)
             VALUES ('${name}', ${country}, ${temperature}, ${description})`;
    try{
      //do the query
      await db(sql);
      //Return the updated list of the books
      let result = await db("SELECT * FROM bookmarks");
      res.status(201).send(result.data);
    }
    catch(err){
      res.status(500).send(err);

    }

});
// router.delete("/weatherapp/:weatherapp_id", async (req, res) => {
  
//   let taskId = req.params.weatherapp_id;

//    try{
//     //Check if the task exists
//     let result = await db(`SELECT * FROM items WHERE id = ${`);
//     if(result.data.length === 1){
//       // task was found
//       let sql = `DELETE FROM items
//                 WHERE id = ${taskId}
//   `;
//       //DELETE task
//       await db(sql);
//       //Return updated list
//       result = await db(`SELECT * FROM items`);
//       res.status(200).send(result.data);

//     }
//     else {
//       res.status(404).send({error: 'task not found'})
//     }

//     } catch(e){
//         res.status(500).send(e);
//     }
// });

module.exports = router;

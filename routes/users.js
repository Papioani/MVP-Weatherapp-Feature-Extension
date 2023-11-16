var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Add a bookmk to the database
router.post("/weatherapp", (req, res) => {
  const { name, country, temperature, description } = req.body;
  
  const query = `INSERT INTO bookmarks (name, country, temperature, description) VALUES (?, ?, ?, ?)`;
  
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
router.get("/weatherapp", (req, res) => {
   
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

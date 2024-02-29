const cors = require('cors'); 


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* var indexRouter = require('./routes/index'); */
var bookmarksRouter = require('./routes/bookmarks');
var authRouter= require("./routes/auth");
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);  
app.use('/api/bookmarks', bookmarksRouter);  

//if you define a route inside authRouter.js (or any router file) and export that router instance, you can use it in other router files (such as bookmarksRouter.js) without causing conflicts.
// so I can use this => router.get('/', function(req, res, next) , in both routes files and the one will refer to /auth, while the other to /bookmarks
// /  equals /api which equals /routes =>  / = /api = /routes!!!!!!!!!!!!!!!!!!!!

module.exports = app;

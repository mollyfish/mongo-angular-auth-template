var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/auth_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

app.use(express.static(__dirname + '/build'));

var categoryRouter = require(__dirname + '/routes/categories_routes');
var usersRouter = require(__dirname + '/routes/users_routes');
app.use('/api', categoryRouter);
app.use('/api', usersRouter);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('server up on port: ' + port);
});

// MONGO DB NOTES

// IN THE TERMINAL, at the root of your project, make a directory called db
// this creates a fresh database for each app

// THEN run
// mongod --dbpath=./db --smallfiles

// IN MONGO
// > show dbs
// > use database_name
// switched to db database_name
// > db.workouts.find().pretty()
// returns all workout objects from the database
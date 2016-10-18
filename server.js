// ----------------------------------------------------------------------------------------------------------
// dependencies
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');



// -----------------------------------------------------------------------------------------------------------
// middleware 
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// -----------------------------------------------------------------------------------------------------------
// configuration to local mongodb
mongoose.connect('mongodb://localhost:27017/taskManager');

// mongodb schema and model setup
var taskSchema = mongoose.Schema({
  text: String,
  done: Boolean
});

var Task = mongoose.model('Task', taskSchema);



// -----------------------------------------------------------------------------------------------------------
// app routes

// get all tasks
app.get('/tasks', function(req, res) {
  console.log('get request submitted');

  // get all tasks from db and return them
  Task.find(function(err, tasks) {
    if(err) {
      res.send(err);
    }
    res.json(tasks);
  });
});


// add a task
app.post('/tasks', function(req, res) {
  console.log('post request submitted');
  console.log(req.body);

  // add a task to the db
  Task.create({text: req.body.text, done: false}, function(err, tasks) {
    if(err) {
      res.send(err);
    }

    // after creating get all tasks from db and return them
    Task.find(function(err, tasks) {
      if(err) {
        res.send(err);
      }
      res.json(tasks);
    });

  });

});


// removing tasks
app.delete('/tasks/:task_id', function(req, res) {
  console.log('delete request submitted');
  // console.log(req.body);
  // console.log(req.params);

  // remove task from db
  Task.remove({_id: req.params.task_id}, function(err, tasks) {
    if(err) {
      res.send(err);
    }
  });
  // after task removed query db and display all tasks
  Task.find(function(err, tasks) {
    if(err) {
      res.send(err);
    }
    res.json(tasks);
  });  
});


// frontend route: serve files in public folder on initial page load
app.get('/', function(req, res) {
  res.sendFile('./Public/index.html');
});



// -----------------------------------------------------------------------------------------------------------
// server
app.listen(8030, function() {
  console.log('app listening on port 8030');
});



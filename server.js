// dependencies ================================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');




// =============================================================================
// middleware 




// =============================================================================
// configuration to local mongodb
mongoose.connect('mongodb://localhost: 27017/taskManager');




// =============================================================================
// app routes




// =============================================================================
// server
app.listen(8080, function() {
  console.log('app listening on port 8080');
});
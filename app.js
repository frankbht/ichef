var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/user');

var port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://root:118@ds121622.mlab.com:21622/ichef');

app.use('/', routes);
app.use('/users', users);

app.listen(port);

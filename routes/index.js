var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var auth = require('../modules/token');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'iChef' });
});

router.post('/login', function(req, res, next) {
	User.findOne({username : req.body.username}, function(err, user) {
		if (err) throw err;

		if(!user) {
			 return res.send('cant find the user');
		}

		if(req.body.password!=req.body.username) {
			return res.send('wrong password');
		}
		//req.session.user = user;
		var token = auth.generateToken(user);
		res.status(200).json({
			message: 'Successfully logged in',
			token: token,
			userId: user._id
		});
	});
});

module.exports = router;

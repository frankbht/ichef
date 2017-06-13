var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var auth = require('../modules/token');

// print all user
router.get('/', function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, 'secret', function(err, decoded) {
        if (err) throw err;
        if(!decoded) {
            return res.status(403).send({
                success: false,
                message: 'no token!'
            });            
        }

        User.find(function(err, users) {
            if (err) return next(err);
            res.send(users);
        });
    });
});

// create new user
router.post('/', function(req, res, next) {
    User.create(req.body, function(err, user) {
        if (err) return next(err);
        res.send(user);
    });
});

// search existing user
router.get('/:email', function(req, res, next) {
    User.find({ email: req.params.email }, function(err, user) {
        if (err) throw err;

        res.send(user);
    });
});

// delete user
router.delete('/:username', function(req, res, next) {
	User.remove({ username: req.params.username }, function(err, user) {
		if (err) throw err;

		res.send('user '+req.params.username+' removed!');
	});
});

//update user info
router.put('/', function(req, res, next) {
	User.findOne({ username: req.body.username }, function(err, user) {
		if (err) throw err;
        if (!user) {
            return res.send('wrong username!');
        }
		user.password = req.body.password;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.address.street1 = req.body.street1;
        user.address.street2 = req.body.street2;
        user.address.city = req.body.body;
        user.address.state = req.body.state;
        user.address.zipcode = req.body.zipcode;
        user.save(function (err) {
            if (err) throw err;

            res.send(user);
        });
	});
});

module.exports = router;

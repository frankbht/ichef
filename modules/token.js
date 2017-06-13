var jwt = require('jsonwebtoken');

exports.generateToken = function(user) {
	var token = jwt.sign({user: 'login'}, 'secret', {expiresIn: 30*60});
	return token;
}

exports.checkToken = function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) throw err;
            console.log(decoded);
            req.api_user = decoded;
            console.log('res='+req.api_user);
        });
    }
    next();
    
}
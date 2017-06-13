var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    admin: {type: Boolean, default: false},
    firstName: String,
    lastName: String,
    password: {type: String, required: true},
    address: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        zipcode: Number
    }    
});

module.exports = mongoose.model('User', schema);

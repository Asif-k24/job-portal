const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
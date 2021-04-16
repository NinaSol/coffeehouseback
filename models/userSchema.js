const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    time: Date, //registro
    email: String,
    name: String,
    password: String,
    admin: Boolean
});
module.exports = model('users', userSchema);
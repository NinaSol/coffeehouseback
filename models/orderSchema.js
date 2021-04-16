const {Schema,model} = require('mongoose');

const orderSchema = new Schema({
    name: String,
    number: Number,
    email: String,
    items:Array
});
module.exports = model('orders', orderSchema);
/*
    table: Number,
    price: Number,
    order: String,
    time: Date,
    email: String,
    name: String
*/
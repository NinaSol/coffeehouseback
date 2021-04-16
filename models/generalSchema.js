const {Schema,model} = require('mongoose');

const generalSchema = new Schema({
    name: String,
    ingredients: String,
    price: Number,
    quantity: Number,
    img: String
});
module.exports = model('all', generalSchema);

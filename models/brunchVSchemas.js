const {Schema,model} = require('mongoose');

const brunchVSchema = new Schema({
    name: String,
    ingredients: String,
    price: Number,
    quantity: Number,
    img: String
});
module.exports = model('veggie brunches', brunchVSchema);

const {Schema,model} = require('mongoose');

const brunchSchema = new Schema({
    name: String,
    ingredients: String,
    price: Number,
    offer: Number,
    quantity: Number,
    img: String
});
module.exports = model('Brunches', brunchSchema);

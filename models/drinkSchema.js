const {Schema,model} = require('mongoose');

const drinkSchema = new Schema({
    name: String,
    ingredients: String,
    price: Number,
    offer:Number,
    ml: Number,
    img: String
});
module.exports = model('Drinks', drinkSchema);

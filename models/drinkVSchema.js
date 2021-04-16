const {Schema,model} = require('mongoose');

const drinkVSchema = new Schema({
    name: String,
    ingredients: String,
    price: Number,
    ml: Number,
    img: String
});
module.exports = model('veggie drinks', drinkVSchema);

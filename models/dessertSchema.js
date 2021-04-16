const {Schema,model} = require('mongoose');

const dessertSchema = new Schema({
    name: String,
    ingredients: String,
    price: Number,
    offer:Number,
    portion: Number,
    img: String
});
module.exports = model('Desserts', dessertSchema);

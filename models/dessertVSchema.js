const {Schema,model} = require('mongoose');

const dessertVSchema = new Schema({
    name: String,
    ingredients: String,
    price: Number,
    portion: Number,
    img: String
});
module.exports = model('veggie desserts', dessertVSchema);

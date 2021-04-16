const mongoose = require('mongoose');
const Drink = require('../models/drinkSchema');
const Dessert = require('../models/dessertSchema');
const Brunch = require('../models/brunchSchema');
const DrinkV = require('../models/drinkVSchema');
const DessertV = require('../models/dessertVSchema');
const BrunchV = require('../models/brunchVSchemas');
 


module.exports = {
    async getAll(req,res){
        const drinks = await Drink.find();
        const drinksV = await DrinkV.find();
        const brunches = await Brunch.find();
        const brunchesV = await BrunchV.find();
        const desserts = await Dessert.find();
        const dessertsV = await DessertV.find();

        if(drinks || drinksV || brunches || brunchesV || desserts || dessertsV){
             return res.status(200).json({
                 drinks: drinks? drinks : "error/empty", 
                 drinksV: drinksV? drinksV : "error/empty", 
                 brunches: brunches? brunches : "error/empty", 
                 brunchesV: brunchesV? brunchesV : "error/empty", 
                 desserts: desserts? desserts : "error/empty", 
                 dessertsV: dessertsV? dessertsV : "error/empty" 
                });
        }
         return res.status(404).json({error: "Not found"});
    }
}
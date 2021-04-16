//traigo mi modelo de esquema drink
//con este modelo podemos hacer los request necesarios que tengan que ver con esta entidad a la BBDD
const DrinkV = require('../models/drinkVSchema');


//aca adentro declaramos las funciones asi ya se exportan
module.exports = {
    //nos devuelve una bebida, en caso d eno encontrarla devuelve 404
    async getDrinkV(req,res){
        //const {params:{_id}} = req;
        //const drink = await DrinkV.findOne({_id: _id});
        const drinkV = await DrinkV.find();
        if(drinkV) return res.status(200).json({drinkV});
        else return res.status(404).json({error: "Not found"});
    },
    //agregamos bebidas si se pasa un nombre,ingredientes,precio,cantidad e img en el body del request
    async postDrinkV(req,res){
        const {name,ingredients,price,ml,img} = req.body;
        if(name && ingredients && price && ml && img){
            const checkDrinkV = await DrinkV.findOne({name});
            if(!checkDrinkV){
                const newDrinkV = new DrinkV(req.body);
                newDrinkV.save(newDrinkV);
                return res.status(201).json({drink: req.body});
            }else{
                return res.status(400).json({error: "Bebida ya existente"});
            }
        }else{
            return res.status(400).json({error: "Not enough properties"});
        }
    },
    //actualizamos los datos de bebidas pasandole el nombre,ingredientes,precio e img
    async putDrinkV(req,res){
        const {nameoringredients} = req.params;
        const {name,ingredients,price,ml,img} = req.body;
        const update = {};
        if(name) update.name = name;
        if(ingredients) update.ingredients = ingredients;
        if(price) update.price = price;
        if(ml) update.ml = ml;
        if(img) update.img = img;

        const updateDrinkV = await DrinkV.updateOne({
            $or: [
                {"name": nameoringredients},
                {"ingridients": nameoringredients}
            ]
        }, update );
        if(updateDrinkV.n){//n == numero de documentos modificados
            return res.status(200).json({ok: true})
        }else{
            return res.status(404).json({error: "DrinkV not found"});
        } 
    },
    async deleteDrinkV(req,res){
        const idDrinkV = req.params.id;
        console.log(idDrinkV);
        if(!idDrinkV) return res.status(400).json({error: "Not enough parameters"});
        //const drink = await DrinkV.findOne({_id: idDrinkV});
        //console.log(typeof(drink));
        //const {name} = req.query;
        DrinkV.findByIdAndDelete(idDrinkV, (err) => {
            //aunque no haya un documento que borrar nunca trae errores
            //esta query siempre devielve status 200 como si hubiese borrado
            if(err){
                console.log(err);
                return res.status(400).json({error: "DrinkV not found"});
            }else{
                return res.status(200).json({ok: true});
            }
        });
    }
}
//todos los controladores los hacemos con async debido a que esto nos permite usar la instruccion
//"await", la instruccion "await", va a hacer que cuando tengamos una promesa espere a que se
//resuelva antes de seguir ejecutando la siguiente linea


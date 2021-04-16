//traigo mi modelo de esquema drink
//con este modelo podemos hacer los request necesarios que tengan que ver con esta entidad a la BBDD
const Drink = require('../models/drinkSchema');


//aca adentro declaramos las funciones asi ya se exportan
module.exports = {
    //nos devuelve una bebida, en caso d eno encontrarla devuelve 404
    async getDrink(req,res){
        //const {params:{_id}} = req;
        //const drink = await Drink.findOne({_id: _id});
        const drink = await Drink.find();
        if(drink) return res.status(200).json({drink});
        else return res.status(404).json({error: "Not found"});
    },
    //agregamos bebidas si se pasa un nombre,ingredientes,precio,cantidad e img en el body del request
    async postDrink(req,res){
        const {name,ingredients,price,offer,ml,img} = req.body;
        if(name && ingredients && price && offer && ml && img){
            const checkDrink = await Drink.findOne({name});
            if(!checkDrink){
                const newDrink = new Drink(req.body);
                newDrink.save(newDrink);
                return res.status(201).json({drink: req.body});
            }else{
                return res.status(400).json({error: "Bebida ya existente"});
            }
        }else{
            return res.status(400).json({error: "Not enough properties"});
        }
    },
    //actualizamos los datos de bebidas pasandole el nombre,ingredientes,precio e img
    async putDrink(req,res){
        const {id} = req.params;
        const {name,ingredients,price,offer,ml,img} = req.body;
        const update = {};
        if(name) update.name = name;
        if(ingredients) update.ingredients = ingredients;
        if(price) update.price = price;
        if(offer) update.offer = offer;
        if(ml) update.ml = ml;
        if(img) update.img = img;

        const updateDrink = await Drink.updateOne(
           
                {"_id": id}
          
        
        , update );
        if(updateDrink.n){//n == numero de documentos modificados
            return res.status(200).json({ok: true})
        }else{
            return res.status(404).json({error: "Drink not found"});
        } 
    },
    async deleteDrink(req,res){
        const idDrink = req.params.id;
        console.log(idDrink);
        if(!idDrink) return res.status(400).json({error: "Not enough parameters"});
        //const drink = await Drink.findOne({_id: idDrink});
        //console.log(typeof(drink));
        //const {name} = req.query;
        Drink.findByIdAndDelete(idDrink, (err) => {
            //aunque no haya un documento que borrar nunca trae errores
            //esta query siempre devielve status 200 como si hubiese borrado
            if(err){
                console.log(err);
                return res.status(400).json({error: "Drink not found"});
            }else{
                return res.status(200).json({ok: true});
            }
        });
    }
}
//todos los controladores los hacemos con async debido a que esto nos permite usar la instruccion
//"await", la instruccion "await", va a hacer que cuando tengamos una promesa espere a que se
//resuelva antes de seguir ejecutando la siguiente linea


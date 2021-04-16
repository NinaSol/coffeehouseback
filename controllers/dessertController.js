//traigo mi modelo de esquema brunch
//con este modelo podemos hacer los request necesarios que tengan que ver con esta entidad a la BBDD
const Dessert = require('../models/dessertSchema');


//aca adentro declaramos las funciones asi ya se exportan
module.exports = {
    //nos devuelve una bebida, en caso d eno encontrarla devuelve 404
    async getDessert(req,res){
        const dessert = await Dessert.find();
        if(dessert) return res.status(200).json({dessert});
        else return res.status(404).json({error: "Not found"});
    },
    //agregamos bebidas si se pasa un nombre,ingredientes,precio,cantidad e img en el body del request
    async postDessert(req,res){
        const {name,ingredients,price,offer,portion,img} = req.body;
        if(name && ingredients && price && offer && portion && img){
            const checkDessert= await Dessert.findOne({name});
            if(!checkDessert){
                const newDessert = new Dessert(req.body);
                newDessert.save(newDessert);
                return res.status(201).json({dessert: req.body});
            }else{
                return res.status(400).json({error: "Postre ya existente"});
            }
        }else{
            return res.status(400).json({error: "Not enough properties"});
        }
    },
    //actualizamos los datos de bebidas pasandole el nombre,ingredientes,precio e img
    async putDessert(req,res){
        const {id} = req.params;
        const {name,ingredients,price,offer,portion,img} = req.body;
        const update = {};
        if(name) update.name = name;
        if(ingredients) update.ingredients = ingredients;
        if(price) update.price = price;
        if(offer) update.offer = offer;
        if(portion) update.portion = portion;
        if(img) update.img = img;

        const updateDessert = await Dessert.updateOne(
                {"_id": id}
     , update );
        if(updateDessert.n){//n == numero de documentos modificados
            return res.status(200).json({ok: true})
        }else{
            return res.status(404).json({error: "Dessert not found"});
        } 
    },
    async deleteDessert(req,res){
        const idDessert = req.params.id;
        console.log(idDessert);
        if(!idDessert) return res.status(400).json({error: "Not enough parameters"});
        Dessert.findByIdAndDelete(idDessert, (err) => {
            //aunque no haya un documento que borrar nunca trae errores
            //esta query siempre devielve status 200 como si hubiese borrado
            if(err){
                console.log(err);
                return res.status(400).json({error: "Dessert not found"});
            }else{
                return res.status(200).json({ok: true});
            }
        });
    }
}
//todos los controladores los hacemos con async debido a que esto nos permite usar la instruccion
//"await", la instruccion "await", va a hacer que cuando tengamos una promesa espere a que se
//resuelva antes de seguir ejecutando la siguiente linea


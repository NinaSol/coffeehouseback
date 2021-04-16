//traigo mi modelo de esquema brunch
//con este modelo podemos hacer los request necesarios que tengan que ver con esta entidad a la BBDD
const Brunch = require('../models/brunchSchema');


//aca adentro declaramos las funciones asi ya se exportan
module.exports = {
    //nos devuelve una bebida, en caso d eno encontrarla devuelve 404
    async getBrunch(req,res){
        //const {params:{_id}} = req;
        //const brunch = await Brunch.findOne({_id: _id});
        const brunch = await Brunch.find();
        if(brunch) return res.status(200).json({brunch});
        else return res.status(404).json({error: "Not found"});
    },
    //agregamos bebidas si se pasa un nombre,ingredientes,precio,cantidad e img en el body del request
    async postBrunch(req,res){
        const {name,ingredients,price,offer,quantity,img} = req.body;
        if(name && ingredients && price && offer && quantity && img){
            const checkBrunch= await Brunch.findOne({name});
            if(!checkBrunch){
                const newBrunch = new Brunch(req.body);
                newBrunch.save(newBrunch);
                return res.status(201).json({brunch: req.body});
            }else{
                return res.status(400).json({error: "Bebida ya existente"});
            }
        }else{
            return res.status(400).json({error: "Not enough properties"});
        }
    },
    //actualizamos los datos de bebidas pasandole el nombre,ingredientes,precio e img
    async putBrunch(req,res){
        const {id} = req.params;
        const {name,ingredients,price,offer,quantity,img} = req.body;
        const update = {};
        if(name) update.name = name;
        if(ingredients) update.ingredients = ingredients;
        if(price) update.price = price;
        if(offer) update.offer = offer;
        if(quantity) update.quantity = quantity;
        if(img) update.img = img;

        const updateBrunch = await Brunch.updateOne(
                {"_id": id}
            , update );
        if(updateBrunch.n){//n == numero de documentos modificados
            return res.status(200).json({ok: true})
        }else{
            return res.status(404).json({error: "Brunch not found"});
        } 
    },
    async deleteBrunch(req,res){
        const idBrunch = req.params.id;
        console.log(idBrunch);
        if(!idBrunch) return res.status(400).json({error: "Not enough parameters"});
        Brunch.findByIdAndDelete(idBrunch, (err) => {
            //aunque no haya un documento que borrar nunca trae errores
            //esta query siempre devielve status 200 como si hubiese borrado
            if(err){
                console.log(err);
                return res.status(400).json({error: "Brunch not found"});
            }else{
                return res.status(200).json({ok: true});
            }
        });
    }
    
}
//todos los controladores los hacemos con async debido a que esto nos permite usar la instruccion
//"await", la instruccion "await", va a hacer que cuando tengamos una promesa espere a que se
//resuelva antes de seguir ejecutando la siguiente linea


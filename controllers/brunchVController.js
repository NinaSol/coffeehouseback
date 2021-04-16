//traigo mi modelo de esquema brunch
//con este modelo podemos hacer los request necesarios que tengan que ver con esta entidad a la BBDD
const BrunchV = require('../models/brunchVSchemas');


//aca adentro declaramos las funciones asi ya se exportan
module.exports = {
    //nos devuelve una bebida, en caso d eno encontrarla devuelve 404
    async getBrunchV(req,res){
        //const {params:{_id}} = req;
        //const brunch = await BrunchV.findOne({_id: _id});
        const brunchV = await BrunchV.find();
        if(brunchV) return res.status(200).json({brunchV});
        else return res.status(404).json({error: "Not found"});
    },
    //agregamos bebidas si se pasa un nombre,ingredientes,precio,cantidad e img en el body del request
    async postBrunchV(req,res){
        const {name,ingredients,price,quantity,img} = req.body;
        if(name && ingredients && price && quantity && img){
            const checkBrunchV= await BrunchV.findOne({name});
            if(!checkBrunchV){
                const newBrunchV = new BrunchV(req.body);
                newBrunchV.save(newBrunchV);
                return res.status(201).json({brunch: req.body});
            }else{
                return res.status(400).json({error: "Bebida ya existente"});
            }
        }else{
            return res.status(400).json({error: "Not enough properties"});
        }
    },
    //actualizamos los datos de bebidas pasandole el nombre,ingredientes,precio e img
    async putBrunchV(req,res){
        const {nameoringredients} = req.params;
        const {name,ingredients,price,quantity,img} = req.body;
        const update = {};
        if(name) update.name = name;
        if(ingredients) update.ingredients = ingredients;
        if(price) update.price = price;
        if(quantity) update.quantity = quantity;
        if(img) update.img = img;

        const updateBrunchV = await BrunchV.updateOne({
            $or: [
                {"name": nameoringredients},
                {"ingridients": nameoringredients}
            ]
        }, update );
        if(updateBrunchV.n){//n == numero de documentos modificados
            return res.status(200).json({ok: true})
        }else{
            return res.status(404).json({error: "BrunchV not found"});
        } 
    },
    async deleteBrunchV(req,res){
        const idBrunchV = req.params.id;
        console.log(idBrunchV);
        if(!idBrunchV) return res.status(400).json({error: "Not enough parameters"});
        BrunchV.findByIdAndDelete(idBrunchV, (err) => {
            //aunque no haya un documento que borrar nunca trae errores
            //esta query siempre devielve status 200 como si hubiese borrado
            if(err){
                console.log(err);
                return res.status(400).json({error: "BrunchV not found"});
            }else{
                return res.status(200).json({ok: true});
            }
        });
    }
}
//todos los controladores los hacemos con async debido a que esto nos permite usar la instruccion
//"await", la instruccion "await", va a hacer que cuando tengamos una promesa espere a que se
//resuelva antes de seguir ejecutando la siguiente linea


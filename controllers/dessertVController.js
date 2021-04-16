//traigo mi modelo de esquema brunch
//con este modelo podemos hacer los request necesarios que tengan que ver con esta entidad a la BBDD
const Dessertv = require('../models/dessertVSchema');


//aca adentro declaramos las funciones asi ya se exportan
module.exports = {
    //nos devuelve una bebida, en caso d eno encontrarla devuelve 404
    async getDessertV(req,res){
        const dessertv = await Dessertv.find();
        if(dessertv) return res.status(200).json({dessertv});
        else return res.status(404).json({error: "Not found"});
    },
    //agregamos bebidas si se pasa un nombre,ingredientes,precio,cantidad e img en el body del request
    async postDessertV(req,res){
        const {name,ingredients,price,portion,img} = req.body;
        if(name && ingredients && price && portion && img){
            const checkDessertv= await Dessertv.findOne({name});
            if(!checkDessertv){
                const newDessertv = new Dessertv(req.body);
                newDessertv.save(newDessertv);
                return res.status(201).json({dessert: req.body});
            }else{
                return res.status(400).json({error: "Postre ya existente"});
            }
        }else{
            return res.status(400).json({error: "Not enough properties"});
        }
    },
    //actualizamos los datos de bebidas pasandole el nombre,ingredientes,precio e img
    async putDessertV(req,res){
        const {nameoringredients} = req.params;
        const {name,ingredients,price,portion,img} = req.body;
        const update = {};
        if(name) update.name = name;
        if(ingredients) update.ingredients = ingredients;
        if(price) update.price = price;
        if(portion) update.portion = portion;
        if(img) update.img = img;

        const updateDessertv = await Dessertv.updateOne({
            $or: [
                {"name": nameoringredients},
                {"ingridients": nameoringredients}
            ]
        }, update );
        if(updateDessertv.n){//n == numero de documentos modificados
            return res.status(200).json({ok: true})
        }else{
            return res.status(404).json({error: "Dessertv not found"});
        } 
    },
    async deleteDessertV(req,res){
        const idDessertv = req.params.id;
        console.log(idDessertv);
        if(!idDessertv) return res.status(400).json({error: "Not enough parameters"});
        Dessertv.findByIdAndDelete(idDessertv, (err) => {
            //aunque no haya un documento que borrar nunca trae errores
            //esta query siempre devielve status 200 como si hubiese borrado
            if(err){
                console.log(err);
                return res.status(400).json({error: "Dessertv not found"});
            }else{
                return res.status(200).json({ok: true});
            }
        });
    }
}
//todos los controladores los hacemos con async debido a que esto nos permite usar la instruccion
//"await", la instruccion "await", va a hacer que cuando tengamos una promesa espere a que se
//resuelva antes de seguir ejecutando la siguiente linea


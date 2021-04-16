//traigo mi modelo de esquema brunch
//con este modelo podemos hacer los request necesarios que tengan que ver con esta entidad a la BBDD
const { json } = require('express');
const Order = require('../models/orderSchema');

//aca adentro declaramos las funciones asi ya se exportan
module.exports = {
    async getOrder(req,res){
        console.log("a");
        const order = await Order.find();
        if(order) return res.status(200).json({order});
        else return res.status(404).json({error: "Not found"});
    },
    async postOrder(req,res){
        console.log("hola");
        const {name,number,email,items} = req.body;
        if(name && number && email && items){
                const neworder = new Order(req.body);
               await neworder.save(neworder);
                return res.status(201).json(neworder);
        }else{
            return res.status(400).json({error: "Not enough properties"});
        }

    },
    //actualizamos los datos de bebidas pasandole el nombre,ingredientes,precio e img
    async putOrder(req,res){
        const {id} = req.params;
        const {name,ingredients,price,quantity,img} = req.body;
        const update = {};
        if(name) update.name = name;
        if(ingredients) update.ingredients = ingredients;
        if(price) update.price = price;
        if(quantity) update.quantity = quantity;
        if(img) update.img = img;

        const updateorder = await order.updateOne(
                {"_id": id}
            , update );
        if(updateorder.n){//n == numero de documentos modificados
            return res.status(200).json({ok: true})
        }else{
            return res.status(404).json({error: "order not found"});
        } 
    },
    async deleteOrder(req,res){
        const idorder = req.params.id;
        console.log(idorder);
        if(!idorder) return res.status(400).json({error: "Not enough parameters"});
        order.findByIdAndDelete(idorder, (err) => {
            //aunque no haya un documento que borrar nunca trae errores
            //esta query siempre devielve status 200 como si hubiese borrado
            if(err){
                console.log(err);
                return res.status(400).json({error: "order not found"});
            }else{
                return res.status(200).json({ok: true});
            }
        });
    }
    
}
//todos los controladores los hacemos con async debido a que esto nos permite usar la instruccion
//"await", la instruccion "await", va a hacer que cuando tengamos una promesa espere a que se
//resuelva antes de seguir ejecutando la siguiente linea


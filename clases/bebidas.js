const { Router } = require('express')
const router = Router();


class Bebidas {
    constructor(nombre, ingredientes, precio, ml, img) {
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.precio = precio;
        this.ml = ml;
        this.img = img;
    }
    set setNombre(nom) {
        nom = this.nombre;
    }
    get getNombre() {
        return this.nombre;
    }
    set setIngredientes(ing) {
        ing = this.ingredientes;
    }
    get getIngredientes() {
        return this.ingredientes;
    }
    set setPrecio(pr) {
        pr = this.precio;
    }
    get getPrecio() {
        return this.precio;
    }
    set setMl(ml) {
        ml = this.ml;
    }
    get getMl() {
        return this.ml;
    }
    set setImg(img) {
        img = this.img;
    }
    get getImg() {
        return this.img;
    }
    toString() {
        return this.getNombre + '<br>' + this.getMl + ' ' + this.getPrecio;
    }
 
 
}

class BebidasVeggie extends Bebidas {
    constructor(nombre, ingredientes, precio, ml,img) {
        super(nombre, ingredientes, precio, ml,img)
    }

}
class BebidasDairy extends Bebidas {
    constructor(nombre, ingredientes, precio, ml,img) {
        super(nombre, ingredientes, precio, ml,img)
    }
}

//BEBIDAS
 const caramel = new BebidasDairy('Caramel brulee', '(Lorem ipsum dolor sit)', '$200', '250ml',"https://globalassets.starbucks.com/assets/3dacf63a42ac40b4b6f6ed32f8422d0a.jpg?impolicy=1by1_wide_1242");
 const frappe = new BebidasDairy('Frappuccino frio', '(Lorem ipsum dolor sit)', '$230', '350ml',"https://globalassets.starbucks.com/assets/2cf55066b3ec4547b452aebffe0870cf.jpg?impolicy=1by1_wide_1242");
 const latte = new BebidasVeggie('Chai latte veggie', '(Lorem ipsum dolor sit)', '$350', '250ml',"https://globalassets.starbucks.com/assets/2d52f16a22fb40ff898be1815ecc952e.jpg?impolicy=1by1_wide_1242");
 const te = new BebidasVeggie('Te de naranja y mango veggie', '(Lorem ipsum dolor sit)', '$280', '150ml',"https://globalassets.starbucks.com/assets/0f3e19ad457f4b9f9fb5afde29d0c7cf.jpg?impolicy=1by1_wide_1242");
 let bebidas = [caramel, frappe, latte, te];


router.get('/bebidas', (req, res) => {
    res.send({bebidas});
});

module.exports={
    Bebidas:Bebidas,
    BebidasDairy:BebidasDairy,
    BebidasVeggie:BebidasVeggie,
    bebidas

}
module.exports=router;

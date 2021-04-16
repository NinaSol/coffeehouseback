const { Router } = require('express')
const router = Router();

class Dulces{
    constructor(nombre,ingredientes,precio,unidad,img){
        this.nombre=nombre;
        this.ingredientes=ingredientes;
        this.precio=precio;
        this.unidad=unidad;
        this.img=img;
    }
    set setNombre(nom){
        nom=this.nombre;
    }
    get getNombre(){
        return this.nombre;
    }
    set setIngredientes(ing){
        ing=this.ingredientes;
    }
    get getIngredientes(){
        return this.ingredientes;
    }
    set setPrecio(pr){
        pr=this.precio;
    }
    get getPrecio(){
        return this.precio;
    }
    set setUnidad(un){
        un=this.unidad;
    }
    get getUnidad(){
        return this.unidad;
    }
    set setImg(img){
        img=this.img;
    }
    get getImg(){
        return this.img;
    }
    toString(){
        return this.getNombre+'<br>'+this.getUnidad+' '+this.getPrecio;
    }

}

class DulcesVeggies extends Dulces{
    constructor(nombre,ingredientes,precio,unidad,img){
    super(nombre,ingredientes,precio,unidad,img)
    }
}
class DulcesDairy extends Dulces{
    constructor(nombre,ingredientes,precio,unidad,img){
        super(nombre,ingredientes,precio,unidad,img)
        }
}

//DULCES
const medialuna = new DulcesVeggies('Medialuna de chocolate veggie','(Lorem ipsum dolor sit)','$200',"1 unidad","https://globalassets.starbucks.com/assets/11a5dc6219434a4cbf81b195c14a393e.jpg?impolicy=1by1_wide_1242");
const budin = new DulcesVeggies('Budin de limon veggie','(Lorem ipsum dolor sit)','$200',"1 unidad","https://globalassets.starbucks.com/assets/c636153c255049a487da5db5b9d5f631.jpg?impolicy=1by1_wide_1242");
const muffin = new DulcesDairy('Muffin de arandanos','(Lorem ipsum dolor sit)','$200',"1 unidad","https://globalassets.starbucks.com/assets/7d4665b4af2541e387336966c6e3f1fb.jpg?impolicy=1by1_wide_1242");
const torta = new DulcesDairy('Torta de canela y cafe','(Lorem ipsum dolor sit)','$200',"1 unidad","https://globalassets.starbucks.com/assets/f245bb86e2b74e42b8e6888f886930ef.jpg?impolicy=1by1_wide_1242");
let dulces=[medialuna,budin,muffin,torta];

router.get('/dulces', (req,res) => { //cuando recibe el metodo get a la ruta /dulces 
    res.send({dulces}) //envia array de objetos dulces 
 })
 

module.exports={
    Dulces:Dulces,
    DulcesVeggies:DulcesVeggies,
    DulcesDairy:DulcesDairy,
    dulces
}
module.exports=router;
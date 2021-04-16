const {Router}=require('express');
const router= Router();
class Salados{
    constructor(nombre,ingredientes,precio,porcion,img){
        this.nombre=nombre;
        this.ingredientes=ingredientes;
        this.precio=precio;
        this.porcion=porcion;
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
    set setPorcion(un){
        un=this.porcion;
    }
    get getPorcion(){
        return this.porcion;
    }
    set setImg(img){
        img=this.img;
    }
    get getImg(){
        return this.img;
    }

    toString(){
        return this.getNombre+'<br>'+this.getPorcion+' '+this.getPrecio;
    }
 
}
class SaladosVeggies extends Salados{
constructor(nombre,ingredientes,precio,porcion,img){
    super(nombre,ingredientes,precio,porcion,img);
}
}
class SaladosDairy extends Salados{
    constructor(nombre,ingredientes,precio,porcion,img){
        super(nombre,ingredientes,precio,porcion,img);
    }
}

//SALADOS
const jamon = new SaladosDairy('Jamon y pesto','(lorem impsum lorem lorem)','$200',"1 unidad","https://fastfoodnutrition.org/item-photos/full/836.jpg");
const pollo = new SaladosDairy('Pollo caprese','(lorem impsum lorem lorem)','$350',"1 unidad","https://globalassets.starbucks.com/assets/60ed448383414ddca2d89ea6271c3cf4.jpg?impolicy=1by1_tight_288");
const queso = new SaladosDairy('Queso a la parrilla','(lorem impsum lorem lorem)','$150',"1 unidad","https://globalassets.starbucks.com/assets/02ea801e3aca434fa2fcccfcd4adba8c.jpg?impolicy=1by1_wide_1242"); 
const tomate= new SaladosVeggies("Tomate y quesofu","(lorem impsum lorem lorem)","$300","1 unidad","https://globalassets.starbucks.com/assets/f7febd6b86084135b98a13fa95c72f51.jpg?impolicy=1by1_wide_1242");
let salados=[jamon,pollo,queso,tomate];

router.get('/salados', (req,res) => {
    res.status(200).json({salados})
})

module.exports={
    Salados:Salados,
    SaladosDairy:SaladosDairy,
    SaladosVeggies:SaladosVeggies,
    salados
}
module.exports=router;



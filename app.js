require('dotenv').config();//Le decimos que nos cargue las variables de entorno que declaramos en nuestro archivo ".env"
const express = require('express') //importo modulo express el cual utiliza el modulo 'http'
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes')
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000; //Buscamos la variable PORT en el entorno y si no usamos por defecto el numero 3000
const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env; //Buscamos la variable PORT en el entorno y si no usamos por defecto el numero 3000
const DB_URL = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@menuqr-shard-00-00.doub3.mongodb.net:27017,menuqr-shard-00-01.doub3.mongodb.net:27017,menuqr-shard-00-02.doub3.mongodb.net:27017/comida?ssl=true&replicaSet=atlas-dkyu9x-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(DB_URL, {  //Metodo para conectar a la base de datos, tiene 3 parametros:
    useNewUrlParser: true,  //Primero le pasamos la URI con las credenciales de acceso en DB_URL
    useUnifiedTopology: true//Segundo le pasamos un objeto con opciones de config, las que use yo son las basicas a usar para no tener problemas de conexion
}, () => {  //Por ultimo le pasamos una funcion como callback para ejecutar una vez que se conecte
    console.log('MongoDB conectado');//Si se logra conectar nos muestra esto en consola
})



const app = express(); //modulo express devuelve un objeto que guardo en la constante app
app.use(cors());  //se encargara de manejar errores de cors, hay muchas alternativas a este
app.use(express.json()); //Se encarga de parsear el body de las request, si no lo ponemos no podemos leerlo
app.use('/', routes); //Usamos nuestro archivo routes como middleware personalizado




//let salado = app.use(require('./comidas/salados'));
//let bebida = app.use(require('./comidas/bebidas'));
//let dulce = app.use(require('./comidas/dulces'));

try { //try-catch para manejar errores en caso de tenerlo cuando levantamos el servidor
    app.listen(PORT, () => {    //Escuchamos al puesto PORT
        console.log(`Server on port ${PORT}`);
    })
} catch (error) {
    console.log(`Error on port ${PORT}`, error);  //En caso de error veremos esto en nuestra consola
}



//mailer
//nodemailer
 function mailer(para){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pruebasprogramacion8@gmail.com',
            pass: process.env.CONTRASENIA // naturally, replace both with your real credentials or an application-specific password
        }
    });

    const mailOptions = {
        from: 'vindication@enron.com',
        to: para,
        subject: 'Invoices due',
        html: `<h2 style="padding-left: 100px;" >¡Ofertas en CoffeeHouse!</h2>
    <img width="500px" src="https://images.homify.com/images/a_0,c_fill,f_auto,h_900,q_auto,w_1920/v1570716394/p/photo/image/3225794/2D3A6489/fotos-de-galerias-y-espacios-comerciales-de-estilo-eclectico-de-artiature.jpg"/>
        <h3 style="padding-left: 100px;">Veni a ver todas nuestras ofertas</h3>
    <div style="padding-left: 180px;">
          <button style="
                      background-color: blue; 
      border: none;
    
      padding: 15px 32px;
     
     
      display: inline-block;
      font-size: 16px;  " ><a 
      style=" text-decoration: none;  color: white;"
    href="http://127.0.0.1:5500/index.html">Ver Menu</a></button>
      <div/>`

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
} 

//mailer("pruebasprogramacion8@gmail.com")


//firebase admin
 let admin = require("firebase-admin");
let serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ingreso-empleados-default-rtdb.firebaseio.com"
});


let listAllUsers = (nextPageToken) => {

    admin.auth().listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
                mailer(userRecord.email)
                //console.log(userRecord.email);

            });
            if (listUsersResult.pageToken) {
                listAllUsers(listUsersResult.pageToken);
                console.log("sent");

            }
        })
        .catch((error) => {
            console.log("error: ", error);
        });
};
setInterval(listAllUsers,  2 * 24 * 3600 * 10000);









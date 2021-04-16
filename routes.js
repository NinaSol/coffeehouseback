//Aca usamos express.Router(), se va a encargar del enrutamineto de la api.
const routes = require('express').Router(); 
//Traemos las funciones controladoras que se encargam de manejar las request
//drink
const {getDrink, postDrink, putDrink, deleteDrink} = require('./controllers/drinkController');
//drink V
const {getDrinkV, postDrinkV, putDrinkV, deleteDrinkV} = require('./controllers/drinkVController');
//brunch
const {getBrunch, postBrunch, putBrunch, deleteBrunch} = require('./controllers/brunchController');
//brunch V
const {getBrunchV, postBrunchV, putBrunchV, deleteBrunchV} = require('./controllers/brunchVController');

//dessert
const {getDessert, postDessert, putDessert, deleteDessert} = require('./controllers/dessertController');
//dessert V
const {getDessertV, postDessertV, putDessertV, deleteDessertV} = require('./controllers/dessertVController');
//all
const {getAll} = require('./controllers/generalController');

//order
const {postOrder,getOrder} = require('./controllers/orderController');
//mailer
//const {sendEmails} = require('./controllers/adminController');


//Aca vamos a declarar todas nuestras rutas, ahora creamos las rutas de la entidad branch
//(crear esto para cada entidad)
//drink
routes.get('/api/drink', getDrink);
routes.post('/api/create-drink', postDrink);
routes.put('/api/update-drink/:id', putDrink);
routes.delete('/api/delete-drink/:id', deleteDrink); //query ?sds=1
//drink V
routes.get('/api/veggie-drink', getDrinkV);
routes.post('/api/create-veggie-drink', postDrinkV);
routes.put('/api/update-veggie-drink/:id', putDrinkV);
routes.delete('/api/delete-veggie-drink/:id', deleteDrinkV);
//brunch
routes.get('/api/brunch', getBrunch);
routes.post('/api/create-brunch', postBrunch);
routes.put('/api/update-brunch/:id', putBrunch);
routes.delete('/api/delete-brunch/:id', deleteBrunch);
//brunch V
routes.get('/api/veggie-brunch', getBrunchV);
routes.post('/api/create-veggie-brunch', postBrunchV);
routes.put('/api/update-veggie-brunch/:name', putBrunchV);
routes.delete('/api/delete-veggie-brunch/:id', deleteBrunchV);
//dessert
routes.get('/api/dessert', getDessert);
routes.post('/api/create-dessert', postDessert);
routes.put('/api/update-dessert/:id', putDessert);
routes.delete('/api/delete-dessert/:id', deleteDessert);
//dessert V
routes.get('/api/veggie-dessert', getDessertV);
routes.post('/api/create-veggie-dessert', postDessertV);
routes.put('/api/update-veggie-dessert/:name', putDessertV);
routes.delete('/api/delete-veggie-dessert/:id', deleteDessertV);
//all
routes.get('/api/all', getAll)
//order
routes.post('/api/order', postOrder)
routes.get('/api/get-order', getOrder)
//mailer
//routes.post('/api/send-email', sendEmails)





//exportamos el enrutador "routes" para usarlo en app.js
module.exports = routes;




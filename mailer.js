/* module.exports={
    //nodemailer
 mailer(para){
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


} */
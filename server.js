src="https://code.jquery.com/jquery-3.3.1.min.js"

const express=require('express');
const request = require('request');
const yargs = require('yargs');
const app= express();

    var GoogleAPIKey = 'AIzaSyD7meilaIIDrfgGdcY81BcMit5DtPpZZrA';
    var DarkSkyAPIKey = 'a0d3e83e6e619d62098fa6fd0d6b86f4';

    const argv = yargs.argv;
    var morada = argv.morada;


//__dirname lê o caminho ate o node
app.use(express.static(__dirname+"/public"))

app.set("view engine", "hbs");

// COLOCAR NO BROWSER - http://localhost:3000/
app.get('/',(req, res)=>{
    res.render('index.hbs',{
        title:"Welcome to this site",
        text:"Hello from Express"
    });
    
    });
  //COLOCAR NO BROWSER - http://localhost:3000/about
    app.get('/weather',(req, res)=>{
        
        var moradaEncoded = encodeURIComponent(req.query.texto);
        request({url: `https://maps.googleapis.com/maps/api/geocode/json?address=${moradaEncoded}&key=${GoogleAPIKey}`, json: true}, (error, response, body) => {
    var lat = body.results[0].geometry.location.lat; 
    var lng = body.results[0].geometry.location.lng;
    var moradaEncoded = body.results[0].moradaEncoded;
    //estamos a pedir um json, do qual precisamos do body, onde está o array results, dentro do qual encontramos os objetos geometry, location e lat/lng
    var formatted_address = body.results[0].formatted_address;

    request({url: `https://api.darksky.net/forecast/${DarkSkyAPIKey}/${lat},${lng}?units=si`, json: true}, (DSerror, DSresponse, DSbody) => {
    var temperature = DSbody.currently.temperature;
    var apparentTemperature = DSbody.currently.apparentTemperature;

    console.log(`${morada}`)
    console.log(`It's ${temperature}. It feels like: ${apparentTemperature}.`)
});
res.render("papagaio.hbs", {texto: req.query.texto});
});
        });
    

//arranca o servidor e diz a porta que se vai usar
app.listen(3000);
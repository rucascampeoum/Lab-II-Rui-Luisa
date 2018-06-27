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

    app.get('/clima',(req, res)=>{
        
        var moradaEncoded = encodeURIComponent(req.query.texto);
        request({url: `https://maps.googleapis.com/maps/api/geocode/json?address=${moradaEncoded}&key=${GoogleAPIKey}`, json: true}, 
        (error, response, body) => {
            var lat = body.results[0].geometry.location.lat; 
            var lng = body.results[0].geometry.location.lng;
    //var moradaEncoded = body.results[0].moradaEncoded;
    //estamos a pedir um json, do qual precisamos do body, onde está o array results, dentro do qual encontramos os objetos geometry, location e lat/lng
    var formatted_address = body.results[0].formatted_address;

    request({url: `https://api.darksky.net/forecast/${DarkSkyAPIKey}/${lat},${lng}?units=si&lang=pt`, json: true}, (DSerror, DSresponse, DSbody) => {
    var temperature = DSbody.currently.temperature;
    var apparentTemperature = DSbody.currently.apparentTemperature;
    var icon = DSbody.currently.icon;
    var summary = DSbody.currently.summary;
    var windSpeed = DSbody.currently.windSpeed;
    var visibility = DSbody.currently.visibility;
    var pressure = DSbody.currently.pressure;
    var humidity = DSbody.currently.humidity;
    var dewPoint = DSbody.currently.dewPoint;
    var precipProbability = DSbody.currently.precipProbability;
    //fui buscar (pelo menos inicialmente) os aspectos do clima que aparecem na parte de cima da app de meteorologia do Windows, como referência
    //e na app Weather do iPhone

    //console.log(req.query.texto)
    //console.log(`It's ${temperature}. It feels like: ${apparentTemperature}.`)
    res.render("clima.hbs", {texto: `${formatted_address}`,
                             icone: `${icon}`,
                             texto2: `Temperatura: ${temperature}°C.`, 
                             texto3: `${summary}`,
                             texto4: `Temperatura Aparente: ${apparentTemperature}°C.`,
                             texto5: `Velocidade do Vento: ${windSpeed} km/h.`,
                             texto6: `Visibilidade: ${visibility} km.`,
                             texto7: `Pressão Atmosférica: ${pressure} mb.`,
                             texto8: `Humidade: ${humidity}%`,
                             texto9: `Ponto de Condensação: ${dewPoint}°`,
                             texto10: `Probabilidade de Precipitação: ${precipProbability}.`
});
}); 
});
});

app.get('/favoritos',(req, res)=>{

//isto nao me parece ser preciso, mas podemos aproveitar esta parte do código para trocar "favoritos" por outra secção que iremos ter

    res.render('favoritos.hbs',{
        title:"Welcome to this site",
        text:"Hello from Express"
    });
    
    });

    
//arranca o servidor e diz a porta que se vai usar
app.listen(3000);
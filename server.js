src="https://code.jquery.com/jquery-3.3.1.min.js"
src="public/skycons.js"

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
        //title:"Welcome to this site",
        text:"Olá Utilizador, venha ver a meteorologia"
    });
    
    });

    app.get('/clima',(req, res)=>{
        
        var moradaEncoded = encodeURIComponent(req.query.texto);
        request({url: `https://maps.googleapis.com/maps/api/geocode/json?address=${moradaEncoded}&key=${GoogleAPIKey}`, json: true}, 
        (error, response, body) => {
            try{
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

    var weekly0Icon = DSbody.daily.data[0].icon;
    var weekly0Summary = DSbody.daily.data[0].summary;
    var weekly0MinTemperature = DSbody.daily.data[0].temperatureMin;
    var weekly0MaxTemperature = DSbody.daily.data[0].temperatureMax;

    var weekly1Icon = DSbody.daily.data[1].icon;
    var weekly1Summary = DSbody.daily.data[1].summary;
    var weekly1MinTemperature = DSbody.daily.data[1].temperatureMin;
    var weekly1MaxTemperature = DSbody.daily.data[1].temperatureMax;

    var weekly2Icon = DSbody.daily.data[2].icon;
    var weekly2Summary = DSbody.daily.data[2].summary;
    var weekly2MinTemperature = DSbody.daily.data[2].temperatureMin;
    var weekly2MaxTemperature = DSbody.daily.data[2].temperatureMax;

    var weekly3Icon = DSbody.daily.data[3].icon;
    var weekly3Summary = DSbody.daily.data[3].summary;
    var weekly3MinTemperature = DSbody.daily.data[3].temperatureMin;
    var weekly3MaxTemperature = DSbody.daily.data[3].temperatureMax;

    var weekly4Icon = DSbody.daily.data[4].icon;
    var weekly4Summary = DSbody.daily.data[4].summary;
    var weekly4MinTemperature = DSbody.daily.data[4].temperatureMin;
    var weekly4MaxTemperature = DSbody.daily.data[4].temperatureMax;

    var weekly5Icon = DSbody.daily.data[5].icon;
    var weekly5Summary = DSbody.daily.data[5].summary;
    var weekly5MinTemperature = DSbody.daily.data[5].temperatureMin;
    var weekly5MaxTemperature = DSbody.daily.data[5].temperatureMax;

    var weekly6Icon = DSbody.daily.data[6].icon;
    var weekly6Summary = DSbody.daily.data[6].summary;
    var weekly6MinTemperature = DSbody.daily.data[6].temperatureMin;
    var weekly6MaxTemperature = DSbody.daily.data[6].temperatureMax;

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
                             texto10: `Probabilidade de Precipitação: ${precipProbability}.`,

                             icone2: `${weekly0Icon}`,
                             texto11: `${weekly0Summary}`,
                             texto12: `Temperatura minim ${weekly0MinTemperature}°C.`,
                             texto13: `Temperatura máxima: ${weekly0MaxTemperature}°C.`, 

                             icone3: `${weekly1Icon}`,
                             texto14: `${weekly1Summary}`,
                             texto15: `Temperatura minima: ${weekly1MinTemperature}°C.`,
                             texto16: `Temperatura máxima: ${weekly1MaxTemperature}°C.`,

                             icone4: `${weekly2Icon}`,
                             texto17: `${weekly2Summary}`,
                             texto18: `Temperatura minima: ${weekly2MinTemperature}°C.`,
                             texto19: `Temperatura máxima: ${weekly2MaxTemperature}°C.`, 

                             icone5: `${weekly3Icon}`,
                             texto20: `${weekly3Summary}`,
                             texto21: `Temperatura minima: ${weekly3MinTemperature}°C.`,
                             texto22: `Temperatura máxima: ${weekly3MaxTemperature}°C.`, 

                             icone6: `${weekly4Icon}`,
                             texto23: `${weekly4Summary}`,
                             texto24: `Temperatura minima: ${weekly4MinTemperature}°C.`,
                             texto25: `Temperatura máxima: ${weekly4MaxTemperature}°C.`, 

                             icone7: `${weekly5Icon}`,
                             texto26: `${weekly5Summary}`,
                             texto27: `Temperatura minima: ${weekly5MinTemperature}°C.`,
                             texto28: `Temperatura máxima: ${weekly5MaxTemperature}°C.`, 

                             icone8: `${weekly6Icon}`,
                             texto29: `${weekly6Summary}`,
                             texto30: `Temperatura minima: ${weekly6MinTemperature}°C.`,
                             texto31: `Temperatura máxima: ${weekly6MaxTemperature}°C.`, 
});
});
} catch(err) {
    res.render('index.hbs',{
        text:"Utilizador, realizou uma pesquisa inválida."
    });
}
});
});

    
//arranca o servidor e diz a porta que se vai usar
app.listen(3000);
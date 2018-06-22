const express=require('express');

//modulo de templates
const hbs=require('hbs');
//para usar o express tenho que criar uma nova variavel.
const app= express();

//__dirname lê o caminho ate o node
app.use(express.static(__dirname+"/public"))

app.set("view engine", "hbs");

// COLOCAR NO BROWSER - http://localhost:3000/
app.get('/',(request, response)=>{
    response.render('index.hbs',{
        title:"Welcome to this site",
        text:"Hello from Express"
    });
    
    });
  //COLOCAR NO BROWSER - http://localhost:3000/about
    app.get('/weather',(request, response)=>{
        response.render("papagaio.hbs", {texto: request.query.texto});

        });


    //COLOCAR NO BROWSER - http://localhost:3000/horas    
        app.get('/horas',(request, response)=>{
            response.render('index.hbs',{
                title:"Current time:",
                text:Date().toString()
            });
            
            });
    

//arranca o servidor e diz a porta que se vai usar
app.listen(3000);
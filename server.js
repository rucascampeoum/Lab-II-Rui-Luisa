const express=require('express');

//modulo de templates
const hbs=require('hbs');
//para usar o express tenho que criar uma nova variavel.
const app= express();

//__dirname lê o caminho ate o node
app.use(express.static(__dirname+"/public"))

// COLOCAR NO BROWSER - http://localhost:3000/
app.get('/',(request, response)=>{
    response.render('welcome.hbs',{
        title:"Welcome to this site",
        text:"Hello from Express"
    });
    
    });
  //COLOCAR NO BROWSER - http://localhost:3000/about
    app.get('/about',(request, response)=>{
        response.render('welcome.hbs',{
            title:"About my site",
            text:"..."
        });
        
        });


    //COLOCAR NO BROWSER - http://localhost:3000/horas    
        app.get('/horas',(request, response)=>{
            response.render('welcome.hbs',{
                title:"Current time:",
                text:Date().toString()
            });
            
            });
    

//arranca o servidor e diz a porta que se vai usar
app.listen(3000);
const express = require("express");
//add handelbars module
const hbs = require("hbs");

const fs = require("fs");

const port = process.env.PORT ;

var app = express();
//set express view engine as hbs type
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("getCurrentYear", () =>{
    return new Date().getFullYear();    
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    
    var log = `${now}: ${req.method} ${req.url}`;
    
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    
    next();    
});



//Route handlers

//app.get("/", (req, res) =>{
    //res.send("<h1>Hello Express</h1>");
//    res.send({
//        name: "Andrew",
//        likes: ["biking",
//        "cities"
//        ]
//    });
//});

app.get("/", (req, res) =>{
   res.render("home.hbs", {
       pageTitle: "Home Page",
       //currentYear: getCurrentYear(),
       welcomeMsg: "Welcome to Home Page"
   });
});

app.get("/about", (req, res) =>{
    res.render("about.hbs", {
        pageTitle: "About Page",
        //currentYear: new Date().getFullYear()
    });
});

// /bad send back json with errorMessage

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Something Bad just Happened!"
    });
});

app.get("/projects", (req, res) => {
    res.render("projects.hbs");
});

app.use((req, res, next) => {
   res.render("maintenance.hbs"); 
});



// gives access to static files, you need to specify extension when accessing
app.use(express.static(__dirname + "/public"));


//for local host
//app.listen(3000);

// Making it listen in C9
app.listen(process.env.PORT, process.env.IP, function(){
    console.log(`Server Started on Port ${process.env.PORT}!`);
});




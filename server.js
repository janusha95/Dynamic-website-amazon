const express = require("express");
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"))

app.get("/", (req,res)=>{

    res.render("home",{
        title : "Home Page"
    })

})

app.get("/products", (req,res)=>{
    
    res.render("products",{
        title : "Products"
    })

})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log("Web server is running");
})
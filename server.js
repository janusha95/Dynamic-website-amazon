const express = require("express");
const exphbs = require('express-handlebars');

const product = require("./models/product")
const categories = require("./models/category")

const app = express();

const PORT = process.env.PORT;


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"))

app.get("/", (req,res)=>{

    res.render("home",{
        cat : categories.getAllCategory(),
        featured : product.getFeaturedProducts()
    })

})

app.get("/products", (req,res)=>{
    
    res.render("products",{
        data : product.getAllProducts()
    })

})

app.get("/login", (req,res)=>{

    res.render("login",{
    })

})

app.get("/registration", (req,res)=>{

    res.render("registration",{
    })

})

app.listen(PORT, ()=>{
    console.log("Web server is running");
})

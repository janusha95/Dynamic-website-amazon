const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const product = require("./models/product")
const categories = require("./models/category")

const app = express();

// const PORT = process.env.PORT;


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: false }))

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

app.post("/Login", (req,res)=>{

    const validate = [];

    if(req.body.email=="")
    {
        validate.push("Please enter the Email address");
    }

    if(req.body.psw=="")
    {
        validate.push("Please enter the password");
    }

    if(validate.length > 0)
    {
        res.render("login",{
            validation:validate
        })
    }

    else{
        res.redirect("/");
    }

})

app.get("/registration", (req,res)=>{

    res.render("registration",{
    })

})

app.post("/Registration", (req,res)=>{

    const validatereg = [];

    if(req.body.name=="")
    {
        validatereg.push("Please enter the User name");
    }

    if(req.body.email=="")
    {
        validatereg.push("Please enter the Email Address");
    }

    // const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if(req.body.email.value.match(mailformat))
    // {
    //     validatereg.push("Please enter correct Email Address");
    // }

    if(req.body.psw=="")
    {
        validatereg.push("Please enter the password");
    }

    if((req.body.psw < 6)&&(req.body.psw > 12))
    {
        validatereg.push("Password length must be 6 - 12");
    }

    // const letterNumber =/^[0-9a-zA-Z]+$/;
    // if(req.body.psw.value.match(letterNumber)) 
    // {
    //     validatereg.push("Password must be only numbers and letters");
    // }

    if(req.body.psw == "")
    {
        validatereg.push("Password length must be 6 - 12");
    }

    if((req.body.pswrepeat=="")&&(req.body.pswrepeat!=req.body.psw))
    {
        validatereg.push("Password doesn't match");
    }

    if(validatereg.length > 0)
    {
        res.render("registration",{
            validationreg:validatereg
        })
    }

    else{
        res.redirect("/");
    }

})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("Web server is running");
})

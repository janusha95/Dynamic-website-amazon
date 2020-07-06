const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

require('dotenv').config({path:"./config/keys.env"});

const app = express();

const PORT =  process.env.PORT;

app.use(express.static("public"))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



app.use(bodyParser.urlencoded({ extended: false }))

const generalController = require("./controllers/general");
const productController = require("./controllers/product");

app.use("/", generalController);
app.use("/products", productController);

app.listen(PORT, ()=>{
    console.log("Web server is running");
})

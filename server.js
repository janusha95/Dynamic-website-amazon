const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config({path:"./config/keys.env"});

const app = express();

const PORT =  process.env.PORT;

app.use(express.static("public"))

app.engine('handlebars', exphbs(
    {
        helpers:{
            if_same  : function(v1,v2){
                return v1===v2 ? 'selected' : '' ;
            },

            if_checked : function(v1,v2){
                return v1===v2 ? 'checked': '';
            }
        }
    }
));
app.set('view engine', 'handlebars');



app.use(bodyParser.urlencoded({ extended: false }))

const generalController = require("./controllers/general");
const productController = require("./controllers/product");
const inventoryController = require("./controllers/inventory");

app.use((req,res,next)=>{
    if (req.query.method=="PUT")
    {
        req.method="PUT"
    }
    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }
    next();
})

app.use("/", generalController);
app.use("/products", productController);
app.use("/inventory", inventoryController);



mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to Mongodb database`);
})
.catch(err=>console.log(`Error when connecting to database ${err}`));

app.listen(PORT, ()=>{
    console.log("Web server is running");
})

const express = require('express')
const router = express.Router();

const product = require("../models/product")

router.get("/list", (req,res)=>{
    
    res.render("products",{
        data : product.getAllProducts()
    })

})

module.exports = router;
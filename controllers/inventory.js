const express = require('express')
const router = express.Router();
const inventoryModel = require("../models/inventory");

router.get("/", (req,res)=>{
    res.render("inventory",{

    });
    
})
router.post("/", (req,res)=>{
    const newPrdt = 
    {
        pname:req.body.pname,
        pprice:req.body.pprice,
        pdesc:req.body.pdesc,
        pcategory:req.body.pcategory,
        pqty:req.body.pqty,
        pbst:req.body.pbst
    }
    const prdt = new inventoryModel(newPrdt);
    prdt.save()
    .then((prdt)=>{

        res.redirect(`/`)

        })

    .catch(err=>console.log(`Error while inserting into the data ${err}`)); 

})

module.exports = router;
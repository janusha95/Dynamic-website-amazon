const express = require('express')
const router = express.Router();

const product = require("../models/product")
const categories = require("../models/category")

router.get("/",(req,res)=>{

    res.render("home",{
        cat : categories.getAllCategory(),
        featured : product.getFeaturedProducts()
    })
});

router.get("/login", (req,res)=>{

    res.render("login",{
    })

})

router.post("/Login", (req,res)=>{

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

router.get("/registration", (req,res)=>{

    res.render("registration",{
    })

})

router.post("/Registration", (req,res)=>{

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

        const {name,email,psw} = req.body;

        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
        to: `${email}`,
        from: 'janushasridhar95@gmail.com',
        subject: 'Welcome to Amazon',
        html: `<strong>Welcome to Amazon ${name} </strong>
        <br>
        You can purchase from Amazon.ca and enjoy our free Prime for a Month!! `
        ,
        };
        sgMail.send(msg).then(()=>{
            res.redirect("/");
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        });

    }

})

module.exports = router;
const express = require('express')
const router = express.Router();
const userModel = require("../models/User");
const path = require("path");
const bcrypt = require("bcryptjs");
const isAuthenticated = require("../middleware/auth");
const dashBoardLoader = require("../middleware/authorization");
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
    userModel.findOne({email:req.body.email})
    .then(user=>{

        const errors= [];

        //email not found
        if(user==null)
        {
            errors.push("Sorry, your email and/or password incorrect");
            res.render("login",{
                errors
            })
                
        }

        //email is found
        else
        {
            bcrypt.compare(req.body.psw, user.psw)
            .then(isMatched=>{
                
                if(isMatched)
                {
                    //create our session
                    req.session.userInfo = user;
                   
                    res.redirect("/");
                }

                else
                {
                    errors.push("Sorry, your email and/or password incorrect ");
                    res.render("login",{
                        errors
                    })
                }

            })
            .catch(err=>console.log(`Error ${err}`));
        }


    })
    .catch(err=>console.log(`Error ${err}`));
    
});

    // const validate = [];

    // if(req.body.email=="")
    // {
    //     validate.push("Please enter the Email address");
    // }

    // if(req.body.psw=="")
    // {
    //     validate.push("Please enter the password");
    // }

    // if(validate.length > 0)
    // {
    //     res.render("login",{
    //         validation:validate
    //     })
    // }

//     userModel.findOne()

//     else{
//         res.redirect("/");
//     }

// })

router.get("/logout", (req,res)=>{

    req.session.destroy();
    res.redirect("/")


})

router.get("/registration", (req,res)=>{

    res.render("registration",{
    })

})

router.post("/Registration", (req,res)=>{

    const newUser = 
    {
        name:req.body.name,
        email:req.body.email,
        psw:req.body.psw
    }

    const user = new userModel(newUser);
    user.save()
    .then((user)=>{

        res.redirect(`/`)

        })

    .catch(err=>console.log(`Error while inserting into the data ${err}`));
 



    const validatereg = [];

    if(req.body.name=="")
    {
        validatereg.push("Please enter the User name");
    }

    if(req.body.email=="")
    {
        validatereg.push("Please enter the Email Address");
    }

    const mailformat = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+\.[a-z]{1,4}$/;
    if(!(req.body.email.match(mailformat)))
    {
        validatereg.push("Please enter correct Email Address");
    }

    if(req.body.psw=="")
    {
        validatereg.push("Please enter the password");
    }

    if((req.body.psw < 6)&&(req.body.psw > 12))
    {
        validatereg.push("Password length must be 6 - 12");
    }


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
            console.log(`Email sent to ${email}`);
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        });

    }

})

router.get("/profile", isAuthenticated, dashBoardLoader)



module.exports = router;
const express = require('express')
const router = express.Router();
const productModel = require("../models/inventory");
const { Console } = require('console');
const isAuthenticated = require("../middleware/auth");

router.get("/", (req, res) => {
    productModel.find({ category: "electronics" })
        .then((products) => {
            const filteredProduct = products.map(product => {

                return {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    bestSeller: product.bestSeller,
                    image: product.image,

                }

            })
            res.render("products", { title: "Product", products: filteredProduct })
        })
        .catch(err => console.log(`Error occured during pilling data from product.--${err}`))

})

router.post("/", (req, res) => {
    const newCategory = req.body.category
    productModel.find({ category: newCategory })
        .then((products) => {
            const filteredProduct = products.map(product => {

                return {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    bestSeller: product.bestSeller,
                    image: product.image,

                }

            })
            res.render("products", { title: "Product", products: filteredProduct,  newCategory })
        })
        .catch(err => console.log(`Error occured during pilling data from product.--${err}`))

    console.log(newCategory)
})

router.get("/list", isAuthenticated,(req, res) => {
    if (req.session.userInfo.type == "Admin") {
    productModel.find()
        .then((products) => {
            const filteredProduct = products.map(product => {

                return {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    quantity: product.quantity,
                    bestSeller: product.bestSeller,
                    image: product.image
                }
            })
            res.render("product-list", { data: filteredProduct })
        })
        .catch(err => console.log(`Error occured during pilling data from product.--${err}`))
         }
         else {
           res.render("products")
        }

})
router.get("/add",isAuthenticated, (req, res) => {
    console.log(req.session.userInfo.type)
    if (req.session.userInfo.type == "Admin") {
        res.render("inventory", {
    })
    }
    else {
        console.log(req.session.userInfo.type)
        res.redirect("/login")
    }

})

router.post("/add", (req, res) => {

    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity,
        bestSeller: req.body.bestSeller,
    }


    const product = new productModel(newProduct)

    product.save()
       .then((product) => {

            req.files.image.name = `${product._id}${req.files.image.name}`
            req.files.image.mv(`public/uploads/${req.files.image.name}`)
                .then(() => {
                    productModel.updateOne({ _id: product._id }, { image: req.files.image.name })
                        .then(() => {
                            res.redirect(`/products/list`);
                       })
                       .catch(err => console.log(err))

               })
               .catch(err => console.log(err))
        })
        .catch(err => console.log(err))


})

router.get('/edit/:id',isAuthenticated, (req, res) => {
    productModel.findById(req.params.id)
        .then((product) => {
            const { _id, name, price, description, category, quantity, bestSeller, image } = product
            res.render("editinventory", { _id, name, price, description, category, quantity, bestSeller, image })
           
        })
        .catch(err => console.log(err))
})

router.put('/update/:id', (req, res) => {
   
    const product = {
        _id:req.params.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity,
        bestSeller: req.body.bestSeller,
        
    }
    console.log(req.files)
    productModel.updateOne({_id:product._id},product)
        .then(()=>{
            res.redirect("/products/list")
        })
        .catch(err=>console.log(err))
        // req.files.image.name = `${product._id}${req.files.image.name}`
        // product.image=req.files.image.name 
        // req.files.image.mv(`public/uploads/${req.files.image.name}`)
        // .then(()=>{
        //     productModel.updateOne({_id:product._id},product)
        //     .then(()=>{
        //         res.redirect("/product/list")
        //     })
        //     .catch(err=>console.log(err))
        // })
        // .catch(err=>console.log(err))

})

router.delete('/delete/:id',isAuthenticated, (req, res) => {
    productModel.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect("/products/list")
        })
        .catch(err => console.log(err))
})



// This route is for the description Page.
router.get(`/description/:id`, (req, res) => {

    productModel.findById(req.params.id)
        .then((product) => {
            const { _id, name, description, price, quantity, image } = product
            res.render("description", {
                _id, name, description, price, quantity, image
            })
        })
        .catch(err => console.log(err))

})

router.get('/cart',(req,res)=>{
    let amount = 0
    const email = req.session.userInfo._id
    userModel.findById(email)
        .then((user) => {
            const productDetail = user.cart
            console.log(productDetail)
            // Promise.all([newProduct]).then((finalProduct)=>console.log(finalProduct))
            let finalProduct = [];
            console.log(finalProduct)

            let promiseArr = productDetail.map(eachproduct => {
                return productModel.findById(eachproduct.product_id)
                    .then((product) => {
                        amount = amount + product.price * eachproduct.quantity
                        const newProduct = {
                            id: product._id,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            image: product.image,
                            quantity: eachproduct.quantity

                        }
                        return (newProduct)
                        // finalProduct.push(newProduct)
                        // console.log(finalProduct)
                    })

                    .catch((err) => console.log(err))

            })
            Promise.all(promiseArr).then(data => {
                res.render("product/shopping-cart", {
                    data: data, amount
                })
            })
        })
        .catch(err => console.log(err))
})

router.post('/cart', (req, res) => {

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
        to: `${req.session.userInfo.email}`,
        from: 'janushasridhar95@gmail.com',
        subject: 'Thanks for ordering from Amazon',
        //   text: 'and easy to do anywhere, even with Node.js',
        html: `<p style ="font-size : 25px"> Thank you. </p>
    <p> Welcome to Amazon </p> `,
    };
    sgMail.send(msg)
        .then(() => {
            res.redirect("/");

        })
        .catch(err => {
            console.log(`Error ${err}`);
        });
    })


router.post('/description/:id', (req, res) => {
    if (req.session.userInfo) {
        if (req.session.userInfo.type == "Admin") {
            res.redirect("/login")
        }
        else {
            const newCart = [{ quantity: req.body.quantity, product_id: req.params.id }]
            productModel.updateOne({ email: req.session.userInfo.email }, { $push: { cart: newCart } })
                .then(() => {
                    res.render("shopping-cart")
                })
                .catch(err => console.log(err))

        }
    }
    else {
        res.redirect('/login')
    }
})

module.exports = router;
const express = require('express')
const router = express.Router();
const productModel = require("../models/inventory");
const { Console } = require('console');

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
            res.render("products", { title: "Product", products: filteredProduct, category: newCategory })
        })
        .catch(err => console.log(`Error occured during pilling data from product.--${err}`))

    console.log(newCategory)
})

router.get("/list", (req, res) => {
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

})
router.get("/add", (req, res) => {
    res.render("inventory", {
    })
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

router.get('/edit/:id', (req, res) => {
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

router.delete('/delete/:id', (req, res) => {
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
router.post('/description/:id', (req, res) => {
    res.render("shopping-cart")
})

module.exports = router;
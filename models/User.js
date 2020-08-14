const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const {Schema , model}=require('mongoose');
const cartSchema = new Schema({ product_id: String , quantity : Number });

//This indicates the shape of the documents that will be entering the database
  const userSchma = new Schema({
   
  
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    psw:
    {
        type:String,
        required:true
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    },
    type:
    {
        type:String,
        default:"User"
    },
    cart:
        {
            type:[cartSchema],
           
        } , 
  });

  /*
    For every Schema you create(Create a schema per collection), you must also create a model object. 
    The model will allow you to perform CRUD operations on a given collection!!! 
  */


userSchma.pre("save",function(next)
{

    //salt random generated characters or strings
    bcrypt.genSalt(10)
    .then((salt)=>{
        
        bcrypt.hash(this.psw,salt)
        .then((encryptPassword)=>{
            this.psw = encryptPassword;
            next();

        })
        .catch(err=>console.log(`Error occured when hasing ${err}`));
    })
    .catch(err=>console.log(`Error occured when salting ${err}`));



})
 const userModel = mongoose.model('User', userSchma);

 module.exports = userModel;
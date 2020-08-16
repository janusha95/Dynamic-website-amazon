const mongoose = require('mongoose');
const {Schema , model}=require('mongoose');

const productSchema = new Schema(
    {
        name : {
            type:String,
            required:true
        },
        price : {
            type:String,
            required:true
        },
        description : {
            type:String,
            required:true, 
        },
        category : {
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },

        bestSeller:{
            type: Boolean,
            required:true
        },
        image:{
            type:String,
            
        },
            
        dateCreated:{
            type: Date,
            default:Date.now()
        }

    }
)


 const productModel = mongoose.model('product', productSchema);

 module.exports = productModel;
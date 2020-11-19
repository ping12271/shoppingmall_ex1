const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        requred : true
    }
})

module.exports = mongoose.model("product", productSchema)
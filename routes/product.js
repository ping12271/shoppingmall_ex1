const express = require('express')
const { disconnect } = require('mongoose')
const { find, findByIdAndDelete } = require('../models/product')
const router = express.Router()

const productModel = require("../models/product")

router.post('/', (req, res) => {
    const newProduct = new productModel ({
        name : req.body.productName,
        price : req.body.productPrice
    })
    
    newProduct
        .save()
        .then(doc => {
            res.json({
                message : "saved data",
                productInfo : doc
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })

})

router.get('/', (req, res) => {
    productModel
        .find()
        .then(docs => {
            res.json({
                message : "successful get product",
                count : docs.length,
                products : docs
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
})

router.delete('/', (req, res) => {
    productModel
        .remove()
        .then(() => {
            res.json({
                message : "deleted all product"
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
})

module.exports = router
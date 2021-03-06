const express = require('express')
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
                productInfo : {
                    id : doc._id,
                    name : doc.name,
                    price : doc.price,
                    request : {
                        type : "GET",
                        url : "http://localhost:8000/product" + doc._id
                    }
                }
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
                products : docs.map(doc => {
                    return {
                        id : doc._id,
                        name : doc.name,
                        price : doc.price,
                        request : {
                            type : "GET",
                            url : "http://localhost:8000/product/" + doc._id
                        }
                    }
                })

            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
})

router.get('/:productID', (req, res) => {

    const id = req.params.productID
    productModel
        .findById(id)
        .then(doc => {
            res.json({
                message : '하나만 불러와라 ' + id,
                product : {
                    id : doc._id,
                    name : doc.name,
                    price : doc.price
                },
                request: {
                    type : "GET",
                    url : "http://localhost:8000/product"
                }
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })

})

router.patch('/:productID', (req, res) => {
    
    const id = req.params.productID
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    productModel
        .findOneAndUpdate(id, {$set: updateOps})
        .then(() => {
            res.json({
                message : 'updated at ' + id,
                request : {
                    type : "GET",
                    url : "http://localhost:8000/product" + id
                }
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
                message : "deleted all product",
                request : {
                    type: "GET",
                    url : "http://localhost:8000/product"
                }
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
})

router.delete('/:productID', (req, res) => {
    const id = req.params.productID
    productModel
        .findByIdAndDelete(id)
        .then(() => {
            res.json({
                message : '선택 삭제' + id,
                request: {
                    type : "GET",
                    url : "http://localhost:8000/product" + id
                }
            })
        })
        .catch(err => {
            res.json({
                message : err
            })
        })
})
module.exports = router
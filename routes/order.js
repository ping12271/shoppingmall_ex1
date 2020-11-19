const express = require('express')
const router = express.Router()


const orderModel = require('../models/order')
// order 등록하는 API
router.post('/', (req, res) => {
    const newOrder = new orderModel({
        product : req.body.productID,
        quantity : req.body.qty
    })

    newOrder
        .save()
        .then(doc => {

            console.log(doc)

            res.json({
                message : "saved data",
                orderInfo : {
                    id : doc._id,
                    product : doc.product,
                    quantity : doc.quantity,
                    request : {
                        type : "GET",
                        url : "http://localhost8000/order/" + doc._id
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
})
// order 전체리스트 불러오기 API
router.get('/', (req, res) => {

    console.log("+++++++++++++")
    orderModel
        .find()
        .then(docs => {
            res.json({
                message : '모두 찾아',
                count : docs.length,
                order : docs.map(doc => {
                    return {
                        id : doc._id,
                        product : doc.product,
                        quantity : doc.quantity,
                        request : {
                            type : "GET",
                            url : "http://localhost:8000/order/" + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
})
// order 상세 API
router.get('/:productID', (req, res) => {
    const id = req.params.productID
    orderModel
        .findById(id)
        .then(doc => {
            console.log(doc)
            res.json({
                message : '상세보기' + id,
                product : {
                    id : doc._id,
                    product: doc.product,
                    quantity : doc.quantity
                },
                request: {
                    type : "GET",
                    url : "http://localhost:8000/order"
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
})

// 특정 order 삭제하기
router.delete('/:productID', (req, res) => {
    const id = req.params.productID
    orderModel
        .findByIdAndDelete(id)
        .then(() => {
            res.json({
                message : '특정 삭제' + id,
                request : {
                    type : "GET",
                    url : "http://localhost:8000/order"
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message : err
            })
        })
})

// order 전체삭제 API
router.delete('/', (req, res) => {
    orderModel
        .remove()
        .then(() => {
            res.json({
                message : '전체삭제',
                request : {
                    type : "GET",
                    url : "http://localhost:8000/order"
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
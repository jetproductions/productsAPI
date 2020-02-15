var express = require('express')
var router = express.Router()


// ROUTES FOR API CALLS

// Main URL 
router.get('/', (req,res)=>{
    res.send('Did you need a longer URL?');
})

// /products/list
router.get('/list', (req,res)=>{
    res.send('PRODUCT LIST!');
})

//  /products/:product_id
router.get('/:product_id', (req,res)=>{
    res.send(`PRODUCT ${req.params.product_id} INFO!`);
})

//  /products/:product_id/styles
router.get('/:product_id/styles', (req,res)=>{
    res.send(`PRODUCT ${req.params.product_id} STYLES!`);
})

//  /products/:product_id/related
router.get('/:product_id/related', (req,res)=>{
    res.send(`PRODUCT !`);
})

module.exports = router;
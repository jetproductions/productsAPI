var express = require('express')
var router = express.Router()
var client = require ('./db/database');
require ('dotenv').config();


// ROUTES FOR API CALLS

// Main URL 
router.get('/', (req,res)=>{
    res.send('Did you need a longer URL?');
})

// /PRODUCTS/LIST
// Returns array list of ALL products as objects with keys:
// 		"id":  NUMBER 
// 		"name":  STRING
// 		"slogan":  STRING
// 		"description": 	STRING
// 		"category":  STRING
// 		"default_price":  STRING
router.get('/list', (req,res)=>{
    let query = 'SELECT * FROM product WHERE id < $1';
    let params = [6];
client.query(query, params)
    .then(reply => res.send(reply.rows));
    // res.send(results)
    // res.send('PRODUCT LIST!');
})


//  /PRODUCTS/:PRODUCT_ID
// Returns an object representing a product - specific version of all above details, but also features.
// {
// 	"id": NUMBER
// 	"name": STRING
// 	"slogan": STRING
// 	"description": STRING
// 	"category": STRING
// 	"default_price": STRING
// 	"features": [
//   		{
// 			"feature": STRING
// 			"value": STRING
// 		},
//   		{
// 			"feature": STRING
// 			"value": STRING
// 		},
// 	]
// }
router.get('/:product_id/', (req,res)=>{
    // if (req.params.id !== )
    let product;
    // let query1 = 'SELECT * FROM product WHERE id = $1';
    // let query2 = 'SELECT * FROM features WHERE product_id = $1';
    let query = 'SELECT product.id, product.name, product.slogan, product.description, product.category, product.default_price,features.value,features.feature FROM public.product INNER JOIN public.features ON product.id = features.product_id WHERE product.id=$1'
    let params = [req.params.product_id];
    client.query(query, params)
    .then (response => product = response)
    .catch ((err)=> console.error(err))
    .then(() => res.send(product.rows))
    .catch( (err) => console.error(err))
    
})

//  /PRODUCTS/:PRODUCT_ID/STYLES
// Returns a list of styles under RESULTS, with stringified key at PRODUCT_ID

// {
// 	"product_id": STRING
// 	"results": [
//   	{
// 			"style_id": NUMBER
// 			"name": STRING
// 			"original_price": STRING
// 			"sale_price": STRING
// 			"default?": BOOLEAN? (NUMBER)
// 			"photos": [
//   			{
// 					"thumbnail_url": STRING
// 					"url": STRING
// 				},
//   			{
// 					"thumbnail_url": STRING	
// 					"url": STRING
// 				}
// 			],
// 		"skus": {
// 			"XS": NUMBER
// 			"S": NUMBER
// 			"M": NUMBER
// 			"L": NUMBER
// 			"XL": NUMBER
// 		}
// 	},
//   {
// 		"style_id": NUMBER
// 		"name":  STRING
// 		"original_price": STRING
// 		"sale_price": STRING
// 		"default?": STRING
// 		"photos": [
//   			{
// 					"thumbnail_url": STRING
// 					"url": STRING
//         }
// 			],
// 		"skus": {
// 			"S": NUMBER
// 			"XS": NUMBER
// 			"M": NUMBER
// 			"L": NUMBER
// 			"XL": NUMBER
// 			"XXL": NUMBER
// 			}
// 	},
// }
router.get('/:product_id/styles', (req,res)=>{
    res.send(`PRODUCT ${req.params.product_id} STYLES!`);
})

//  /products/:product_id/related
// returns a list of related products as numbers in an array with format:
// [ NUMBER, NUMBER, NUMBER, NUMBER ]
router.get('/:product_id/related', (req,res)=>{
    res.send(`PRODUCT !`);
})

module.exports = router;
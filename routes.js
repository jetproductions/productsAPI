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
    console.log("Request for Product List");
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
    console.log("Request for Product Info on Product #"+req.params.product_id);
    let product;
    let query1 = 'SELECT * FROM product WHERE id = $1';
    let query2 = 'SELECT feature, value FROM features WHERE product_id = $1';
    // let query = 'SELECT product.id, product.name, product.slogan, product.description, product.category, product.default_price,features.value,features.feature FROM public.product INNER JOIN public.features ON product.id = features.product_id WHERE product.id=$1'
    let params = [req.params.product_id];
    client.query(query1, params)
    .then (response => product = response.rows[0])
    .catch ((err)=> console.error(err))
    .then (() => {
        client.query(query2, params)
        .then (response => product["features"] = response.rows)
        .catch(err => console.error(err))
        .then(() => res.send(product))
        .catch ((err)=> console.error(err))
    })
    .catch ((err)=> console.error(err))
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
// 		    "skus": {
// 		    	"XS": NUMBER
// 		    	"S": NUMBER
// 		    	"M": NUMBER
// 		    	"L": NUMBER
// 		    	"XL": NUMBER
// 	    	}
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
    console.log("Request for Product Styles on Product #"+req.params.product_id);

    let stylesQuery = `SELECT id,name,original_price,sale_price,default_style FROM styles WHERE product_id=${req.params.product_id} ORDER BY id;`;
    let photosQuery = 'SELECT url, thumbnail_url FROM photos WHERE style_id=$1;';
    let skusQuery = 'SELECT size, quantity FROM skus WHERE style_id=$1;';

    let returnObj = {
        product_id: req.params.product_id.toString(),
        results: [],
    }
   
    client.query(stylesQuery)
    .then (response => response.rows)
    .then (rows => rows.map( style => {
        let p = [];
        p.push(style.id);

        let styleCard = {
                        style_id: style.id,
                        name: style.name,
                        original_price:style.original_price,
                        sale_price:style.sale_price==='0'?"null":style.sale_price,
                        "default?":style.default_style,
                        photos:[],
                        skus:[]
                    }

        photoProm = client.query(photosQuery,p)
        skuProm = client.query(skusQuery,p)
        Promise.all([photoProm,skuProm])
        .then(x => {
            let skuArray = (x[1].rows).map(obj => [obj.size,obj.quantity])
            styleCard.photos = x[0].rows;
            styleCard.skus = Object.fromEntries(skuArray);
            return styleCard;
        })
        .catch(err => console.error(err))
        .then(output => {
            returnObj.results.push(output)
            return res.send(returnObj)
        })
        .catch(err => console.error)
    }))
})

//  /products/:product_id/related
// returns a list of related products as numbers in an array with format:
// [ NUMBER, NUMBER, NUMBER, NUMBER ]
router.get('/:product_id/related', (req,res)=>{
    console.log("Request for Related Products on Product #"+req.params.product_id);
    let query = 'SELECT related_product_id FROM related WHERE current_product_id=$1;';
    let params = [req.params.product_id];

    client.query(query, params)
    .then(reply => res.send(reply.rows.map(item=>item.related_product_id)));
})

module.exports = router;
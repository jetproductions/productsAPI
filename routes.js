var express = require('express')
var router = express.Router()
const connectString = process.env.SQL_STRING;
const Pool = require ('pg-pool');
require ('dotenv').config();

const pool = new Pool({
        connectionString : connectString,
    });

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
    pool
    .query(query, params)
    .then(reply => res.send(reply.rows))
  
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
    pool
    .query(query1, params)
    .then (response => product = response.rows[0])
    .catch ((err)=> console.error(err))
    .then (() => {
        pool.query(query2, params)
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

    let joinQuery = 'SELECT * FROM styles LEFT JOIN skus ON skus.style_id = styles.id LEFT JOIN photos ON photos.style_id = styles.id WHERE styles.product_id =$1';

    let returnObj = {
        product_id: req.params.product_id.toString(),
        results: [],
    }
   
    pool
    .query(joinQuery, Array.of(req.params.product_id) )
    .then(output => output.rows)
    .then(incomingData => {
        let repository = {};
        if (incomingData.length){
            incomingData.forEach(record =>{
                if (repository[record.style_id] ){
                    repository[record.style_id].skus[record.size]=record.quantity;
                    repository[record.style_id].photos[record.url] = {url:record.url, thumbnail_url: record.thumbnail_url};

                } else {
                    repository[record.style_id] = {
                        style_id:record.style_id,
                        name:record.name,
                        original_price:record.original_price,
                        sale_price: record.sale_price==="null"?"0":record.sale_price,
                        'default?':parseInt(record.default_style),
                        photos:{},
                        skus:{}
                    }
                    repository[record.style_id].photos[record.url]={url:record.url, thumbnail_url:record.thumbnail_url}
                    repository[record.style_id].skus[record.size]= record.quantity;
                }
            })
            Object.keys(repository).forEach( key =>
                {
                    repository[key].photos = Object.values(repository[key].photos);
                }
            )
        }
        return repository;
    })
    .then(collection => {returnObj.results = Object.values(collection); return returnObj})
    .then(output => res.send(output))
   
})

//  /products/:product_id/related
// returns a list of related products as numbers in an array with format:
// [ NUMBER, NUMBER, NUMBER, NUMBER ]
router.get('/:product_id/related', (req,res)=>{
    console.log("Request for Related Products on Product #"+req.params.product_id);
    let query = 'SELECT related_product_id FROM related WHERE current_product_id=$1;';
    let params = [req.params.product_id];

    pool
    .query(query, params)
    .then(reply => res.send(reply.rows.map(item=>item.related_product_id)));
})

module.exports = router;
var express = require('express');
var router = express.Router();
var api_pro = require('../../controller/api/product.api.ctrl');

//GET: /api/products
router.get('/',api_pro.getProducts);

// //GET: /api/products/:id
router.get('/:id',api_pro.getProduct);

// //POST: /api/products
router.post('/',api_pro.postProduct);

// //PUT: /api/products/:id
router.put('/:id',api_pro.putProduct);

// //DELETE: /api/products/:id
router.delete('/:id',api_pro.deleteProduct);
module.exports = router;

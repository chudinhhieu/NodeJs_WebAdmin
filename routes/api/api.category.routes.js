var express = require('express');
var router = express.Router();
var api_cate = require('../../controller/api/category.api.ctrl');

//GET: /api/categories
router.get('/',api_cate.getCategories);

//GET: /api/categories/:id
router.get('/:id',api_cate.getCategory);

//POST: /api/categories
router.post('/',api_cate.postCategories);

//PUT: /api/categories/:id
router.put('/:id',api_cate.putCategories);

//DELETE: /api/categories/:id
router.delete('/:id',api_cate.deleteCategories);
module.exports = router;

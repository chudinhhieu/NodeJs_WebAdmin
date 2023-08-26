var express = require('express');
var router = express.Router();
var multer = require('multer');
var objUpload =multer({dest:'./tmp'});

//Đường dẫn tới categories.controller.js 
var categoryCtrl = require('../controller/category.controller');
var middleware = require('../middleware/middleware');

router.use(middleware.checkLogin);
//Vào trang categories theo địa chỉ '/categories/'
//Lấy ra danh sách
router.get('/',categoryCtrl.listCategories);
//Thêm
router.post('/add',objUpload.single('image'),middleware.validateCategoy,categoryCtrl.addCategories);
//Sửa
router.post('/edit/:id_c',objUpload.single('image'),middleware.validateCategory,categoryCtrl.editCategories);
//Xóa
router.post('/delete/:id_c',categoryCtrl.deleteCategories);

module.exports = router;

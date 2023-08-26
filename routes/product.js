var express = require('express');
var router = express.Router();
var multer = require('multer');
var objUpload =multer({dest:'./tmp'});

//Đường dẫn tới products.controller.js 
var productCtrl = require('../controller/product.controller');
var middleware = require('../middleware/middleware');
router.use(middleware.checkLogin);

//Vào trang product theo địa chỉ '/products/'
router.get('/',productCtrl.listProducts);
//Chi tiết
router.get('/view/:id_p',productCtrl.viewProducts);
//Thêm
router.post('/add',objUpload.single('image'),middleware.validateProduct,productCtrl.addProduct);
//Sửa
router.post('/edit/:id_p',objUpload.single('image'),middleware.validateProduct,productCtrl.editProduct);
//Xóa
router.post('/delete/:id_p',productCtrl.deleteProduct);

module.exports = router;

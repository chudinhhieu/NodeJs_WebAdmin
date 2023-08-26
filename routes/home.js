var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var homeCtrl = require('../controller/home.controller');
var middleware = require('../middleware/middleware');

// Sử dụng middleware "check_login.yeu_cau_login" cho tất cả các tuyến router trong tệp này

// Vào trang home theo địa chỉ '/'
router.get('/',middleware.checkLogin,homeCtrl.home);

// Xuất router
module.exports = router;

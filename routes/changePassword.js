var express = require('express');
var router = express.Router();

//Đường dẫn tới changePassword.controller.js 
var changePasswordCtrl = require('../controller/changePassword.controller');
var middleware = require('../middleware/middleware');
router.use(middleware.checkLogin);
//Vào trang changePassword theo địa chỉ '/changePassword/'
router.get('/',changePasswordCtrl.changePassword);

module.exports = router;

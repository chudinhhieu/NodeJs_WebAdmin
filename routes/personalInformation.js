var express = require('express');
var router = express.Router();

//Đường dẫn tới personalinformation.controller.js 
var personalinformationCtrl = require('../controller/personalInformation.controller');
var middleware = require('../middleware/middleware');
router.use(middleware.checkLogin);
//Vào trang personalinformation theo địa chỉ '/personalinformation/'
router.get('/',personalinformationCtrl.personalInformation);

module.exports = router;

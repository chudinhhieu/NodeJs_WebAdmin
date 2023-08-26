var express = require('express');
var router = express.Router();

//Đường dẫn tới login.controller.js 
var loginCtrl = require('../controller/login.controller')

//Vào trang login theo địa chỉ '/'
router.get('/',loginCtrl.login); 

router.post('/' ,loginCtrl.checkLogin);
//Xuất router
module.exports = router;

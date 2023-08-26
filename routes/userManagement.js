var express = require('express');
var router = express.Router();

//Đường dẫn tới userManagement.controller.js 
var userManagementCtrl = require('../controller/userManagement.controller');
var middleware = require('../middleware/middleware');
router.use(middleware.checkLogin);

router.get('/',userManagementCtrl.listUser);

router.get('/view/:id_u',userManagementCtrl.viewUser);

router.post('/add',middleware.validateUser,userManagementCtrl.addUser);

router.post('/edit/:id_u',middleware.validateUser,userManagementCtrl.editUser);

router.post('/delete/:id_u',userManagementCtrl.deleteUser);

module.exports = router;

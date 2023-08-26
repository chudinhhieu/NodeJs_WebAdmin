var express = require('express');
var router = express.Router();
var api_user = require('../../controller/api/user.api.ctrl');
const fileUpload = require('express-fileupload');

// Middleware để xử lý tệp tải lên
router.use(fileUpload());

// PUT: /api/user/change-avatar/:id
router.put('/change-avatar/:id', api_user.putAvatar);
// //GET: /api/user/:id
router.get('/:id',api_user.getUser);
// //GET: /api/user
router.get('/',api_user.getUsers);
// //POST: /api/user
router.post('/',api_user.postUser);

// //PUT: /api/user/change-password/:id
router.put('/change-password/:id',api_user.putPassWord);

module.exports = router;

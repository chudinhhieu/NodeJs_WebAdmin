var md = require("../model/user.model");


exports.login = (req,res,next)=>{
    res.render('login/login',{title: "Login"});
}
exports.checkLogin = async (req, res, next) => {
    let msg = '';
        try {
            let objU = await md.userModel.findOne({ username: req.body.username });
            console.log(objU);
            if (objU != null) {

                // tồn tại username ==> kiểm tra passwd
                if (objU.password == req.body.password && objU.role == "admin") {
                    // đúng thông tin tài khoản ==> lưu vào session
                    req.session.userLogin = objU;
                    // chuyển trang về trang quản trị
                    return res.redirect('/');
                } else {
                    msg = 'Sai password';
                }


            } else {
                msg = 'Không tồn tại tài khoản: ' + req.body.username;
            }


        } catch (error) {
            msg = error.message;
        }
}

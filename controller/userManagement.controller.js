var md = require("../model/user.model");

exports.listUser = async (req, res, next) => {
    let msg = '';
    let list = null;
    try {
        list = await md.userModel.find();
        msg = 'Lấy dữ liệu thành công !'
    } catch (error) {
        console.log(error);
    }
    res.render('userManagement/list', { title: "User management", listUser: list, msg: msg, message: req.flash('successMessage') });
}

//Create
exports.addUser = async (req, res, next) => {
    let msg = '';
    if (req.method == "POST") {
        try {
            let objU = new md.userModel();
            objU.fullname = req.body.fullname;
            objU.username = req.body.username;
            objU.email = req.body.email;
            objU.password = req.body.password;
            objU.avatar = 'avatar_default.png';
            await objU.save();
            msg = 'Đăng ký thành công!'
            req.flash('successMessage', 'Add successful!');
            res.redirect("/user-management");
        } catch (error) {
            msg = 'Lỗi: ' + error.message;
        }
    }
};

exports.editUser = async (req, res, next) => {
    let msg = '';
    try {
        let id_u = req.params.id_u;

        if (req.method == "POST") {
            let obju = {};
            obju.username = req.body.username;
            obju.password = req.body.password;
            obju.fullname = req.body.fullname;
            obju.email = req.body.email;
            await md.userModel.findByIdAndUpdate(id_u, obju);
            msg = "Cập nhập thành công!"
            req.flash('successMessage', 'Edit successful!');
            res.redirect('/user-management');
        }
    } catch (error) {
        msg = "Lỗi: " + error.message;
    }
}
//Delete
exports.deleteUser = async (req, res, next) => {
    let msg = '';
    let id_u = req.params.id_u;
    if (req.method == "POST") {
        try {
            await md.userModel.findByIdAndDelete(id_u);
            req.flash('successMessage', 'Delete successful!');
            res.redirect('/user-management')
        } catch (error) {
            msg = "Lỗi: " + error.message;
        }
    }
};
exports.viewUser = async (req, res, next) => {
    let msg = '';
    let id_u = req.params.id_u;
    let objU = null;
    try {
        objU = await md.userModel.findById(id_u);
        msg = "Lấy dữ liệu thành công";
    } catch (error) {
        msg = "Lỗi :" + error.message;
    }
    res.render('userManagement/view', { title: "Details user", user: objU, msg: msg });

}

exports.Login = async (req, res, next) => {
    let msg = '';
    if (req.method == 'POST') {
        try {
            let objU = await md.userModel.findOne({ username: req.body.username });
            console.log(objU);
            if (objU != null) {
                // tồn tại username ==> kiểm tra passwd
                if (objU.password == req.body.password) {
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
    res.render('login/login',{title: "Login"})
}

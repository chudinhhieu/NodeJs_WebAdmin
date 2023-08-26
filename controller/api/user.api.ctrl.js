var md = require('../../model/user.model');
const fs = require('fs');
const path = require('path');

exports.putAvatar = async (req, res) => {
    const userId = req.params.id;
    try {
        if (req.files && req.files.avatar) {
            const avatar = req.files.avatar;

            const uploadDir = path.join(__dirname, '../../public/avatar');
            fs.mkdirSync(uploadDir, { recursive: true });

            const newFileName = `avatar_${avatar.md5}${path.extname(avatar.name)}`;
            const newPath = path.join(uploadDir, newFileName);
            avatar.mv(newPath, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Failed to upload avatar' });
                }
                await md.userModel.findByIdAndUpdate(userId, { avatar: newFileName });
                return res.json({ success: true, avatar: newFileName });
            });
        } else {
            return res.status(400).json({ error: 'No avatar file uploaded' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getUsers = async (req, res, next) => {
    let data = {
        msg: '',
        status: 0,
        list: []
    };
    try {
        data.list = await md.userModel.find();
        data.msg = "Lấy dữ liệu thành công !";
        data.status = 1;
    } catch (error) {
        console.log(error);
        data.msg = error.message;
    }
    res.json(data);
}
exports.getUser = async (req, res, next) => {
    const id = req.params.id; // Assuming the id is passed as a parameter in the request

    let data = {
        msg: '',
        status: 0,
        user: null
    };
    try {
        data.user = await md.userModel.findById(id);
        if (data.user) {
            data.msg = "Lấy dữ liệu thành công !";
            data.status = 1;
        } else {
            data.msg = "Không tìm thấy user với id đã cho.";
        }
    } catch (error) {
        console.log(error);
        data.msg = error.message;
    }
    res.json(data);
}


exports.postUser = async (req, res, next) => {
    let data = {
        msg: '',
        status: 0,
        user: {}
    }

    try {
        let objU = new md.userModel();
        objU.fullname = req.body.fullname;
        objU.username = req.body.username;
        objU.email = req.body.email;
        objU.password = req.body.password;
        objU.avatar = 'avatar_default.png';
        data.user = await objU.save();
        data.msg = 'Đăng ký thành công!';
        data.status = 1;
    } catch (error) {
        msg = 'Lỗi: ' + error.message;
    }
    return res.json(data);
};

exports.putPassWord = async (req, res, next) => {
    let data = {
        msg: '',
        status: 0,
        user: {}
    };

    try {
        let id = req.params.id;
        let dieuKien = { _id: id };

        let password = req.body.password;

        let obj_U = {};
        obj_U.password = password;

        await md.userModel.findByIdAndUpdate(id, obj_U);
        data.msg = "Cập nhật thành công";
        data.status = 1;

        data.user = await md.userModel.findById(dieuKien);
    } catch (error) {
        data.msg = error.message;
    }
    return res.json(data);
}






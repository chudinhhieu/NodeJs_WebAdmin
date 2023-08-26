var md = require('../../model/category.model');

exports.getCategories = async (req, res, next) => {
    let data = {
        msg: '',
        status: 0,
        list: []
    };
    try {
        data.list = await md.categoryModel.find();
        data.msg = "Lấy dữ liệu thành công !";
        data.status = 1;
    } catch (error) {
        console.log(error);
        data.msg = error.message;
    }
    res.json(data);
}

exports.getCategory = async (req, res, next) => {
    const categoryId = req.params.id; // Assuming the id is passed as a parameter in the request
    
    let data = {
        msg: '',
        status: 0,
        category: null
    };
    try {
        data.category = await md.categoryModel.findById(categoryId);
        if (data.category) {
            data.msg = "Lấy dữ liệu thành công !";
            data.status = 1;
        } else {
            data.msg = "Không tìm thấy danh mục với id đã cho.";
        }
    } catch (error) {
        console.log(error);
        data.msg = error.message;
    }
    res.json(data);
}


exports.postCategories = async (req, res, next) => {
    let data = {
        msg: '',
        status: 0,
        category: {}
    }

    //Validate
    if (req.body.name.length < 5) {
        data.msg = 'Username phải nhập ít nhất 5 ký tự!';
        return res.json(data);

    }

    try {
        let objC = new md.categoryModel();
        objC.name = req.body.name;
        objC.image = req.body.image;
        data.category = await objC.save();
        data.msg = 'Đăng ký thành công!';
        data.status = 1;
    } catch (error) {
        msg = 'Lỗi: ' + error.message;
    }
    return res.json(data);
};

exports.putCategories = async (req, res, next) => {
    let data = {
        msg: '',
        status: 0,
        category: {}
    };

    try {
        let id = req.params.id;
        let dieuKien = { _id: id };

        let name = req.body.name;
        let image = req.body.image;
        let validate = true;

        //Validate
        if (req.body.name.length < 5) {
            data.msg = 'Username phải nhập ít nhất 5 ký tự!';
            validate = false;
        }

        if (validate) {
            let obj_C = {};
            obj_C.name = name;
            obj_C.image = image;

            await md.categoryModel.findByIdAndUpdate(id, obj_C);
            data.msg = "Cập nhật thành công";
            data.status = 1;
        }
        data.category = await md.categoryModel.findById(dieuKien);
    } catch (error) {
        data.msg = error.message;
    }
    return res.json(data);
}

exports.deleteCategories = async (req,res,next)=>{
    let data ={
        msg: '',
        status: 0,
        category: {}
    };

    let id = req.params.id;

    try {
        await md.categoryModel.findByIdAndDelete(id);
        data.msg ="Đã xóa thành công!";
        data.status = 1;
    } catch (error) {
        data.msg = error.message;
    }
    res.json(data);
}


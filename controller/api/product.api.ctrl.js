var md = require('../../model/product.model');

exports.getProducts = async (req, res, next) => {
    let data = {
        msg: '',
        status: 0,
        list: []
    };
    try {
        data.list = await md.productModel.find();
        data.msg = "Lấy dữ liệu thành công !";
        data.status = 1;
    } catch (error) {
        console.log(error);
        data.msg = error.message;
    }
    res.json(data);
}

exports.getProduct = async (req, res, next) => {
    const id = req.params.id;

    let data = {
        msg: '',
        status: 0,
        product: null
    };
    try {
        data.product = await md.productModel.findById(id);
        if (data.product) {
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

exports.postProduct = async (req, res, next) => {
    let data = {
        msg: '',
        status: 0,
        product: {}
    }

    //Validate
    if (req.body.name.length < 5) {
        data.msg = 'Name phải nhập ít nhất 5 ký tự!';
        return res.json(data);

    }

    try {
        let objP = new md.productModel();
        objP.name = req.body.name;
        objP.price = req.body.price;
        objP.description = req.body.description;
        objP.id_product = req.body.id_product;
        objP.image = req.body.image;
        data.product = await objP.save();
        data.msg = 'Đăng ký thành công!';
        data.status = 1;
    } catch (error) {
        msg = 'Lỗi: ' + error.message;
    }
    return res.json(data);
};

exports.putProduct = async (req, res, next) => {
    let data = {
        msg: '',
        status: 0,
        product: {}
    };

    try {
        let id = req.params.id;
        let dieuKien = { _id: id };

        let name = req.body.name;
        let image = req.body.image;
        let price = req.body.price;
        let description = req.body.description;
        let id_category = req.body.id_category;
        let validate = true;

        //Validate
        if (req.body.name.length < 5) {
            data.msg = 'Name phải nhập ít nhất 5 ký tự!';
            validate = false;
        }

        if (validate) {
            let objP = {}   ;
            objP.name = name;
            objP.price = price;
            objP.description = description;
            objP.id_category = id_category;
            objP.image = image;

            await md.productModel.findByIdAndUpdate(id, objP);
            data.msg = "Cập nhật thành công";
            data.status = 1;
        }
        data.product = await md.productModel.findById(dieuKien);
    } catch (error) {
        data.msg = error.message;
    }
    return res.json(data);
}

exports.deleteProduct = async (req,res,next)=>{
    let data ={
        msg: '',
        status: 0,
        product: {}
    };

    let id = req.params.id;

    try {
        await md.productModel.findByIdAndDelete(id);
        data.msg ="Đã xóa thành công!";
        data.status = 1;
    } catch (error) {
        data.msg = error.message;
    }
    res.json(data);
}
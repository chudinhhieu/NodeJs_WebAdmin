var md = require("../model/product.model");
var fs = require('fs');
var fsd = require('fs').promises;

//Read
exports.listProducts = async (req, res, next) => {
    let msg = '';
    let list = null;
    let categories = null;
    try {
        categories = await md.cateModel.find();
        list = await md.productModel.find();
    } catch (error) {
        console.log(error);
    }
    res.render('product/list', { title: "Products", listProduct: list, msg: msg, categories: categories,message: req.flash('successMessage') });
}

//Create
exports.addProduct = async (req, res, next) => {
    let msg = '';
    if (req.method == "POST") {
        try {
            fs.rename(req.file.path, './public/uploads/' + req.file.originalname, async (err) => {
                if (err) throw err;

            let objP = new md.productModel();
            objP.name = req.body.name;
            objP.id_category = req.body.cateId;
            objP.description = req.body.description;
            objP.price = req.body.price;
            objP.image = req.file.originalname;
            await objP.save();
            req.flash('successMessage', 'Add successful!');
            res.redirect("/products");
        });

        } catch (error) {
            msg = 'Lỗi: ' + error.message;
        }
    }
};

//Edit
exports.editProduct = async (req, res, next) => {
    let msg = '';
    try {
        let id_p = req.params.id_p;
        fs.rename(req.file.path, './public/uploads/' + req.file.originalname, async (err) => {

        if (req.method == "POST") {
            let objp = {};
            objp.name = req.body.name;
            objp.id_category = req.body.cateId;
            objp.description = req.body.description;
            objp.price = req.body.price;
            objp.image = req.file.originalname;
            await md.productModel.findByIdAndUpdate(id_p, objp);
            req.flash('successMessage', 'Edit successful!');
            res.redirect('/products');
        }
    });
    } catch (error) {
        msg = "Lỗi: " + error.message;
    }
}

//Delete
exports.deleteProduct = async (req, res, next) => {
    let msg = '';
    let id_p = req.params.id_p;
    if (req.method == "POST") {
        try {
            await md.productModel.findByIdAndDelete(id_p);
            req.flash('successMessage', 'Delete successful!');
            res.redirect('/products')
        } catch (error) {
            msg = "Lỗi: " + error.message;
        }
    }
};
// 
exports.viewProducts = async(req,res,next)=>{
    let msg ='';
    let id_p = req.params.id_p;
    let objp = null;
    let categories = null;
    try {
        categories = await md.cateModel.find();
        objp = await md.productModel.findById(id_p);
        msg ="Lấy dữ liệu thành công";
    } catch (error) {
        msg ="Lỗi :" + error.message;
    }
    res.render('product/view', { title: "Details product", product: objp, msg: msg, categories: categories });

}
var md = require("../model/category.model");
var fs = require('fs');
var fsd = require('fs').promises;

//Read
exports.listCategories = async (req, res, next) => {
    let list = [{ _id: '', name: '', image: '' }];
    try {
        list = await md.categoryModel.find();
    } catch (error) {
        console.log(error);
    }
    res.render('category/list', { title: "Categories", listCategory: list, message: req.flash('successMessage')});
}
//Create
exports.addCategories = async (req, res, next) => {
    let msg = '';
    try {
        fs.rename(req.file.path, './public/uploads/' + req.file.originalname, async (err) => {
            if (err) throw err;
            let objC = new md.categoryModel();
            objC.name = req.body.name;
            objC.image = req.file.originalname;
            await objC.save();
            req.flash('successMessage', 'Add successful!');
            res.redirect('/categories');
        });
    } catch (error) {
        msg = 'Lỗi: ' + error.message;
    }
};
//Edit
exports.editCategories = async (req, res, next) => {
    let msg = '';
    try {
        let id_c = req.params.id_c;
        fs.rename(req.file.path, './public/uploads/' + req.file.originalname, async (err) => {
            let objc = {};
            objc.name = req.body.name;
            objc.image = req.file.originalname;
            const category = await md.categoryModel.findById(id_c);
            if (category && category.image) {
                await fsd.unlink('./public/uploads/' + category.image);
            }

            await md.categoryModel.findByIdAndUpdate(id_c, objc);
            req.flash('successMessage', 'Edit successful!');
            res.redirect('/categories');
        });
    } catch (error) {
        msg = "Lỗi: " + error.message;
    }
};

//Delete
exports.deleteCategories = async (req, res, next) => {
    let msg = '';
    let id_c = req.params.id_c;
    if (req.method == "POST") {
        try {
            const category = await md.categoryModel.findById(id_c);
            if (category && category.image) {
                await fsd.unlink('./public/uploads/' + category.image);
            }
            await md.categoryModel.findByIdAndDelete(id_c);
            req.flash('successMessage', 'Delete successful!');
            res.redirect('/categories')
        } catch (error) {
            msg = "Lỗi: " + error.message;
        }
    }
};

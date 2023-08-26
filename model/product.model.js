const db = require('./db');


const productSchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        id_category: { type: db.mongoose.Schema.Types.ObjectId,ref: 'categoryModel'},
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true }
    },
    { collection: 'tb_products' }
);

let productModel = db.mongoose.model("productModel", productSchema);

const cateSchema = db.mongoose.Schema(
    {
        name: { type: String, require: true },
    },
    { collection: "tb_categories" }
);

let cateModel = db.mongoose.model("cateModel", cateSchema);

module.exports = { productModel, cateModel };

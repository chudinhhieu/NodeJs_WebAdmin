var db = require('./db');


var categorySchema = new db.mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String,required: true}
    },
    {
        collection: 'tb_categories'
    },

);

let categoryModel = db.mongoose.model("categoryModel", categorySchema);

module.exports = { categoryModel };

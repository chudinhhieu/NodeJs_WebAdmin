const db = require('./db');


const userSchema = new db.mongoose.Schema(
    {
        fullname: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true},
        email: { type: String, required: true },
        avatar: { type: String, required: true },
        role: {type: String,enum: ['admin', 'user'], default: 'user',},
    },
    { collection: 'tb_users' }
);

let userModel = db.mongoose.model("userModel", userSchema);


module.exports = {userModel};

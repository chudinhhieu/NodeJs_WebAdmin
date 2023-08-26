
exports.checkLogin = (req, res, next) => {
     
    if (req.session.userLogin) {
        next();
    } else {
        return res.redirect('/login');
    }
}


exports.validateCategory = async (req, res, next) => {
    const name = req.body.name;
    if (!name || name.trim() === '' || !req.file || req.file.path === undefined) {
        return;
    } else if (name.length < 4) {
        return;
    } else if (isNaN(parseInt(price))) { 
        return;
    } else {
        next();
    }
};
exports.validateProduct = async (req, res, next) => {
    const name = req.body.name;
    const cateId = req.body.cateId;
    const description = req.body.description;
    const price = req.body.price;

    if (!name || name.trim() === '' ||
        !cateId || cateId.trim() === '' ||
        !description || description.trim() === '' ||
        !price || price.trim() === '' ||
        !req.file || req.file.path === undefined )
    {
        return;
    } else if (name.length < 4 || description.length <10 || description.length > 200 ) {
        return;
    } else {
        next();
    }
};

exports.validateUser = async (req, res, next) => {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!fullname || fullname.trim() === '' ||
        !username || username.trim() === '' ||
        !email || email.trim() === '' ||
        !password || password.trim() === '') 
    {
        return;
    } else if (fullname.length < 4 || username.length <4 || username.length > 20 ||password.length <4 || password.length > 20 ) {
        return;
    } else {
        next();
    }
};



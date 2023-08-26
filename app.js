var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');

var homeRouter = require('./routes/home');
var loginRouter = require('./routes/login');
var categoryRouter = require('./routes/category');
var productRouter = require('./routes/product');
var userManagementRouter = require('./routes/userManagement');
var personalInformationRouter = require('./routes/personalInformation');
var changePasswordRouter = require('./routes/changePassword');

//api
var apiCate = require('./routes/api/api.category.routes');
var apiPro = require('./routes/api/api.product.routes');
var apiUser = require('./routes/api/api.user.routers');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'chudinhhieu2711', // chuỗi ký tự đặc biệt để Session mã hóa, tự viết
  resave:true,
  saveUninitialized:true
  }));
app.use(flash());

app.use('/', homeRouter);
app.use('/categories',categoryRouter);
app.use('/products',productRouter);
app.use('/user-management',userManagementRouter);
app.use('/personal-information',personalInformationRouter);
app.use('/change-password',changePasswordRouter);
app.use('/login',loginRouter);

//api
app.use('/api/categories',apiCate);
app.use('/api/products',apiPro);
app.use('/api/user',apiUser);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

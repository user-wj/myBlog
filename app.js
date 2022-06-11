var createError = require('http-errors');
var express = require('express');
var path = require('path'); // 路径模块
var cookieParser = require('cookie-parser'); // 处理cookie  req.cookies  res.cookie()
var logger = require('morgan');// 日志
var fs = require("fs");
/* 
  var router = express.Router();
  router.get("/index",function(){ ... })
  exports router 将这个路由对象进行分发给 app.use("/vedio",router) => /vedio/index执行的是 function(){  } 这个函数
*/
var indexRouter = require('./routes/index'); // 根路由
var usersRouter = require('./routes/users'); // 用户路由
var userArticles = require("./routes/articles")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 设置视图目录 [当前项目下的 views 目录]
app.set('view engine', 'ejs');                   // 设置视图引擎  为 html 的后缀名
app.engine("html",require("ejs").__express);     // ejs引擎认识 html的后缀名文件

// 没有处理 favicon 的处理

// 日志中间件
app.use(logger('dev'));
// express 的 json() 中间件   处理请求体的
app.use(express.json());
// 解析post form 请求的编码格式的  处理请求体的
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());// req.cokies res.cookie() 函数
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件目录 [css,js] 

// 路由的分发
app.use('/', indexRouter);
// 用户注册 登录
app.use('/users', usersRouter);
// 用户 增加文章页面 
app.use("/articles", userArticles);
// 这里还需要处理 /favicon.ico 的请求


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  // 这里这个错误的话还可以这样写
  var err = new Error("not Found");
  err.status = 404;
  // next(value)里面有值的执行下一个错误中间件 app.use(function(err,req,res,next) =>{}) 这样的中间件
  next(err);
});

// error handler 四个参数的中间件是错误处理中间件
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // 渲染模板的名字 views 目录下面的 error.html  文件
  res.render('error');
});

module.exports = app;

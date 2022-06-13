var createError = require('http-errors');
var express = require('express');
var path = require('path'); // 路径模块
var cookieParser = require('cookie-parser'); // 处理cookie  req.cookies  res.cookie()
var logger = require('morgan');// 日志
var session = require("express-session");
var MongoStore = require("connect-mongo");
var fs = require("fs");
var flash = require("connect-flash")
/* 
  var router = express.Router();
  router.get("/index",function(){ ... })
  exports router 将这个路由对象进行分发给 app.use("/vedio",router) => /vedio/index执行的是 function(){  } 这个函数
*/
var indexRouter = require('./routes/index'); // 根路由
var usersRouter = require('./routes/users'); // 用户路由
var userArticles = require("./routes/articles")

var whiteUrl = require("./middleware/urlControl");


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
// session 的
app.use(cookieParser());// req.cokies res.cookie() 函数
app.use(session({
  // session 是依赖 cookie 的所以的话  需要放在 cookieparse 的下面
  resave:true,
  secret: 'wjblog',
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/blog' }),
  saveUninitialized:true,
}));
/* 
  req.flash()
  这个中间件一定要在连接 connect-mongo 中间件下使用 因为他也是要存储到数据库里面
*/
app.use(flash()); 


app.use(express.static(path.join(__dirname, 'public'))); // 静态文件目录 [css,js] 

app.use(whiteUrl());

// 通过 session 控制页面展示内容  
app.use(function(req,res,next){
  // 可能为 undefined => 在render 的时候会自动找 locals 对象 => res.locals = {user:xx,key:xx}
  // render(view.html",{}=res.locals{})  本次请求到来的一系列的对象
  // res.locals.user = req.session["user"];
  // => flash => sessionId 是一样的 <={"xxx":[val1,val2]} 每一次取值 里面设置的值就会从数据库里面删除
  res.locals.user = req.session["user"];
  // res.locals.success = req.session["success"];  => flash 是去到空数组 []=> ""||false
  res.locals.error = req.flash("error").toString()||false;
  // console.log("res.locals.error:",res.locals.error.toString())
  // res.locals.error = req.session["error"];
  res.locals.success = req.flash("success").toString() ||false;
  // console.log("res.locals.success:", res.locals.success)
  // console.log("req.path",req.path)
  next();
});



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

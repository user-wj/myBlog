var express = require('express');

var router = express.Router();

var { userModel, articleModel } = require("../db/index.js");

var util = require("../utils/util.js");
/* GET users listing. */
/* 路由的分发 路由里面样式可以使用中间件函数*/
router.use(function(req,res,next){
  console.log("router middleware ");
  next();
})

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// => get:users/reg
router.get("/reg",function(req,res,next){
  // 返回的视图模板
  res.render("user/reg.html",{title:"注册页面"})
})

// => post:user/reg  => 提交注册的数据 -> 这里判断的方式是 方式和路径一致才会触发对应的函数
router.post("/reg",function(req,res,next){
  /* 
  [Object: null prototype] {
                              username: '',
                              password: '',
                              re_password: '',
                              email: ''
                            }
  */
  //  用户提交数据的逻辑
  console.log(req.body);
  /* 
    表单处理: body-parse.json() => x-www-form-urlencoded => request body 
  */
  var user = req.body;
  if(user["password"] != user["re_password"]){
    // 跳转其他的一面
    var errMsg = "两次密码不一样";
    // session => cookie 
    // req.session.error="两次密码不一致"
    req.flash("error", "两次密码不一样")
    res.redirect("back");
    return ;
  };
  // 删除确认密码
  delete user["re_password"];
  // 密码进行加密 为 base64 的 
  user["password"] = util.md5(user["password"]);
  /* 
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    avatar:{type:String,required:true}
  */
  // 需要数据里面差一个头像 使用头像生成网站
  user["avatar"] = "https://gravatar.zeruns.tech/avatar/"+util.md5(user["email"])+"?s=48"

  // 往 collection 里面添加数据   // 数据库进行保存
  userModel.create([user],function(err,info){
    if(err){
      console.log(err);
      // req.session.error = "注册失败";
      req.flash("error", "注册失败")
      res.redirect("back");// 出现错误的话返回上一个页面
    }else{
      // 注册成功回到首页
      req.session.user = info; 
      // 注册成功返回一个 session  从数据库里面取出值就从数据库中删除该值
      req.flash("success", "注册成功!");
      req.flash("success","欢迎回来!");
      // req.session.success = "注册成功!"
      res.redirect("/")
    }
  })
}) 


// => get:users/login 
router.get("/login",function(req,res,next){
  res.render("user/login.html",{title:"这是登录的页面"});
  // 这里的话是要去操作数据库mongdb的 
})

// => poost:users/login 
router.post("/login",function(req,res,next){
  // 用户提交登录的信息
  // 拿到数据
  var user = req.body;
  /* 
    [Object: null prototype] { username: 'wj', password: '123' }
  */
  console.log(user);
  // 去数据库里面查询数据 如果查询到了的话 设置上 session.user = find() => 这里的密码是进行了 md5 加密的
  user["password"] = util.md5(user["password"]);
  userModel.findOne({username:user["username"],password:user["password"]}).exec(function(err,data){
    // console.log("sgfgfg:",err);
    // console.log("sgfgfg",data);
    /* 
    {
      _id: new ObjectId("62a6978ea9793cd7c0b8e012"),
      username: 'wj',
      password: '202cb962ac59075b964b07152d234b70',
      email: '123@qq.com',
      avatar: 'https://sdn.geekzu.org/avatar/487f87505f619bf9ea08f26bb34f8118?s=48',
      __v: 0
    }
    */
    if(data.length === 0){
      req.flash("error","用户名或者密码错误!");
      res.redirect("back");
    }else{
      req.session["user"] = data;
      req.flash("success","登录成功!");
      req.flash("success","欢迎光临!");
      res.redirect("/");
    }
  })
  return;
})

// => users/logout 
router.get("/logout",function(req,res,next){
  // res.send("这是退出的路由!");
  // session.user  滞空 session 
  req.session.user = null ; // => session=>{key:val,key:val}=>修改服务器端session  sessionId:xxxfff000
  res.redirect("/");
})

module.exports = router;

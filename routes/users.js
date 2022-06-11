var express = require('express');

var router = express.Router();

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
  //  用户提交数据的逻辑
  res.send("用户提交注册数据的逻辑")
}) 


// => get:users/login 
router.get("/login",function(req,res,next){
  res.render("user/login.html",{title:"这是登录的页面"})
})

// => poost:users/login 
router.post("/login",function(req,res,next){
  // 用户提交登录的信息
  res.send("用户提交登录数据的逻辑");
})


// => users/logout 
router.get("/logout",function(req,res,next){
  res.send("这是退出的路由!");
})



module.exports = router;

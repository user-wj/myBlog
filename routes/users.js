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

router.get("/hello",function(req,res,next){
  res.send("hello");
})


module.exports = router;

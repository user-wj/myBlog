var express = require("express");
var router = express.Router()

// 获取增加文章页面
// get:articles/add
router.get("/add",function(req,res,next){
    res.render("article/add.html",{title:"这是增加文章的页面!"})
})

// post:articles/add
router.post("/add",function(req,res,next){
    res.send("这是增加文章提交数据请求逻辑")
})

// 没有导出的获取的事一个空对象
module.exports = router;
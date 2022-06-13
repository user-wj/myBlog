var express = require('express');
var router = express.Router();
var { userModel, articleModel } = require("../db/index.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  // 返回文章列表 先对选项进行配置在执行回调函数 更加符合 mongo 的指令 会自动把关联的 id 转换为对象 进行合并输出
  // populate() 迁移数据user   到当前数据里面 自动的关联对应 id＝user对象
  articleModel.find({}).populate("user").exec(function(err,articles){
    // 看到全部博客文章
    console.log(articles);

    res.render("../views/index.ejs",{title:"欢迎光临我的博客!",articles:articles})
  });
  return;
});


module.exports = router;


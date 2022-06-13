var express = require("express");
var router = express.Router()
var multer = require("multer");
var path = require("path");
// 局部中间件 
const storage = multer.diskStorage({
    // 配置文件要保存的目录
    destination: function (req, file, cb) {
        cb(null, "./public/images/");// 文件夹一定要加上后缀名  这里的格式是固定死的 ./ 是从当期的根目录下面
    },
    // 配置保存时的文件名 时间 + 源文件的扩展名   
    filename: function (req, file, cb) {
        // file 对象里面保存了很大的关于文件的信息
        console.log("file:",file);
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix)
    }
})
const upload = multer({ storage: storage })

// app.poet("/img", upload.signal("img|提交的文件名"), function (req, res, next) {
//     req.file => ...
// })

var { userModel, articleModel } = require("../db/index.js");
// 获取增加文章页面
// get:articles/add
router.get("/add",function(req,res,next){
    res.render("article/add.html",{title:"添加文章!"})
})

// post:articles/add => uploade.single("文件名")
router.post("/add",upload.single("img"),function(req,res,next){
    // 对用户提交的数据进行处理 省略=>直接进行数据库的处理
    var article = req.body;
    var userId = req.session["user"]["_id"];
    // 看看改变后的上传的图片file长什么样?
    // console.log(req.file); // 这个 file　对象是改变之后的对象 => 文件名filename和路径path 都是新的路径
    article["user"] = userId;
    // 保存的是图片的路径  不上传文件的话是不会向req里面增加 file 对象
    // console.log("req.file:", req.file) => undefined.undefined 就会报错  这个逻辑一定要处理一下 
    req.file = req.file || {};
    article["img"] = req.file["filename"];
    // 存值是按照 err 进行判断取值是 按照data 进行判断
    articleModel.create([article],function(err,data){
        console.log("regErr:",err);
        console.log("regData:",data);
        if(err){
            req.flash("error","增加文章失败!");
            return res.redirect("back");
        }else{
            req.flash("success","增加文章成功!");
            return res.redirect("/");
        }
    })
})

/* 
    通过会话进而控制路由
*/
// 个人所有的 [用户号] 未登录是不允许查看  中间件决定的
router.get("/all/:userId",function(req,res,next){
    // 获取数据里面这个人所有的文章 user._id = 文章表里面的 user　相等多个查询
    var userId = req.params["userId"];
    console.log(userId)
    articleModel.find({user:userId}).exec(function(err,data){
        if(data.length !== 0){
            console.log("xxxxxxxxxxx:",data);
            res.render("./article/all.html",{title:"所有文章",articleList:data})
        }else{
            req.flash("error","当前作者内容被清空!");
            req.redirect("back");
        }
    })
})

// 个人单篇文章 [文章号] 未登录是不允许查看 中间件决定的
router.get("/single/:articleId",function(req,res,next){
    var articleId = req.params["articleId"];
    // 取文章
    articleModel.findById(articleId).exec(function(err,data){
        // 判断data  找不到的话 undefined  取值是用data 来判断的  取一个  {  } 取多个[ { } , { } ]
        console.log("asgdfsd:", data);
        if(data){
            // 把数据展示到页面上
            res.render("./article/single.html",{title:"文章",article:data});
        }else{
            req.flash("error","该文章已经被作者删除!");
            res.redirect("back");
        }
    })
    // res.send(req.params["articleId"])
    return;
})

// 没有导出的获取的事一个空对象
module.exports = router;
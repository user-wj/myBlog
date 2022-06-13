var settings = require("../settings");
var mongoose = require("mongoose");

mongoose.connect(settings.dbURL);

// 检测数据库链接
mongoose.connection.on("connect",function(err){
    if(!err){
        
    }
});


// 创建约束 
var user = new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    avatar:{type:String,required:true}
})
// 创建模型
var userModel = mongoose.model("user",user);

// 添加数据
/* 
    {
        username:xx,
        password:xx,
        email:xx,
    }
*/
// 到出的只要是模型就可以了

// 创建个人博客模型
var article = new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    createAt:{type:Date,required:true,default:new Date()},
    // 关联到个人的博客项目
    user:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    img:{type:String},
});

var articleModel = mongoose.model("article",article);



module.exports = {
    userModel: userModel,
    articleModel: articleModel,
}

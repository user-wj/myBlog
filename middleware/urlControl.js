module.exports =  function(){
    return function(req,res,next){
        // url 的控制 结合 sesion.user 来进行控制
        // 白名单放行
        // session.user 有值的话就是已经登录了
        if(req.session["user"]){
            switch(req.path){
                case "/users/login":
                case "/users/reg":
                    req.flash("success","你已经登录!");
                    res.redirect("/");
                    break;
                default:
                    next()
                    break;
            }
        }else{
            // 没有值的情况下还要判断 路径是否是 登录或者注册页 登录注册页面也是要放行的
            // 没有登录的情况下只有下面这三种情况才会放行
            whiteUrl = ["/users/login","/users/reg","/"]; 
            for(var i=0;i<whiteUrl.length;i++){
                if(req.path === whiteUrl[i]){
                    next();
                    return;
                }
            };
            req.flash("error","你还未登陆!")
            res.redirect("/");
        }
        
    }
}
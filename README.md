# 项目用到的技术
`
        用到技术:
            npm

            express 
            connect-mongo
            express-session
            connect-flash 
            multer  图片文件上传 
            sha1 

            ejs 
            jquery
            bootstrap 

            mongodb 
            mongoose 

            git
`


# 安装生成器

`npm install express-generator -g`

# 生成项目

`express -e myBlog`

# 项目初始化完成执行下面操作

`
    change directory:
     > cd myBlog

    install dependencies:
     > npm install

    run the app:
     > SET DEBUG=myblog:* & npm start
`

# 下次开启服务器

`npm start`

# 开器服务器走的文件

`myBlog/bin/www.js   里面有默认的端口 3000`

# 删除 github 创建项目 建立空项目
`github 上删除原来的项目 创建一个空项目 空项目就是一个仓库名其他什么也不选`

# 项目目录下创建.gitignore文件
`
    .gitignore
    node_modules
    lib
    .ideal
    .log

`

# 创建文件之后执行命令

`
在当前项目中打开 git bash 的命令
执行如下的步骤
git init
git add -A             所有的文件
git commit -m"1.initial project"          => git config --global user.email "自己的郵箱"
                                          => git config --global user.name "用戶名"
                                          去除全局的配置
                                          git config --global --unset [key] 就是刪除=value
                                          查看全局配置文件
                                          git config --global -l
                                          设置代理
                                          git config --global http.proxy  http://127.0.0.1:1080
                                          git config --global https.proxy  http://127.0.0.1:1080
                                          git config --global --unset http.proxy
                                          git config --global --unset https.proxy

git remote add origin https://github.com/user-wj/myBlog.git
                如何生成自己的token
                1、在个人设置页面，找到Setting（参考）

                2、选择开发者设置Developer setting

                3、选择个人访问令牌Personal access tokens，然后选中生成令牌Generate new token

                4、设置token的有效期，访问权限等  访问的权限一定要选中 repo 表示生成的token全部的权限都拥有

                选择要授予此令牌token的范围或权限。
                
                生成的token 需要複製下來 第二次你就看不見他了

                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[xx]
git branch -M main
git push -u origin main => 輸入用戶名 密碼
`

# 前端管理工具
`
    npm install bower -g
    在[当前的项目目录]下面执行: bower init | npm init -y
    npm install bootstrap --save -S生产依赖| -D开发依赖

    bower 命令是自动管理版本的工具
    
    1.bower init 
    2.添加 .bowerrc 文件 => { "directory":"./public/lib" }  把第三方项目依赖放在 public/lib 目录下面
`
# 不使用bower来创建项目
`
npm install bootstrap@4.6.1 --save
npm install jquery@3.5.1 --save
`
# 引入 css js 到public 下面的 stylesheets  和 javascripts 目录下面
`
    public->
            javascripts
                        -> jquery.js
            stylesheets 
                        -> bootstrap.css
`
# index.html 页面引入 css /stylesheets/bootsrap.css 

# bootstrap 
`
    进入bootstrap官网
    文档
    进入组建 => 找到导航条
`

# 通过bootstrap进行页面的布局
`
    主页
    登录
    注册
    发表文章
    退出
`

# 制作ico的图标
`
    https://www.bitbug.net/
`

# 图标加载到网站里面
`
    可以直接发到 public目录下面 但是文件名一定要 favicon.ico
`
# bootstarp依赖jquery
`
    在页面按照顺序引入一下文件:
            <!-- jquery -->
            <script type="text/javascript" charset="utf-8" src="/javascripts/jquery.js"></script>
            <!-- bootstrap  -->
            <script type="text/javascript" charset="utf-8" src="/javascripts/bootstrap.js"></script>
`

# 增加表单
`
    在注册登录页面增加表单
    bootstrap  找到组建 => 表单
`

# 在遇见不知道的模块或者是文档的API的接口改变记得看源码包的文档

# 实现权限的控制
`
    在 header 里面配合 session 进行关联
                ->  有 取值 取到的 req.session = sessionId
    sessionId
                ->  无 创建一session对象 => req.session={}   { sessionId:req.session=>{}  }  => 最后返回的是 sessionID=jdghggvc155gg 
    实现权限的控制是根据 session 的会话机制来实现的
`

# 全局变量都需要用到user变量使用中间件 
`
    中间件是有顺序的:=> cookie => session => app.use(function(req.session))
    使用中间件实现权限控制:
                        app.use(function(req,res,next){
                            req.user = req.session["user"];
                        })
`
# session 存储在mongodb里面
`
    在指定 db 下的 sessions[collection]里面
`
# connect-flash 中间件
`
    解决 sessions 在设置上就不销毁的问题=>因为session存储在服务器端数据库上 设置上了就永远存在
    npm install connect-flash --save
    app.use(flash()) => 就是向req注入一个方法 req.flash = function(){}
    这个flash方法可以在 connect-mongo 中间件下面在数据库中这样的存储
    req.session.flash = {"xxx":[val1,val2...]}
    每次从数据库里面取值之后，当前被取的值和会从数据库中删除
`

# 创建一个新的文章模型
`
    title
    content 
    data 
    user:=>关联到用户的模型 => 根据登录人来去 ObjectId 
`
# mongo的查询方法
`
    在没有出现错误的时候 在查找不到数据的情况下返回的是空 数组 data []
    取值是要对 data 进行判断 
`

# 首页界面的处理
`
    首页展示的是全部的文章内容
    展示的布局 bootstrap 里面 组建(components)media object  
    如果点击个人头像进入到个人中心的博客展示页面
    Model.findOne({}).exec(function(err,data)) => {}
    Model.find({}).exec(function(err,data))  => [{}...]
`

# 权限控制两种方法
`
    会话进行实现的是  登录权限的控制
    白名单是实现的是  路由权限的控制(直接在浏览器输入地址)
                    一种是已经登录过的: 登录了不让他访问 登录 注册 页面
                    一种是没有登录过的：只能访问 登录 注册 首页
`

# 图片文件的上传
`
    npm install multer --save      处理文件上传
    multer模块额度作用  => 中间件 图片上传到文件夹 => 增加一个 req.file 的对象 里面保存的文件对象信息
    修改form 表单格式为 enctype="multipart/form-data" 的格式
    这个中间件只是在 处理有图片上传的时候才会失生效
    不知道怎么使用 源码包 直接看文档 README.md 

    问题: multer 路径的问题 => 必须是 ./ 开头
`

# 文章单页的运用
`
    路由: /articles/single/:articleId 
    查询单个: data||doc={}||undefined    查询多个 data||doc = [{},{}...] || [  ]
    单篇文章页面
    bootstrap => [panel 画板]mspaint 
`
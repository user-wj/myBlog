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
git remote add origin https://github.com/user-wj/myBlog.git
                如何生成自己的token
                1、在个人设置页面，找到Setting（参考）

                2、选择开发者设置Developer setting

                3、选择个人访问令牌Personal access tokens，然后选中生成令牌Generate new token

                4、设置token的有效期，访问权限等

                选择要授予此令牌token的范围或权限。
                生成的token 需要複製下來 第二次你就看不見他了
                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
git branch -M main
git push -u origin main => 輸入用戶名 密碼


`

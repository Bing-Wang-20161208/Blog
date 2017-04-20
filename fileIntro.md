## blog

- app.js : 启动文件，入口文件
- package.json : 存储着工程的信息及模块依赖
- node_modules/ : 存放 package.json 中安装的模块
- public/ : 存放 image、css、js、fonts、kindEditor 等文件
- routes/ : 存放路由文件
- views/ : 存放视图文件，模板文件
- bin/ : 存放可执行文件
- settings.js : 保存博客工程的配置信息,包括端口、数据库等
- models/db.js : 创建数据库连接实例，其他文件可通过require该文件对数据库进行读写
- models/user.js : 数据库中，用户信息的存储和读取
- models/post.js : 数据库中，文章信息的存储与读取
- models/comments.js : 数据库中，留言信息的存储与读取
- stylesheets/style.css : 存储所有样式
- access.log : 记录访问信息，包括请求和内容
- error.log : 记录错误

## mongodb

- blog/ : 博客内容的存储目录,同时 blog 也被设置为数据库的名称

## kindeditor

- public/kindEditor/ : 多风格、多样式、更方便使用的编辑器

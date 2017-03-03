# Blog
简易的多人博客系统
## 环境
Node.js (Express), MongoDB
## 文件说明
1.blog文件夹下需要新建node_modules文件夹，用于存储项目需要依赖的Node.js模块，部分需要额外添加的模块在blog文件夹中package.json文件中<br>
2.blog同目录建立mongodb文件夹，此文件夹由mongodb安装改名而来，子目录建立blog文件夹作为项目数据库存储位置<br>
## 常用指令说明
npm install -g express-generator *安装express*<br />
express -e blog, cd blog && npm install *初始化工程*<br />
mongod --dbpath ../blog/ *必须在bin目录里面执行* 用于启动数据库<br />
SET DEBUG=blog* & node ./bin/www 或 supervisor app *在blog子目录进入命令行* 用于执行项目<br />
##未完待续......
React组件融合，完善页面展示

# Blog
简易的多人博客系统

## 环境
Node.js (Express), MongoDB, React

## 该博客本地搭建使用说明（windows）
1. git clone https://github.com/Bing-Wang-20161208/Blog.git (需要配置git环境) 或者直接下载到本地硬盘
2. 进入到项目内部跟目录，package.json 同级目录，然后 npm install -g express-generator , npm install
3. 官网下载 mongodb 解压并改名为mongodb 在项目外层，同项目级层相同位置。进入到 mongodb 文件夹新建 blog 文件夹作为数据库博客信息存储文件夹
4. 连接数据库: (/mongodb/bin/中) mongod --dbpath ../blog/
5. 启动项目: (/项目名/bin/中) SET DEBUG=blog* & node ./bin/www (或者，/项目名/中) supervisor app
6. 浏览器打开: http://localhost:3001

## 命令行数据库信息查询
```
// /mongodb/bin 目录下打开命令行
  mongo
> use blog
> db.users.find()
// 显示用户信息
```

<strong>注意:</strong>添加图片地址时，引用站外的图片要用绝对地址，引用站内的图片则用相对地址，如：/images/lufei.jpg 。

## 参见
具体由node express mongodb ejs模板 搭建流程见 [使用 Express + MongoDB 搭建多人博客](http://wiki.jikexueyuan.com/project/express-mongodb-setup-blog/)
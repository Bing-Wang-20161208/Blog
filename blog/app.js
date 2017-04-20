//启动文件,入口文件
//通过require加载模块，包括路由文件
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var settings = require('./settings');
var flash = require('connect-flash');//通知信息
var session = require('express-session');//会话信息
var MongoStore = require('connect-mongo')(session);//连接数据库
var multer = require('multer');//上传文件

//每一次的请求信息会同时显示在命令行和保存在access.log文件中，还有错误信息
var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {flags: 'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});

var app = express();//生成一个express实例

app.set('port', process.env.PORT || 3001);

// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置views文件夹为存放视图文件的目录，dirname为全局变量，存储当前正在执行的脚本所在的目录
//设置视图模板引擎为jsx，从而引入react
app.set('view engine', 'jsx');
var options = { //jsx engine相关设置
    beautify: true    //美化代码
};
app.engine('jsx', require('express-react-views').createEngine(options));

app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));//设置/public/favicon.ico为favicon图标
app.use(logger('dev'));//加载日志中间件
app.use(logger({stream: accessLog}));//将日志保存为日志文件

app.use(bodyParser.json());//加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: false }));//加载解析urlencoded请求体的中间件
app.use(cookieParser());//加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));//设置public文件夹为存放静态文件的目录

//自定义中间件，记录错误日志
app.use(function(err, req, res, next) {
  var meta = '[' + new Date() +']' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});//当发生错误时，将错误信息保存到了根目录下的error.log文件夹里

app.use(session({
  secret: settings.cookieSecret,//防止篡改cookie
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//生存期，30day
  store: new MongoStore({//把会话信息存储到数据库中，以避免丢失
    db: settings.db,
    host: settings.host,
    port: settings.port,
    url: 'mongodb://localhost:27017'
  })
}));
app.use(multer({
  dest: './public/images',//上传文件所在的目录
  rename: function(fieldname, filename) {//用户修改上传后的文件名，这里为保持原文件名
    return filename;
  }
}));

//路由控制器
//app.use('/', index);
//app.use('/users', users);
index(app); //调用 index.js 导出的函数

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//将错误信息渲染error模板并显示到浏览器
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;//导出app实例供其他模块调用
